/**
 * Voice-guide narration: what the voice says when a section comes into view
 * (or is opened from a link). Built from the real site data so it stays accurate.
 *
 * Text here is written for the EAR, not the screen:
 * - "Haseeb Ullah" is spelled that way only for correct pronunciation.
 *   On-screen text always uses "Haseebullah".
 * - Tech names are spelled out ("Next J S") so voices read them properly.
 *
 * Recorded voice: `npm run narration` (see scripts/generate-narration.mts)
 * turns every line below into an MP3 in /public/audio/narration using a
 * realistic AI voice. After editing any text here, run it again — lines whose
 * recording is missing or out of date fall back to the browser's own voice.
 */

import manifest from "../../public/audio/narration/manifest.json";

import { serviceCategories, softwareServices } from "./services";
import { product } from "./product";
import { studio } from "./studio";
import { technologies } from "./technologies";

/** How technology names should be pronounced. */
const spokenTech: Record<string, string> = {
  HTML: "H T M L",
  CSS: "C S S",
  JavaScript: "JavaScript",
  "Next.js": "Next J S",
  "Node.js": "Node J S",
  "Express.js": "Express J S",
  "Electron.js": "Electron J S",
  MongoDB: "Mongo D B",
  MySQL: "My S Q L",
};

/** "a, b, and c" */
function list(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/** Title → natural spoken phrase ("API & Backend" → "A P I and backend"). */
const spoken = (s: string) =>
  s
    .toLowerCase()
    .replace(/\bsaas\b/g, "SaaS")
    .replace(/\bapi\b/g, "A P I")
    .replace(/&/g, "and");

const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const count = (n: number) => numberWords[n] ?? String(n);

/** Spoken when the visitor switches the voice guide back on. */
export const voiceGuideOnNarration = "Voice guide on.";

export const welcomeNarration = "Hello! Welcome to Haseeb Ullah’s portfolio.";

/** Keyed by section id on the page. Sections without an entry stay silent. */
export const sectionNarration: Record<string, string> = {
  // Hero — follows the welcome when the visitor arrives at the top of the page.
  home: "I’m a software developer, and I also work as a digital marketer and graphic designer. I build websites, web and mobile apps, desktop software, and custom business software. Scroll down, and I’ll walk you through my work.",

  about:
    "Let me introduce myself. I’m Haseeb Ullah, a software developer with more than three years of experience. I build websites, web applications, mobile apps, desktop software, and custom business systems. I also work in digital marketing and graphic design, so I can plan, build, brand, and promote a complete digital solution.",

  software: `Software development is my primary focus. I work on ${list(
    softwareServices.map((s) => spoken(s.title)),
  )}.`,

  stack: `My technology stack includes ${list(
    technologies.map((t) => spokenTech[t.name] ?? t.name),
  )}.`,

  expertise:
    "Here are my core strengths. Software development leads, supported by digital marketing and graphic design. These are my own self-assessed levels.",

  marketing:
    "In digital marketing, I help brands become easier to find and more engaging online, through search engine optimization, content marketing, social media marketing, Google Ads, and Google Business Profile optimization. I don’t promise guaranteed rankings — just sound strategy and consistent work.",

  design:
    "Graphic design is my creative background. I create logos, brand identities, branding kits, business cards, brochures, posters, social media designs, and marketing materials, using Adobe Photoshop, Adobe Illustrator, and Canva.",

  services: `I offer ${count(serviceCategories.length)} services: ${list(
    serviceCategories.map((c) => spoken(c.title)),
  )}. Software development comes first.`,

  product: `This is ${product.name}, my ${spoken(product.category)}. It’s a ready-made system designed for ${list(
    product.businessTypes.map((t) => spoken(t.label)),
  )}.`,

  portfolio: "Here are some of my selected projects, with software work first. Click any project to learn more.",

  studio: `I’m the founder and CEO of ${studio.name}, a software house I started in ${studio.founded}. The studio creates websites, web and mobile apps, AI automation, e-commerce stores, branding, and business software like CRM and ERP systems, with strategy first, quality work, and clear delivery.`,

  contact:
    "Let’s work together! You can call me, send an email, message me on WhatsApp, or fill in this form, and I’ll get back to you.",
};

/**
 * Exact pronunciations for the recorded voice, in IPA as used by the Kokoro model.
 * Keys are words exactly as they appear in the lines above (including ’s forms).
 * After changing one, run `npm run narration` — affected lines are re-recorded.
 */
export const pronunciations: Record<string, string> = {
  Haseeb: "həsˈiːb", // huh-SEEB
  "Ullah’s": "ʊlˈɑːz", // ool-LAAHZ
  Ullah: "ʊlˈɑː", // ool-LAAH
  Businexa: "bˈɪznɛksə", // BIZ-nek-suh
  Khata: "kˈɑːtɑː", // KAA-taa
  Hesodevix: "hˈɛsoʊdˌɛvɪks", // HEH-so-dev-ix
};

/** Every line the guide can speak, keyed for the recordings. */
export function allNarration(): Record<string, string> {
  return { welcome: welcomeNarration, on: voiceGuideOnNarration, ...sectionNarration };
}

type ManifestEntry = { file: string; text: string };

/**
 * Recorded audio per line — only where the recording matches the CURRENT text,
 * so edited lines never play an outdated recording.
 */
export const narrationAudio: Partial<Record<string, string>> = Object.fromEntries(
  Object.entries(allNarration())
    .map(([key, text]) => {
      const entry = (manifest as Record<string, ManifestEntry | undefined>)[key];
      return entry && entry.text === text ? [key, entry.file] : null;
    })
    .filter((e): e is [string, string] => e !== null),
);
