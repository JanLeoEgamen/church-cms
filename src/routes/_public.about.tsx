import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/public/SectionHeading";
import { LeadershipCard } from "@/components/public/Cards";
import { CTASection } from "@/components/public/CTASection";
import { useQuery } from "@tanstack/react-query";
import { images, storyParagraphs } from "@/data/church";
import { coreValuesQuery, leadersQuery } from "@/lib/queries";

export const Route = createFileRoute("/_public/about")({
  head: () => ({
    meta: [
      { title: "About Us — First Chirstian Church - Bagumbayan" },
      {
        name: "description",
        content:
          "Our story, mission, vision, and values. First Chirstian Church - Bagumbayan has served Springfield since 1978 with plain teaching and practical care.",
      },
      { property: "og:title", content: "About First Chirstian Church - Bagumbayan" },
      {
        property: "og:description",
        content: "Since 1978, a church of families, students, and neighbors in Springfield, California.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data: leadership } = useQuery(leadersQuery());
  const { data: values } = useQuery(coreValuesQuery());
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        description="A congregation of ordinary people learning together what it means to follow Jesus in everyday life."
        image={images.welcomeCommunity}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading align="left" eyebrow="Our Story" title="Nearly Fifty Years in Springfield" />
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
              {storyParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img
              src={images.heroWorship}
              alt="Sunday worship at First Chirstian Church - Bagumbayan"
              loading="lazy"
              className="h-full min-h-80 w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-2 lg:px-8">
          <div className="surface-card p-10">
            <p className="eyebrow text-accent">Our Mission</p>
            <h2 className="mt-4 text-3xl font-semibold">To know Christ and make Him known.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We exist to help people meet Jesus, grow into maturity within a committed community, and
              serve Springfield with the same compassion we have received.
            </p>
          </div>
          <div className="surface-card p-10">
            <p className="eyebrow text-accent">Our Vision</p>
            <h2 className="mt-4 text-3xl font-semibold">A church woven into its neighborhood.</h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              We long to see every household in our city know that there is a church nearby that will
              pray for them, feed them, and welcome them without conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <SectionHeading eyebrow="Our Values" title="What Shapes Us" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(values ?? []).map((v) => (
            <div key={v.id} className="surface-card hover-lift p-8">
              <h3 className="text-2xl font-semibold">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Our Team" title="Meet Our Leadership" />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {(leadership ?? []).map((l) => (
              <LeadershipCard key={l.id} leader={l} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Come Be Part of Our Story"
        description="Visit on a Sunday, join a ministry, or simply say hello. We'd love to meet you."
      />
    </>
  );
}
