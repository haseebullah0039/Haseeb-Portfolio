import { contact } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import styles from "./WhatsAppButton.module.css";

/** Floating WhatsApp chat button, bottom-right on every page. Pure CSS — no JavaScript. */
export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsappUrl}
      className={styles.button}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
    >
      <span className={styles.pulse} aria-hidden="true" />
      <Icon name="whatsapp" size={30} />
      <span className={styles.label} aria-hidden="true">
        Chat with us
      </span>
    </a>
  );
}
