import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock, MapPin, Play, Quote, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type {
  Announcement,
  ChurchEvent,
  Leader,
  Ministry,
  Sermon,
  Testimonial,
} from "@/lib/mappers";

export function MinistryCard({ ministry }: { ministry: Ministry }) {
  return (
    <article className="surface-card hover-lift group flex flex-col overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={ministry.image}
          alt={ministry.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold">{ministry.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{ministry.short}</p>
        <p className="mt-4 flex items-center gap-2 text-xs font-medium text-sage">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span className="min-w-0 truncate">{ministry.schedule}</span>
        </p>
        <Link
          to="/ministries/$id"
          params={{ id: ministry.id }}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent"
        >
          Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export function EventCard({ event }: { event: ChurchEvent }) {
  return (
    <article className="surface-card hover-lift group flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-background/95 px-3 py-1 text-[0.7rem] font-semibold tracking-wider uppercase">
          {event.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-accent uppercase">
          <Calendar className="h-3.5 w-3.5" /> {event.dateLabel}
        </p>
        <h3 className="mt-3 text-2xl leading-snug font-semibold">{event.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{event.summary}</p>
        <div className="mt-5 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-sage" /> {event.time}
          </p>
          <p className="flex min-w-0 items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-sage" />
            <span className="truncate">{event.location}</span>
          </p>
        </div>
        <Button asChild variant="outline" className="mt-6 self-start">
          <Link to="/events/$id" params={{ id: event.id }}>
            View Event
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <article className="surface-card hover-lift group flex flex-col overflow-hidden">
      <Link
        to="/sermons/$id"
        params={{ id: sermon.id }}
        className="relative block aspect-[16/9] overflow-hidden"
      >
        <img
          src={sermon.image}
          alt={sermon.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-ink/35 transition-colors group-hover:bg-ink/50" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-background/90 shadow-soft transition-transform duration-300 group-hover:scale-110">
            <Play className="h-5 w-5 translate-x-0.5 fill-current text-accent" />
          </span>
        </span>
        <span className="absolute right-4 bottom-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
          {sermon.duration}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl leading-snug font-semibold">{sermon.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {sermon.speaker} · {sermon.dateLabel}
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-sage">
          <BookOpen className="h-4 w-4 shrink-0" /> {sermon.scripture}
        </p>
        <Button asChild variant="accent" className="mt-6 self-start">
          <Link to="/sermons/$id" params={{ id: sermon.id }}>
            Watch Sermon
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  return (
    <article className="surface-card hover-lift group grid overflow-hidden md:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
      <div className="aspect-[16/10] overflow-hidden md:aspect-auto">
        <img
          src={announcement.image}
          alt={announcement.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <p className="eyebrow text-accent">{announcement.dateLabel}</p>
        <h3 className="mt-3 text-2xl leading-snug font-semibold">{announcement.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{announcement.summary}</p>
        <details className="group/details mt-4">
          <summary className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-accent">
            Read More <ArrowRight className="h-4 w-4" />
          </summary>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{announcement.body}</p>
        </details>
      </div>
    </article>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="surface-card flex h-full flex-col p-8">
      <Quote className="h-8 w-8 text-accent/40" />
      <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-pretty">
        "{testimonial.quote}"
      </blockquote>
      <figcaption className="mt-7 flex min-w-0 items-center gap-4 border-t border-border pt-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          loading="lazy"
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold">{testimonial.name}</p>
          <p className="truncate text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function LeadershipCard({ leader }: { leader: Leader }) {
  return (
    <article className="group text-center">
      <div className="overflow-hidden rounded-3xl">
        <img
          src={leader.image}
          alt={leader.name}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-6 text-2xl font-semibold">{leader.name}</h3>
      <p className="mt-1 text-sm font-semibold tracking-wider text-accent uppercase">{leader.role}</p>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{leader.bio}</p>
    </article>
  );
}
