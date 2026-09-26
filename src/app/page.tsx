import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { About } from "@/components/sections/About";
import { SoftwareDevelopment } from "@/components/sections/SoftwareDevelopment";
import { TechStack } from "@/components/sections/TechStack";
import { Expertise } from "@/components/sections/Expertise";
import { DigitalMarketing } from "@/components/sections/DigitalMarketing";
import { GraphicDesign } from "@/components/sections/GraphicDesign";
import { Services } from "@/components/sections/Services";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { FeaturedPortfolio } from "@/components/sections/FeaturedPortfolio";
import { Studio } from "@/components/sections/Studio";
import { Testimonials } from "@/components/sections/Testimonials";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/ui/JsonLd";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={[personJsonLd, websiteJsonLd]} />
      <Hero />
      <Intro />
      <About />
      <SoftwareDevelopment />
      <TechStack />
      <Expertise />
      <DigitalMarketing />
      <GraphicDesign />
      <Services />
      <ProductShowcase />
      <FeaturedPortfolio />
      <Studio />
      <Testimonials />
      <CtaBanner />
      <Contact />
    </>
  );
}
