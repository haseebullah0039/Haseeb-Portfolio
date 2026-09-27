import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { Services } from "@/components/sections/Services";
import { SoftwareDevelopment } from "@/components/sections/SoftwareDevelopment";
import { DigitalMarketing } from "@/components/sections/DigitalMarketing";
import { GraphicDesign } from "@/components/sections/GraphicDesign";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { CONTACT_HREF } from "@/lib/contact";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Software development services by Haseebullah — web development, web and mobile applications, desktop software, SaaS, custom software and APIs — plus digital marketing, SEO and graphic design.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        back={{ href: "/#services", label: "Back to Home" }}
        eyebrow="Services"
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title={
          <>
            Software first. <span className="gradient-text">Complete</span> digital solutions.
          </>
        }
        description="Development of websites, applications and custom business software — with digital marketing and graphic design to launch, brand and grow what gets built."
      >
        <Button href={CONTACT_HREF} arrow>
          Start a Project
        </Button>
        <Button href="/portfolio" variant="secondary">
          View Portfolio
        </Button>
      </PageHero>
      <Services index="01" />
      <SoftwareDevelopment />
      <DigitalMarketing />
      <GraphicDesign />
      <CtaBanner />
    </>
  );
}
