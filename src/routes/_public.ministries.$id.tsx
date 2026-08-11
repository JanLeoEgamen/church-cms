import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/public/CTASection";
import { getPublicMinistry } from "@/lib/public.functions";
import { mapMinistry } from "@/lib/mappers";

export const Route = createFileRoute("/_public/ministries/$id")({
  loader: async ({ params }) => {
    const row = await getPublicMinistry({ data: { slug: params.id } });
    if (!row) throw notFound();
    return { ministry: mapMinistry(row) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Ministry Not Found — First Chirstian Church - Bagumbayan" }, { name: "robots", content: "noindex" }],
      };
    }
    const { ministry } = loaderData;
    return {
      meta: [
        { title: `${ministry.name} — First Chirstian Church - Bagumbayan` },
        { name: "description", content: ministry.short },
        { property: "og:title", content: `${ministry.name} — First Chirstian Church - Bagumbayan` },
        { property: "og:description", content: ministry.short },
      ],
    };
  },
  component: MinistryDetail,
});

function MinistryDetail() {
  const { ministry } = Route.useLoaderData();

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={ministry.image} alt={ministry.name} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/72" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 text-primary-foreground sm:py-32 lg:px-8">
          <Link
            to="/ministries"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> All Ministries
          </Link>
          <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-semibold sm:text-6xl">
            {ministry.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">{ministry.short}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <h2 className="text-3xl font-semibold">About This Ministry</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{ministry.description}</p>

            <h2 className="mt-12 text-3xl font-semibold">Our Mission</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{ministry.mission}</p>

            <h2 className="mt-12 text-3xl font-semibold">Who It's For</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">{ministry.audience}</p>
          </div>

          <aside className="surface-card h-fit p-8">
            <h3 className="text-xl font-semibold">Details</h3>
            <dl className="mt-6 space-y-6 text-sm">
              <div className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="font-semibold">Schedule</dt>
                  <dd className="text-muted-foreground">{ministry.schedule}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Users className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="font-semibold">Ministry Leader</dt>
                  <dd className="text-muted-foreground">{ministry.leader}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="font-semibold">Contact</dt>
                  <dd className="break-all text-muted-foreground">{ministry.email}</dd>
                </div>
              </div>
            </dl>
            <Button asChild variant="accent" size="lg" className="mt-8 w-full">
              <Link to="/contact">Get Involved</Link>
            </Button>
          </aside>
        </div>
      </section>

      <CTASection />
    </>
  );
}
