import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/public/SectionHeading";
import { AnnouncementCard } from "@/components/public/Cards";
import { CTASection } from "@/components/public/CTASection";
import { announcements, images } from "@/data/church";

export const Route = createFileRoute("/_public/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — Grace Community Church" },
      {
        name: "description",
        content:
          "Church news and updates: service time changes, youth registration, outreach expansion, and new Bible study groups.",
      },
      { property: "og:title", content: "Church News & Announcements" },
      { property: "og:description", content: "The latest updates from Grace Community Church in Springfield." },
    ],
  }),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Announcements"
        title="Church News & Updates"
        description="Everything happening around Grace Community, in one place."
        image={images.ministryPrayer}
      />

      <section className="mx-auto max-w-5xl px-5 py-20 lg:px-8">
        <div className="grid gap-8">
          {announcements.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
