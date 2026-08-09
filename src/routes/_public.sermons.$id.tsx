import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, Calendar, Play, User } from "lucide-react";
import { SermonCard } from "@/components/public/Cards";
import { CTASection } from "@/components/public/CTASection";
import { sermons } from "@/data/church";

export const Route = createFileRoute("/_public/sermons/$id")({
  loader: ({ params }) => {
    const sermon = sermons.find((s) => s.id === params.id);
    if (!sermon) throw notFound();
    return { sermon, related: sermons.filter((s) => s.id !== sermon.id).slice(0, 3) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Sermon Not Found — Grace Community Church" }, { name: "robots", content: "noindex" }],
      };
    }
    const { sermon } = loaderData;
    return {
      meta: [
        { title: `${sermon.title} — Grace Community Church` },
        { name: "description", content: sermon.summary },
        { property: "og:title", content: `${sermon.title} — ${sermon.speaker}` },
        { property: "og:description", content: sermon.summary },
      ],
    };
  },
  component: SermonDetail,
});

function SermonDetail() {
  const { sermon, related } = Route.useLoaderData();

  return (
    <>
      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Link
            to="/sermons"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/75 hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Sermon Library
          </Link>
          <p className="mt-6 text-sm tracking-wider text-gold uppercase">{sermon.series}</p>
          <h1 className="mt-3 max-w-4xl text-4xl leading-tight font-semibold sm:text-6xl">
            {sermon.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm text-primary-foreground/80">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4 text-accent" /> {sermon.speaker}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" /> {sermon.dateLabel}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" /> {sermon.scripture}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-14 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-ink shadow-lift">
          <img
            src={sermon.image}
            alt={sermon.title}
            className="aspect-video w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center text-primary-foreground">
              <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-background/90">
                <Play className="h-7 w-7 translate-x-0.5 fill-current text-accent" />
              </span>
              <p className="mt-5 text-sm tracking-wider uppercase">Video player · {sermon.duration}</p>
            </div>
          </div>
        </div>

        <h2 className="mt-14 text-3xl font-semibold">About This Message</h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{sermon.description}</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 lg:px-8">
        <h2 className="text-3xl font-semibold">Related Sermons</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {related.map((s) => (
            <SermonCard key={s.id} sermon={s} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
