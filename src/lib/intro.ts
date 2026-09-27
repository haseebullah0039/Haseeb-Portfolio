/**
 * Shared by the welcome screen (IntroGate), the voice guide and the root layout.
 * Kept out of the "use client" components so the server layout can import the
 * boot script as a real string.
 */

export const INTRO_SEEN_KEY = "intro-seen"; // sessionStorage — once per visit
export const VOICE_START_EVENT = "voice-guide:start";
export const VOICE_SKIP_EVENT = "voice-guide:skip";

/**
 * Runs before the page paints (inline at the start of <body>): decides whether
 * the welcome screen is shown, so there's no flash of the site behind it.
 * Without JavaScript the class is never added and the site shows normally.
 * Visitors who turned the voice guide off earlier skip the welcome screen.
 */
export const introBootScript = `try{if(!sessionStorage.getItem("${INTRO_SEEN_KEY}")&&localStorage.getItem("voice-guide-muted")!=="true"){document.documentElement.classList.add("intro-open")}}catch(e){}`;
