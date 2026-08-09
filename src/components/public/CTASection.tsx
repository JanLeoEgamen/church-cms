import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function CTASection({
  title = "There Is a Place for You Here",
  description = "Come worship with us, meet our community, and discover what it means to grow together.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center text-primary-foreground sm:px-16">
        <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl leading-tight font-semibold text-balance sm:text-5xl">{title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/75">{description}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="accent" size="lg">
              <Link to="/contact">Plan Your Visit</Link>
            </Button>
            <Button asChild variant="onImage" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
