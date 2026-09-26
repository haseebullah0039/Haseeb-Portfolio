import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>This page doesn&apos;t exist.</h1>
        <p className={styles.text}>The link may be broken, or the page may have moved.</p>
        <div className={styles.actions}>
          <Button href="/" arrow>
            Back to Home
          </Button>
          <Button href="/portfolio" variant="secondary">
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
