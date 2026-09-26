import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { About } from "@/components/sections/About";
import { TechStack } from "@/components/sections/TechStack";
import { Expertise } from "@/components/sections/Expertise";
import { Studio } from "@/components/sections/Studio";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { breadcrumbJsonLd, pageMetadata, personJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "About Haseebullah — a Software Developer with 3+ years of experience in web, app, desktop and custom software development, plus digital marketing and graphic design. Founder of Hasibullah Studio.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          personJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="About"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title={
          <>
            Software developer with a <span className="gradient-text">designer&apos;s eye</span>.
          </>
        }
        description="I build software for businesses and bring marketing and design experience to every project."
      />
      <About />
      <Expertise />
      <TechStack />
      <Studio />
      <CtaBanner />
    </>
  );
}
