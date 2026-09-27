/**
 * Generates the voice guide's recordings from src/data/narration.ts.
 *
 * Uses Kokoro (https://huggingface.co/hexgrad/Kokoro-82M, Apache-2.0), a
 * realistic open-source text-to-speech model that runs locally — no API key,
 * nothing is sent to an external service.
 *
 * One-time setup (kept out of package.json so the website stays lightweight):
 *   npm i --no-save kokoro-js @breezystack/lamejs tsx
 * Then, after editing any narration text:
 *   npm run narration
 *
 * The first run downloads the voice model (~310 MB). Only changed lines are
 * regenerated; outdated recordings are removed.
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { KokoroTTS, TextSplitterStream } from "kokoro-js";
import { Mp3Encoder } from "@breezystack/lamejs";
import { allNarration, pronunciations } from "../src/data/narration";

const VOICE = "am_michael"; // natural American male voice
const SPEED = 0.95; // a touch slower than normal for clear diction
const SENTENCE_PAUSE_S = 0.32;
const EDGE_PAUSE_S = 0.12;
const BITRATE_KBPS = 64;

const OUT_DIR = join(process.cwd(), "public", "audio", "narration");
const MANIFEST = join(OUT_DIR, "manifest.json");

type Entry = { file: string; text: string; sig?: string };

/* ---------- pronunciation overrides ---------- */

const overrideWords = Object.keys(pronunciations).sort((a, b) => b.length - a.length);
const overrideRe = new RegExp(`(?<!\\p{L})(${overrideWords.join("|")})(?!\\p{L})`, "gu");

/** Override words used in a line, e.g. ["Haseeb", "Ullah"]. */
const overridesIn = (text: string) => [...new Set(text.match(overrideRe) ?? [])];

/** Fingerprint of everything that affects a recording: voice, speed, text, pronunciations. */
const signature = (text: string) =>
  createHash("sha1")
    .update(
      JSON.stringify([VOICE, SPEED, text, overridesIn(text).map((w) => [w, pronunciations[w]])]),
    )
    .digest("hex")
    .slice(0, 10);

const sentences = (text: string) =>
  (text.match(/[^.!?]+[.!?]*/g) ?? [text]).map((s) => s.trim()).filter(Boolean);

type Tts = Awaited<ReturnType<typeof KokoroTTS.from_pretrained>>;

/** The model's own phonemes for a piece of text. */
async function phonemize(tts: Tts, text: string): Promise<string> {
  const splitter = new TextSplitterStream();
  const stream = tts.stream(splitter, { voice: VOICE, speed: SPEED });
  splitter.push(text);
  splitter.close();
  const out: string[] = [];
  for await (const chunk of stream) out.push(chunk.phonemes);
  return out.join(" ");
}

const defaultPhonemes = new Map<string, string>();

/**
 * Phonemes for a sentence with override words pronounced exactly as specified.
 * Phonemizes the whole sentence (natural flow) and swaps each override word's
 * default phonemes; falls back to phonemizing around the words if needed.
 */
async function sentencePhonemes(tts: Tts, sentence: string): Promise<string> {
  let ph = await phonemize(tts, sentence);
  let ok = true;
  for (const word of overridesIn(sentence).sort((a, b) => b.length - a.length)) {
    if (!defaultPhonemes.has(word)) {
      defaultPhonemes.set(word, (await phonemize(tts, word)).replace(/[.,!?]+$/, "").trim());
    }
    const def = defaultPhonemes.get(word)!;
    if (def && ph.includes(def)) ph = ph.split(def).join(pronunciations[word]);
    else ok = false;
  }
  if (ok) return ph;

  const parts: string[] = [];
  for (const part of sentence.split(overrideRe)) {
    if (!part) continue;
    if (pronunciations[part]) parts.push(pronunciations[part]);
    else if (/[\p{L}\p{N}]/u.test(part)) parts.push(await phonemize(tts, part.trim()));
    else parts.push(part.trim());
  }
  return parts.filter(Boolean).join(" ").replace(/\s+([,.!?])/g, "$1");
}

/** Audio for one sentence, applying pronunciation overrides when present. */
async function synthesize(tts: Tts, sentence: string) {
  if (!overridesIn(sentence).length) return tts.generate(sentence, { voice: VOICE, speed: SPEED });
  const ph = await sentencePhonemes(tts, sentence);
  const { input_ids } = tts.tokenizer(ph, { truncation: true });
  return tts.generate_from_ids(input_ids, { voice: VOICE, speed: SPEED });
}

function concat(parts: Float32Array[], rate: number): Float32Array {
  const gap = new Float32Array(Math.round(SENTENCE_PAUSE_S * rate));
  const edge = new Float32Array(Math.round(EDGE_PAUSE_S * rate));
  const chunks = [edge];
  parts.forEach((p, i) => {
    if (i > 0) chunks.push(gap);
    chunks.push(p);
  });
  chunks.push(edge);
  const out = new Float32Array(chunks.reduce((n, c) => n + c.length, 0));
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return out;
}

/** Peak-normalise so every clip plays at the same comfortable level. */
function normalise(samples: Float32Array, target = 0.89): Float32Array {
  let peak = 0;
  for (const s of samples) peak = Math.max(peak, Math.abs(s));
  if (peak === 0) return samples;
  const gain = target / peak;
  return samples.map((s) => s * gain);
}

function toMp3(samples: Float32Array, rate: number): Buffer {
  const pcm = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    pcm[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  const encoder = new Mp3Encoder(1, rate, BITRATE_KBPS);
  const chunks: Buffer[] = [];
  for (let i = 0; i < pcm.length; i += 1152) {
    const buf = encoder.encodeBuffer(pcm.subarray(i, i + 1152));
    if (buf.length) chunks.push(Buffer.from(buf));
  }
  const end = encoder.flush();
  if (end.length) chunks.push(Buffer.from(end));
  return Buffer.concat(chunks);
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const previous: Record<string, Entry> = existsSync(MANIFEST)
    ? JSON.parse(readFileSync(MANIFEST, "utf8"))
    : {};

  const lines = allNarration();
  const todo = Object.entries(lines).filter(([key, text]) => {
    const e = previous[key];
    return !(
      e &&
      e.text === text &&
      e.sig === signature(text) &&
      existsSync(join(OUT_DIR, e.file.split("/").pop()!))
    );
  });

  const manifest: Record<string, Entry> = {};
  for (const [key, text] of Object.entries(lines)) {
    if (!todo.find(([k]) => k === key)) manifest[key] = previous[key];
  }

  if (todo.length) {
    console.log(`Loading voice model… (${todo.length} line(s) to record)`);
    const tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", {
      dtype: "fp32",
      device: "cpu",
    });
    for (const [key, text] of todo) {
      const parts: Float32Array[] = [];
      let rate = 24000;
      for (const sentence of sentences(text)) {
        const audio = await synthesize(tts, sentence);
        parts.push(audio.audio as Float32Array);
        rate = audio.sampling_rate;
      }
      const samples = normalise(concat(parts, rate));
      const sig = signature(text);
      const name = `${key}-${sig}.mp3`;
      const mp3 = toMp3(samples, rate);
      writeFileSync(join(OUT_DIR, name), mp3);
      manifest[key] = { file: `/audio/narration/${name}`, text, sig };
      const custom = overridesIn(text);
      console.log(
        `  ✓ ${key.padEnd(10)} ${(samples.length / rate).toFixed(1)}s  ${(mp3.length / 1024).toFixed(0)} KB` +
          (custom.length ? `  (custom pronunciation: ${custom.join(", ")})` : ""),
      );
    }
  } else {
    console.log("All recordings are up to date.");
  }

  // Remove recordings that are no longer referenced.
  const keep = new Set(Object.values(manifest).map((e) => e.file.split("/").pop()));
  for (const f of readdirSync(OUT_DIR)) {
    if (f.endsWith(".mp3") && !keep.has(f)) unlinkSync(join(OUT_DIR, f));
  }

  const sorted = Object.fromEntries(Object.keys(lines).map((k) => [k, manifest[k]]));
  writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
  console.log("Manifest written: public/audio/narration/manifest.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
