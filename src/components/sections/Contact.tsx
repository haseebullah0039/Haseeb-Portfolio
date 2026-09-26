import { ContactBlock } from "@/components/contact/ContactBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          index="12"
          eyebrow="Contact"
          id="contact-title"
          size="xl"
          title={
            <>
              Let&apos;s Work <span className="gradient-text">Together</span>
            </>
          }
        />
        <ContactBlock />
      </div>
    </section>
  );
}
