import type { CoverStyle } from "@/data/projects";

/**
 * Generated, brand-consistent cover art for projects without a screenshot.
 * Purely illustrative — contains no real data.
 */

const O = "#FF7A18";
const O2 = "#FFA45C";
const V = "#9B6BFF";
const W = "rgba(255,255,255,0.14)";
const W2 = "rgba(255,255,255,0.08)";
const PANEL = "#2B1631";
const PANEL2 = "#341C3B";

const backgrounds: Record<CoverStyle, [string, string]> = {
  dashboard: ["#3A1A3F", "#1B0C20"],
  web: ["#3B1D2A", "#1C0D1F"],
  mobile: ["#2A1845", "#150A22"],
  desktop: ["#3A1F33", "#170A1B"],
  store: ["#43201E", "#1E0D1D"],
  marketing: ["#23193F", "#130A1E"],
  brand: ["#46231B", "#1D0C1E"],
  social: ["#35173C", "#170A1C"],
};

function Window({ x, y, w, h, children }: { x: number; y: number; w: number; h: number; children?: React.ReactNode }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={PANEL} stroke={W} />
      <rect x={x} y={y} width={w} height="24" rx="12" fill={PANEL2} />
      <rect x={x} y={y + 14} width={w} height="10" fill={PANEL2} />
      <circle cx={x + 16} cy={y + 12} r="4" fill="#FF5F57" />
      <circle cx={x + 30} cy={y + 12} r="4" fill="#FEBC2E" />
      <circle cx={x + 44} cy={y + 12} r="4" fill="#28C840" />
      {children}
    </g>
  );
}

function Lines({ x, y, widths, gap = 14, color = W }: { x: number; y: number; widths: number[]; gap?: number; color?: string }) {
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * gap} width={w} height="6" rx="3" fill={color} />
      ))}
    </>
  );
}

function Art({ cover, accent }: { cover: CoverStyle; accent: string }) {
  switch (cover) {
    case "dashboard":
      return (
        <Window x={80} y={60} w={480} h={290}>
          <rect x={80} y={84} width="96" height="266" fill="rgba(0,0,0,0.18)" />
          <rect x={94} y={100} width="68" height="14" rx="5" fill={O} opacity="0.8" />
          <Lines x={94} y={130} widths={[60, 50, 64, 44, 56]} gap={22} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={192 + i * 120} y={100} width="108" height="62" rx="10" fill={i === 0 ? "rgba(255,122,24,0.2)" : W2} stroke={i === 0 ? O : "none"} strokeOpacity="0.4" />
              <rect x={204 + i * 120} y={114} width="44" height="6" rx="3" fill={W} />
              <rect x={204 + i * 120} y={130} width="64" height="12" rx="4" fill={i === 0 ? O2 : "rgba(255,255,255,0.25)"} />
            </g>
          ))}
          <rect x={192} y={176} width="236" height="160" rx="10" fill={W2} />
          {[50, 80, 64, 100, 76, 120, 96, 130].map((h, i) => (
            <rect key={i} x={208 + i * 27} y={322 - h} width="16" height={h} rx="4" fill={i % 2 ? O : V} opacity={i % 2 ? 0.9 : 0.7} />
          ))}
          <rect x={440} y={176} width="108" height="160" rx="10" fill={W2} />
          <circle cx={494} cy={240} r="36" fill="none" stroke={W} strokeWidth="12" />
          <circle cx={494} cy={240} r="36" fill="none" stroke={O} strokeWidth="12" strokeDasharray="160 230" transform="rotate(-90 494 240)" />
          <Lines x={456} y={296} widths={[76, 56]} />
        </Window>
      );
    case "web":
      return (
        <Window x={70} y={50} w={500} h={310}>
          <Lines x={92} y={92} widths={[40]} color={O} />
          <Lines x={380} y={92} widths={[30, 0]} />
          <rect x={420} y={88} width="36" height="6" rx="3" fill={W} />
          <rect x={466} y={88} width="36" height="6" rx="3" fill={W} />
          <rect x={512} y={84} width="40" height="14" rx="7" fill={O} />
          <rect x={92} y={136} width="220" height="20" rx="6" fill="rgba(255,255,255,0.8)" />
          <rect x={92} y={164} width="170" height="20" rx="6" fill={O2} />
          <Lines x={92} y={200} widths={[200, 180, 150]} gap={12} />
          <rect x={92} y={250} width="96" height="28" rx="14" fill={O} />
          <rect x={196} y={250} width="80" height="28" rx="14" fill="none" stroke={W} />
          <rect x={340} y={124} width="210" height="160" rx="16" fill={accent} />
          <circle cx={445} cy={204} r="42" fill="rgba(255,255,255,0.18)" />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={92 + i * 156} y={300} width="144" height="44" rx="10" fill={W2} />
          ))}
        </Window>
      );
    case "mobile":
      return (
        <g>
          {[
            { x: 200, y: 60, r: -8 },
            { x: 340, y: 40, r: 6 },
          ].map((p, i) => (
            <g key={i} transform={`rotate(${p.r} ${p.x + 60} ${p.y + 150})`}>
              <rect x={p.x} y={p.y} width="120" height="260" rx="22" fill={PANEL} stroke={W} strokeWidth="2" />
              <rect x={p.x + 44} y={p.y + 10} width="32" height="6" rx="3" fill="rgba(0,0,0,0.5)" />
              <rect x={p.x + 12} y={p.y + 30} width="96" height="70" rx="12" fill={i ? accent : "rgba(155,107,255,0.45)"} />
              <Lines x={p.x + 12} y={p.y + 114} widths={[80, 60, 70]} gap={12} />
              {[0, 1, 2].map((r) => (
                <g key={r}>
                  <rect x={p.x + 12} y={p.y + 158 + r * 28} width="20" height="20" rx="6" fill={r === 0 ? O : W} />
                  <rect x={p.x + 40} y={p.y + 164 + r * 28} width="56" height="6" rx="3" fill={W} />
                </g>
              ))}
              <rect x={p.x + 40} y={p.y + 244} width="40" height="4" rx="2" fill={W} />
            </g>
          ))}
        </g>
      );
    case "desktop":
      return (
        <Window x={60} y={56} w={520} h={300}>
          <rect x={60} y={80} width="140" height="276" fill="rgba(0,0,0,0.2)" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <rect x={74} y={98 + i * 36} width="112" height="26" rx="7" fill={i === 1 ? "rgba(255,122,24,0.25)" : "transparent"} />
              <rect x={84} y={107 + i * 36} width="10" height="8" rx="2" fill={i === 1 ? O : W} />
              <rect x={102} y={108 + i * 36} width={60 + (i % 3) * 10} height="6" rx="3" fill={i === 1 ? O2 : W} />
            </g>
          ))}
          <rect x={216} y={98} width="200" height="10" rx="4" fill="rgba(255,255,255,0.6)" />
          <rect x={496} y={94} width="68" height="20" rx="10" fill={O} />
          {[0, 1, 2, 3, 4, 5].map((r) => (
            <g key={r}>
              <rect x={216} y={128 + r * 36} width="348" height="28" rx="7" fill={r % 2 ? "transparent" : W2} />
              <rect x={228} y={139 + r * 36} width="90" height="6" rx="3" fill={W} />
              <rect x={340} y={139 + r * 36} width="70" height="6" rx="3" fill={W} />
              <rect x={506} y={137 + r * 36} width="44" height="10" rx="5" fill={[O, V, "#28C840"][r % 3]} opacity="0.6" />
            </g>
          ))}
        </Window>
      );
    case "store":
      return (
        <Window x={70} y={50} w={500} h={310}>
          <Lines x={92} y={92} widths={[50]} color={O} />
          <circle cx={540} cy={94} r="11" fill={O} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={92 + i * 118} y={120} width="104" height="220" rx="12" fill={W2} />
              <rect x={100 + i * 118} y={128} width="88" height="110" rx="9" fill={i % 2 ? "rgba(155,107,255,0.35)" : accent} />
              <Lines x={100 + i * 118} y={252} widths={[70, 50]} gap={12} />
              <rect x={100 + i * 118} y={296} width="88" height="28" rx="14" fill={i === 0 ? O : "none"} stroke={W} />
            </g>
          ))}
        </Window>
      );
    case "marketing":
      return (
        <g>
          <rect x={80} y={70} width="340" height="260" rx="18" fill={PANEL} stroke={W} />
          {[120, 170, 220, 270].map((y) => (
            <line key={y} x1={100} x2={400} y1={y} y2={y} stroke={W2} strokeDasharray="4 6" />
          ))}
          <path d="M100 290 C 150 280, 170 250, 210 244 S 270 200, 300 180 S 360 120, 400 100 L400 310 L100 310Z" fill={accent} opacity="0.35" />
          <path d="M100 290 C 150 280, 170 250, 210 244 S 270 200, 300 180 S 360 120, 400 100" fill="none" stroke={O} strokeWidth="4" strokeLinecap="round" />
          <circle cx={400} cy={100} r="7" fill={O} />
          <circle cx={470} cy={140} r="48" fill="none" stroke={O2} strokeWidth="10" />
          <line x1={504} y1={174} x2={540} y2={210} stroke={O2} strokeWidth="14" strokeLinecap="round" />
          {[
            [470, 260, V],
            [530, 290, O],
            [440, 320, "#28C840"],
          ].map(([x, y, c], i) => (
            <g key={i}>
              <rect x={Number(x) - 26} y={Number(y) - 16} width="52" height="32" rx="16" fill={String(c)} opacity="0.3" />
              <circle cx={Number(x) - 10} cy={Number(y)} r="6" fill={String(c)} />
              <rect x={Number(x)} y={Number(y) - 3} width="16" height="6" rx="3" fill="rgba(255,255,255,0.7)" />
            </g>
          ))}
        </g>
      );
    case "brand":
      return (
        <g>
          <rect x={70} y={60} width="250" height="280" rx="20" fill={PANEL} stroke={W} />
          <circle cx={195} cy={180} r="70" fill="none" stroke={W2} />
          <circle cx={195} cy={180} r="44" fill="none" stroke={W2} />
          <rect x={150} y={135} width="90" height="90" rx="26" fill={accent} />
          <path d="M178 157v46M212 157v46M178 180h34" stroke="#1A0C10" strokeWidth="8" strokeLinecap="round" fill="none" />
          <Lines x={140} y={286} widths={[110, 70]} gap={14} />
          <rect x={340} y={60} width="230" height="130" rx="20" fill={PANEL} stroke={W} />
          <text x={362} y={150} fontFamily="Georgia, serif" fontSize="72" fontWeight="700" fill="rgba(255,255,255,0.85)">Aa</text>
          <Lines x={470} y={100} widths={[80, 60, 70, 50]} gap={14} />
          <rect x={340} y={210} width="230" height="130" rx="20" fill={PANEL} stroke={W} />
          {[O, O2, V, "#F8F3FA", "#26132B"].map((c, i) => (
            <circle key={c} cx={380 + i * 38} cy={275} r="22" fill={c} stroke={PANEL} strokeWidth="4" />
          ))}
        </g>
      );
    case "social":
      return (
        <g>
          {[0, 1, 2].map((i) => {
            const x = 110 + i * 150;
            const r = [-6, 0, 6][i];
            return (
              <g key={i} transform={`rotate(${r} ${x + 65} 200)`}>
                <rect x={x} y={70} width="130" height="250" rx="16" fill={PANEL} stroke={W} />
                <circle cx={x + 18} cy={88} r="8" fill={i === 1 ? O : V} />
                <rect x={x + 32} y={85} width="50" height="6" rx="3" fill={W} />
                <rect x={x + 10} y={106} width="110" height="140" rx="10" fill={i === 1 ? accent : i === 0 ? "rgba(155,107,255,0.45)" : "rgba(255,164,92,0.35)"} />
                <text x={x + 22} y={190} fontFamily="Arial, sans-serif" fontWeight="800" fontSize="28" fill="rgba(255,255,255,0.9)">{["NEW", "SALE", "HELLO"][i]}</text>
                <Lines x={x + 10} y={262} widths={[90, 70]} gap={14} />
                <circle cx={x + 18} cy={302} r="6" fill={W} />
                <circle cx={x + 38} cy={302} r="6" fill={W} />
              </g>
            );
          })}
        </g>
      );
  }
}

export function ProjectCover({ cover, title, uid }: { cover: CoverStyle; title: string; uid: string }) {
  const [a, b] = backgrounds[cover];
  const id = (k: string) => `cv-${uid}-${k}`;
  return (
    <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`Illustrative cover for ${title}`}>
      <defs>
        <linearGradient id={id("bg")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
        <linearGradient id={id("accent")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={O2} />
          <stop offset="1" stopColor="#E0520C" />
        </linearGradient>
        <radialGradient id={id("glow")} cx="0.8" cy="0.1" r="0.7">
          <stop offset="0" stopColor="rgba(255,122,24,0.35)" />
          <stop offset="1" stopColor="rgba(255,122,24,0)" />
        </radialGradient>
        <pattern id={id("grid")} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="rgba(255,255,255,0.04)" />
        </pattern>
      </defs>
      <rect width="640" height="400" fill={`url(#${id("bg")})`} />
      <rect width="640" height="400" fill={`url(#${id("grid")})`} />
      <rect width="640" height="400" fill={`url(#${id("glow")})`} />
      <Art cover={cover} accent={`url(#${id("accent")})`} />
    </svg>
  );
}
