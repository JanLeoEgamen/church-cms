import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/public/SectionHeading";
import { MinistryCard } from "@/components/public/Cards";
import { CTASection } from "@/components/public/CTASection";
import { images, ministries } from "@/data/church";

export const Route = createFileRoute("/_public/ministries/")({
  head: () => ({
    meta: [
      { title: "Ministries — Grace Community Church" },
      {
        name: "description",
        content:
          "Kids, youth, young adults, women's, men's, worship, prayer, and outreach ministries at Grace Community Church in Springfield.",
      },
      { property: "og:title", content: "Ministries at Grace Community Church" },
      {
        property: "og:description",
        content: "Find a group where you'll be known by name — for every age and season of life.",
      },
    ],
  }),
  component: MinistriesPage,
});

function MinistriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ministries"
        title="Find Your Community"
        description="Eight ministries, one church family. Every one of them has room for you."
        image={images.ministryKids}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Get Connected"
          title="Ways to Belong"
          description="Browse our ministries and reach out to the leader — they'll help you take the first step."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.map((m) => (
            <MinistryCard key={m.id} ministry={m} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
