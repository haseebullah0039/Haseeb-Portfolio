/**
 * Reliable in-page scrolling to a section.
 *
 * Off-screen sections use `content-visibility: auto`, so their height is only an
 * estimate until they render. A single smooth scroll can therefore land short or
 * overshoot. This scrolls, waits for scrolling to stop, re-measures and corrects
 * (a couple of times at most).
 */

const MAX_CORRECTIONS = 3;
const TOLERANCE_PX = 4;

function scrollOffset(): number {
  return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
}

/** Calls `done` once the page has stopped scrolling for a few frames. */
function onScrollSettled(done: () => void) {
  let last = window.scrollY;
  let still = 0;
  let frames = 0;
  const tick = () => {
    frames++;
    if (Math.abs(window.scrollY - last) < 1) still++;
    else still = 0;
    last = window.scrollY;
    if (still >= 6 || frames > 240) done();
    else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function scrollToSection(id: string, { instant = false }: { instant?: boolean } = {}): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const smooth = !instant && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let corrections = 0;

  const go = (behavior: ScrollBehavior) => {
    const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset();
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  const check = () => {
    const off = el.getBoundingClientRect().top - scrollOffset();
    if (Math.abs(off) > TOLERANCE_PX && corrections < MAX_CORRECTIONS) {
      corrections++;
      go(smooth ? "smooth" : "auto");
      onScrollSettled(check);
    }
  };

  go(smooth ? "smooth" : "auto");
  onScrollSettled(check);
  return true;
}
