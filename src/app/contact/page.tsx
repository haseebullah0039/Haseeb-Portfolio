import { ContactBlock } from "@/components/contact/ContactBlock";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Haseebullah for software development, web and app development, custom software, digital marketing or graphic design projects.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        back={{ href: "/#contact", label: "Back to Home" }}
        eyebrow="Contact"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title={
          <>
            Let&apos;s Work <span className="gradient-text">Together</span>
          </>
        }
      />
      <section className="section" style={{ paddingTop: 0 }} aria-label="Contact details and form">
        <div className="container">
          <ContactBlock />
        </div>
      </section>
    </>
  );
}
