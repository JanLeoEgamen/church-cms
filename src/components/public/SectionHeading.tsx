import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow text-accent">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl leading-tight font-semibold text-balance sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-primary/78" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 text-primary-foreground sm:py-32 lg:px-8">
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-semibold text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
