import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Portfolio",
  description:
    "Software development, web development, apps, desktop and business software projects by Haseebullah — plus digital marketing and graphic design work.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />
      <PageHero
        back={{ href: "/#portfolio", label: "Back to Home" }}
        eyebrow="Portfolio"
        crumbs={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        title={
          <>
            Work that <span className="gradient-text">ships</span>.
          </>
        }
        description="Software projects, web and app development, business systems, digital marketing and graphic design. Filter by category to explore."
      />
      <section className="section" style={{ paddingTop: 0 }} aria-label="Projects">
        <div className="container">
          <PortfolioExplorer />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
