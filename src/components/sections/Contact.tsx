import { ContactBlock } from "@/components/contact/ContactBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasTestimonials } from "@/data/testimonials";

export function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          index={hasTestimonials ? "12" : "11"}
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
