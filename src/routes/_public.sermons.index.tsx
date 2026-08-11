import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Play, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/public/SectionHeading";
import { SermonCard } from "@/components/public/Cards";
import { CTASection } from "@/components/public/CTASection";
import { useQuery } from "@tanstack/react-query";
import { images } from "@/data/church";
import { sermonsQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_public/sermons/")({
  head: () => ({
    meta: [
      { title: "Sermon Library — First Chirstian Church - Bagumbayan" },
      {
        name: "description",
        content:
          "Watch and revisit messages from Pastor John Smith, Pastor Sarah Williams, and guest speakers at First Chirstian Church - Bagumbayan.",
      },
      { property: "og:title", content: "Sermon Library — First Chirstian Church - Bagumbayan" },
      { property: "og:description", content: "Messages from our Sunday gatherings, searchable by speaker." },
    ],
  }),
  component: SermonsPage,
});

function SermonsPage() {
  const [query, setQuery] = useState("");
  const [speaker, setSpeaker] = useState("All Speakers");
  const { data } = useQuery(sermonsQuery());
  const sermons = data ?? [];
  const featured = sermons.find((s) => s.featured) ?? sermons[0];
  const speakers = useMemo(
    () => ["All Speakers", ...Array.from(new Set(sermons.map((s) => s.speaker)))],
    [sermons],
  );

  const visible = sermons.filter((s) => {
    const matchesSpeaker = speaker === "All Speakers" || s.speaker === speaker;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.scripture.toLowerCase().includes(q) ||
      s.speaker.toLowerCase().includes(q);
    return matchesSpeaker && matchesQuery;
  });

  return (
    <>
      <PageHero
        eyebrow="Sermons"
        title="Messages for Everyday Faith"
        description="Missed a Sunday, or want to hear it again? Every message from our gatherings lives here."
        image={images.sermonBackdrop}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        {featured && (
        <>
        <p className="eyebrow text-accent">Featured Message</p>
        <div className="surface-card mt-6 grid overflow-hidden lg:grid-cols-2">
          <Link
            to="/sermons/$id"
            params={{ id: featured.id }}
            className="group relative block min-h-72"
          >
            <img src={featured.image} alt={featured.title} className="h-full w-full object-cover" />
            <span className="absolute inset-0 grid place-items-center bg-ink/40 transition-colors group-hover:bg-ink/55">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-background/90">
                <Play className="h-6 w-6 translate-x-0.5 fill-current text-accent" />
              </span>
            </span>
          </Link>
          <div className="p-8 sm:p-12">
            <p className="text-sm tracking-wide text-muted-foreground uppercase">{featured.series}</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{featured.title}</h2>
            <p className="mt-3 text-muted-foreground">
              {featured.speaker} · {featured.dateLabel} · {featured.duration}
            </p>
            <p className="mt-5 flex items-center gap-2 font-medium text-sage">
              <BookOpen className="h-4 w-4" /> {featured.scripture}
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">{featured.summary}</p>
            <Button asChild variant="accent" size="lg" className="mt-8">
              <Link to="/sermons/$id" params={{ id: featured.id }}>
                Watch Sermon
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, speaker, or scripture"
              className="h-12 rounded-full pl-11"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {speakers.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSpeaker(s)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  speaker === s
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:bg-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {visible.length > 0 ? (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((s) => (
              <SermonCard key={s.id} sermon={s} />
            ))}
          </div>
        ) : (
          <div className="surface-card mt-10 p-16 text-center">
            <h3 className="text-2xl font-semibold">No sermons match your search</h3>
            <p className="mt-3 text-muted-foreground">Try a different title, speaker, or passage.</p>
          </div>
        )}
      </section>

      <CTASection />
    </>
  );
}
