import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, Mail, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/public/CTASection";
import { events } from "@/data/church";

export const Route = createFileRoute("/_public/events/$id")({
  loader: ({ params }) => {
    const event = events.find((e) => e.id === params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Event Not Found — First Chirstian Church - Bagumbayan" }, { name: "robots", content: "noindex" }],
      };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — First Chirstian Church - Bagumbayan` },
        { name: "description", content: event.summary },
        { property: "og:title", content: `${event.title} — ${event.dateLabel}` },
        { property: "og:description", content: event.summary },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pt-10 lg:px-8">
        <Link to="/events" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
          <ArrowLeft className="h-4 w-4" /> All Events
        </Link>
        <div className="mt-6 overflow-hidden rounded-3xl shadow-soft">
          <img src={event.image} alt={event.title} className="aspect-[21/9] w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase">
              {event.category}
            </span>
            <h1 className="mt-5 text-4xl leading-tight font-semibold sm:text-5xl">{event.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{event.summary}</p>
            <h2 className="mt-12 text-2xl font-semibold">Event Information</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{event.description}</p>
          </div>

          <aside className="surface-card h-fit p-8">
            <h2 className="text-xl font-semibold">Details</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div className="flex gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <dt className="font-semibold">Date</dt>
                  <dd className="text-muted-foreground">{event.dateLabel}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <dt className="font-semibold">Time</dt>
                  <dd className="text-muted-foreground">
                    {event.time} – {event.endTime}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="font-semibold">Location</dt>
                  <dd className="text-muted-foreground">{event.location}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <User className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="font-semibold">Contact</dt>
                  <dd className="text-muted-foreground">{event.contact}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="font-semibold">Email</dt>
                  <dd className="break-all text-muted-foreground">{event.email}</dd>
                </div>
              </div>
            </dl>
            <Button asChild variant="accent" size="lg" className="mt-8 w-full">
              <Link to="/contact">I'm Interested</Link>
            </Button>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}
