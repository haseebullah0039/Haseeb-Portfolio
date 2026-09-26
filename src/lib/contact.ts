/**
 * Contact buttons scroll to the Contact section on the homepage instead of
 * opening a separate page. A button can pre-select a service in the form by
 * setting `data-service` on the link (see <Button service="…">):
 *
 *  - Same page: a global click listener (Providers) dispatches CONTACT_SERVICE_EVENT,
 *    which the mounted ContactForm listens for.
 *  - From another page: the choice is kept in sessionStorage and picked up
 *    when the homepage's ContactForm mounts.
 */

export const CONTACT_HREF = "/#contact";
export const CONTACT_SERVICE_EVENT = "contact:select-service";
export const CONTACT_SERVICE_KEY = "contact-service";

/** Called from the global click listener when a link with data-service is clicked. */
export function rememberContactService(service: string) {
  try {
    sessionStorage.setItem(CONTACT_SERVICE_KEY, service);
  } catch {
    // Storage may be unavailable (private mode); the in-page event still works.
  }
  window.dispatchEvent(new CustomEvent(CONTACT_SERVICE_EVENT, { detail: service }));
}

/** Reads (and clears) a service chosen on another page before navigating here. */
export function takeRememberedContactService(): string | null {
  try {
    const value = sessionStorage.getItem(CONTACT_SERVICE_KEY);
    if (value) sessionStorage.removeItem(CONTACT_SERVICE_KEY);
    return value;
  } catch {
    return null;
  }
}
