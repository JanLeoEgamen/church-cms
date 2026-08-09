import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/public/SectionHeading";
import { EventCard } from "@/components/public/Cards";
import { CTASection } from "@/components/public/CTASection";
import { events, images } from "@/data/church";
import { cn } from "@/lib/utils";

const filters = ["All", "Worship", "Youth", "Community", "Outreach", "Other"] as const;

export const Route = createFileRoute("/_public/events/")({
  head: () => ({
    meta: [
      { title: "Events — Grace Community Church" },
      {
        name: "description",
        content:
          "Worship services, youth nights, outreach mornings, and community gatherings at Grace Community Church in Springfield, CA.",
      },
      { property: "og:title", content: "Upcoming Events at Grace Community Church" },
      { property: "og:description", content: "See what's happening this month and plan to join us." },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const featured = events.find((e) => e.featured) ?? events[0]!;
  const rest = events.filter((e) => e.id !== featured.id);
  const visible = filter === "All" ? rest : rest.filter((e) => e.category === filter);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Gather With Us"
        description="Sunday services, midweek studies, youth nights, and days spent serving Springfield together."
        image={images.ministryYouth}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="eyebrow text-accent">Featured Event</p>
        <div className="surface-card mt-6 grid overflow-hidden lg:grid-cols-2">
          <img
            src={featured.image}
            alt={featured.title}
            loading="lazy"
            className="h-full min-h-72 w-full object-cover"
          />
          <div className="p-8 sm:p-12">
            <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase">
              {featured.category}
            </span>
            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">{featured.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{featured.summary}</p>
            <div className="mt-7 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <p className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0 text-sage" /> {featured.dateLabel}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-sage" /> {featured.time} – {featured.endTime}
              </p>
              <p className="flex min-w-0 items-center gap-2 sm:col-span-2">
                <MapPin className="h-4 w-4 shrink-0 text-sage" />
                <span className="truncate">{featured.location}</span>
              </p>
            </div>
            <Button asChild variant="accent" size="lg" className="mt-8">
              <Link to="/events/$id" params={{ id: featured.id }}>
                View Event
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:bg-muted",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {visible.length > 0 ? (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="surface-card mt-10 p-16 text-center">
            <h3 className="text-2xl font-semibold">No events in this category yet</h3>
            <p className="mt-3 text-muted-foreground">
              Check back soon, or browse all of our upcoming gatherings.
            </p>
            <Button variant="outline" className="mt-6" onClick={() => setFilter("All")}>
              View all events
            </Button>
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}
