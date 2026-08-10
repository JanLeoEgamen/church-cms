import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];

const FALLBACK_IMAGE = "/seed/hero-worship.jpg";

export function formatDate(value: string | null | undefined) {
  if (!value) return "";
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function formatShortDate(value: string | null | undefined) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatTime(value: string | null | undefined) {
  if (!value) return "";
  const [h, m] = value.split(":");
  const hour = Number(h);
  if (Number.isNaN(hour)) return value;
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${display}:${m ?? "00"} ${suffix}`;
}

export function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function statusLabel(status: string | null | undefined) {
  return status === "published" ? "Published" : "Draft";
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export type Ministry = {
  id: string;
  uuid: string;
  name: string;
  short: string;
  description: string;
  mission: string;
  schedule: string;
  audience: string;
  leader: string;
  email: string;
  image: string;
  status: string;
  updated: string;
};

export function mapMinistry(row: Tables["ministries"]["Row"]): Ministry {
  return {
    id: row.slug,
    uuid: row.id,
    name: row.name,
    short: row.short_description ?? "",
    description: row.description ?? "",
    mission: row.mission ?? "",
    schedule: row.schedule ?? "",
    audience: row.audience ?? "",
    leader: row.leader_name ?? "",
    email: row.contact_email ?? "",
    image: row.image_url ?? FALLBACK_IMAGE,
    status: statusLabel(row.status),
    updated: formatShortDate(row.updated_at),
  };
}

export type ChurchEvent = {
  id: string;
  uuid: string;
  title: string;
  category: string;
  date: string;
  dateLabel: string;
  time: string;
  endTime: string;
  location: string;
  summary: string;
  description: string;
  contact: string;
  email: string;
  image: string;
  status: string;
  featured: boolean;
  updated: string;
};

export function mapEvent(row: Tables["events"]["Row"]): ChurchEvent {
  return {
    id: row.slug,
    uuid: row.id,
    title: row.title,
    category: titleCase(row.category ?? "other"),
    date: row.event_date ?? "",
    dateLabel: formatDate(row.event_date),
    time: formatTime(row.start_time),
    endTime: formatTime(row.end_time),
    location: row.location ?? "",
    summary: row.summary ?? "",
    description: row.description ?? "",
    contact: row.contact_name ?? "",
    email: row.contact_email ?? "",
    image: row.image_url ?? FALLBACK_IMAGE,
    status: statusLabel(row.status),
    featured: Boolean(row.is_featured),
    updated: formatShortDate(row.updated_at),
  };
}

export type Sermon = {
  id: string;
  uuid: string;
  title: string;
  speaker: string;
  date: string;
  dateLabel: string;
  scripture: string;
  series: string;
  duration: string;
  summary: string;
  description: string;
  image: string;
  videoUrl: string;
  status: string;
  featured: boolean;
  updated: string;
};

export function mapSermon(row: Tables["sermons"]["Row"]): Sermon {
  return {
    id: row.slug,
    uuid: row.id,
    title: row.title,
    speaker: row.speaker ?? "",
    date: row.sermon_date ?? "",
    dateLabel: formatDate(row.sermon_date),
    scripture: row.scripture_reference ?? "",
    series: row.series ?? "",
    duration: row.duration ?? "",
    summary: row.summary ?? "",
    description: row.description ?? "",
    image: row.thumbnail_url ?? FALLBACK_IMAGE,
    videoUrl: row.video_url ?? "",
    status: statusLabel(row.status),
    featured: Boolean(row.is_featured),
    updated: formatShortDate(row.updated_at),
  };
}

export type Announcement = {
  id: string;
  uuid: string;
  title: string;
  date: string;
  dateLabel: string;
  summary: string;
  body: string;
  image: string;
  status: string;
  featured: boolean;
  updated: string;
};

export function mapAnnouncement(row: Tables["announcements"]["Row"]): Announcement {
  return {
    id: row.slug,
    uuid: row.id,
    title: row.title,
    date: row.publish_date,
    dateLabel: formatDate(row.publish_date),
    summary: row.summary ?? "",
    body: row.content ?? "",
    image: row.image_url ?? FALLBACK_IMAGE,
    status: statusLabel(row.status),
    featured: Boolean(row.is_featured),
    updated: formatShortDate(row.updated_at),
  };
}

export type Leader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order: number;
  status: string;
  updated: string;
};

export function mapLeader(row: Tables["leaders"]["Row"]): Leader {
  return {
    id: row.id,
    name: row.name,
    role: row.position ?? "",
    bio: row.biography ?? "",
    image: row.photo_url ?? FALLBACK_IMAGE,
    order: row.display_order ?? 0,
    status: statusLabel(row.status),
    updated: formatShortDate(row.updated_at),
  };
}

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
  order: number;
  status: string;
  updated: string;
};

export function mapTestimonial(row: Tables["testimonials"]["Row"]): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role ?? "",
    quote: row.quote ?? "",
    image: row.photo_url ?? FALLBACK_IMAGE,
    order: row.display_order ?? 0,
    status: statusLabel(row.status),
    updated: formatShortDate(row.updated_at),
  };
}

export type ServiceTime = {
  id: string;
  name: string;
  time: string;
  detail: string;
};

export function mapServiceTime(row: Tables["service_times"]["Row"]): ServiceTime {
  const time = formatTime(row.start_time);
  return {
    id: row.id,
    name: row.name,
    time: row.day_of_week === "Sunday" ? time : `${row.day_of_week} · ${time}`,
    detail: row.description ?? "",
  };
}

export type SiteSettings = {
  name: string;
  shortName: string;
  tagline: string;
  address: string;
  addressLines: string[];
  phone: string;
  email: string;
  officeHours: string;
  mapsUrl: string;
  websiteTitle: string;
  websiteDescription: string;
  social: { facebook: string; instagram: string; youtube: string };
};

export function mapSettings(row: Tables["church_settings"]["Row"] | null): SiteSettings {
  const address = row?.address ?? "";
  return {
    name: row?.church_name ?? "First Chirstian Church - Bagumbayan",
    shortName: row?.church_name ?? "First Chirstian Church - Bagumbayan",
    tagline: row?.website_description ?? "",
    address,
    addressLines: address ? address.split(",").reduce<string[]>((acc, part, i) => {
      if (i === 0) acc.push(part.trim());
      else acc[1] = [acc[1], part.trim()].filter(Boolean).join(", ");
      return acc;
    }, []) : [],
    phone: row?.phone ?? "",
    email: row?.email ?? "",
    officeHours: row?.office_hours ?? "",
    mapsUrl: row?.google_maps_url ?? "",
    websiteTitle: row?.website_title ?? "First Chirstian Church - Bagumbayan",
    websiteDescription: row?.website_description ?? "",
    social: {
      facebook: row?.facebook_url ?? "",
      instagram: row?.instagram_url ?? "",
      youtube: row?.youtube_url ?? "",
    },
  };
}
