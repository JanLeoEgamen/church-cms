import { Link } from "@tanstack/react-router";
import { Church, Sunrise, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceTimes } from "@/data/church";
import { SectionHeading } from "./SectionHeading";

const icons = [Sunrise, Church, HandHeart];

export function ServiceTimes() {
  return (
    <section className="bg-secondary/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Service Times"
          title="Join Us This Sunday"
          description="Whether it's your first visit or your five-hundredth, there's a seat saved for you."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {serviceTimes.map((service, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={service.id} className="surface-card hover-lift p-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent/12 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold">{service.name}</h3>
                <p className="mt-2 font-display text-3xl text-accent">{service.time}</p>
                <p className="mt-4 text-sm text-muted-foreground">{service.detail}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="accent" size="lg">
            <Link to="/contact">Plan Your Visit</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
