import { contact } from "@/data/site";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactForm } from "./ContactForm";
import styles from "./ContactBlock.module.css";

/** Contact details + form. Used on the homepage and the /contact page. */
export function ContactBlock() {
  return (
    <div className={styles.grid}>
      <Reveal className={styles.details}>
        <p className={styles.intro}>
          Tell me about your project — software, marketing or design. I&apos;ll reply with next
          steps and an honest view of how I can help.
        </p>

        <ul className={styles.items}>
          <li>
            <a href={contact.phoneHref} className={styles.item}>
              <span className="icon-box">
                <Icon name="phone" />
              </span>
              <span>
                <span className={styles.label}>Phone</span>
                <span className={styles.value}>{contact.phone}</span>
              </span>
            </a>
          </li>
          <li>
            <a href={contact.emailHref} className={styles.item}>
              <span className="icon-box">
                <Icon name="mail" />
              </span>
              <span>
                <span className={styles.label}>Email</span>
                <span className={`${styles.value} ${styles.break}`}>{contact.email}</span>
              </span>
            </a>
          </li>
          <li>
            <div className={styles.item}>
              <span className="icon-box">
                <Icon name="mapPin" />
              </span>
              <address className={styles.address}>
                <span className={styles.label}>Location</span>
                <span className={styles.value}>
                  {contact.address.lines.map((line) => (
                    <span key={line} className={styles.addrLine}>
                      {line}
                    </span>
                  ))}
                  <span className={styles.addrLine}>Postal Code: {contact.address.postalCode}</span>
                </span>
              </address>
            </div>
          </li>
        </ul>

        <div className={styles.actions}>
          <a href={contact.emailHref} className="btn btn-primary btn-sm">
            <Icon name="mail" size={16} /> Email Me
          </a>
          <a href={contact.phoneHref} className="btn btn-secondary btn-sm">
            <Icon name="phone" size={16} /> Call Me
          </a>
        </div>

        <div className={styles.social}>
          <span className={styles.label}>Find me online</span>
          <SocialLinks size="sm" />
        </div>
      </Reveal>

      <Reveal className={styles.formCard} delay={0.1}>
        <h3 className={styles.formTitle}>Send a message</h3>
        <ContactForm />
      </Reveal>
    </div>
  );
}
