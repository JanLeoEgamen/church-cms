import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ServiceTimes } from "@/components/public/ServiceTimes";
import { CTASection } from "@/components/public/CTASection";
import {
  EventCard,
  LeadershipCard,
  MinistryCard,
  SermonCard,
  TestimonialCard,
} from "@/components/public/Cards";
import { events, images, leadership, ministries, sermons, testimonials, values } from "@/data/church";

export const Route = createFileRoute("/_public/")({
  head: () => ({
    meta: [
      { title: "First Chirstian Church - Bagumbayan — A Place to Belong in Springfield" },
      {
        name: "description",
        content:
          "First Chirstian Church - Bagumbayan is a Christ-centered community in Springfield, CA. Sunday worship at 9:00 and 10:30 AM. Ministries, sermons, and events for every season of life.",
      },
      { property: "og:title", content: "First Chirstian Church - Bagumbayan — A Place to Belong" },
      {
        property: "og:description",
        content:
          "Join us Sunday at 9:00 or 10:30 AM. A community committed to growing in faith, serving others, and sharing God's love.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
        <img
          src={images.heroWorship}
          alt="Congregation worshipping together at First Chirstian Church - Bagumbayan"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/60 to-ink/25" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-28 lg:px-8">
          <div className="rise-in max-w-3xl text-primary-foreground">
            <p className="eyebrow text-gold">Welcome to First Chirstian Church - Bagumbayan</p>
            <h1 className="mt-6 text-4xl leading-[1.03] font-semibold text-balance sm:text-6xl lg:text-7xl">
              A Place to Belong. A Faith to Live. A Community to Share.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/85">
              We are a Christ-centered community committed to growing in faith, serving others, and
              sharing God's love with our community.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="accent" size="xl">
                <Link to="/contact">Plan Your Visit</Link>
              </Button>
              <Button asChild variant="onImage" size="xl">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <img
              src={images.welcomeCommunity}
              alt="Members greeting one another in the church lobby"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome"
              title="You Are Welcome Here"
              description="Whether you are exploring faith, returning to church, or looking for a community to call home, there is a place for you here."
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              You'll find coffee in the lobby, friendly faces at the door, and no expectation that you
              have anything figured out. Come early, stay late, ask questions.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/about">Discover Our Church</Link>
            </Button>
          </div>
        </div>
      </section>

      <ServiceTimes />

      {/* About */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Church"
              title="Growing Together. Serving Together."
              description="For nearly fifty years Grace Community has been a home for families, students, and neighbors in Springfield."
            />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We teach the scriptures plainly, we pray for one another by name, and we take practical
              responsibility for the wellbeing of our city — from the Saturday food pantry to the
              tutoring program at Lincoln Elementary.
            </p>
            <Button asChild variant="outline" size="lg" className="mt-8">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-soft lg:order-first">
            <img
              src={images.ministryOutreach}
              alt="Volunteers packing grocery boxes for the community"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="What We Believe" title="Our Mission & Values" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.id} className="surface-card hover-lift p-8">
                <span className="font-display text-4xl text-accent/60">
                  {String(values.indexOf(v) + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-2xl font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <SectionHeading eyebrow="Upcoming Events" title="What's Happening" />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.slice(0, 3).map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/events">View All Events</Link>
          </Button>
        </div>
      </section>

      {/* Sermons */}
      <section className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="eyebrow text-gold">Teaching</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">Latest Sermons</h2>
            </div>
            <Button asChild variant="onImage" className="justify-self-start md:justify-self-end">
              <Link to="/sermons">
                Browse Library <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-14 grid gap-8 text-foreground md:grid-cols-2 lg:grid-cols-3">
            {sermons.slice(0, 3).map((s) => (
              <SermonCard key={s.id} sermon={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <SectionHeading
          eyebrow="Ministries"
          title="Find Your Community"
          description="From toddlers to grandparents, there is a group here where you'll be known by name."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {ministries.slice(0, 6).map((m) => (
            <MinistryCard key={m.id} ministry={m} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/ministries">See All Ministries</Link>
          </Button>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-secondary/60 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Our Team" title="Meet Our Leadership" />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((l) => (
              <LeadershipCard key={l.id} leader={l} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="Stories From Our Community" />
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
