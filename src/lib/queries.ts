import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  mapAnnouncement,
  mapEvent,
  mapLeader,
  mapMinistry,
  mapSermon,
  mapServiceTime,
  mapSettings,
  mapTestimonial,
} from "./mappers";

function unwrap<T>({ data, error }: { data: T; error: { message: string } | null }) {
  if (error) throw new Error(error.message);
  return data;
}

export const ministriesQuery = () =>
  queryOptions({
    queryKey: ["public", "ministries"],
    queryFn: async () =>
      unwrap(
        await supabase
          .from("ministries")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true }),
      ).map(mapMinistry),
  });

export const ministryQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public", "ministry", slug],
    queryFn: async () => {
      const row = unwrap(
        await supabase.from("ministries").select("*").eq("slug", slug).eq("status", "published").maybeSingle(),
      );
      return row ? mapMinistry(row) : null;
    },
  });

export const eventsQuery = () =>
  queryOptions({
    queryKey: ["public", "events"],
    queryFn: async () =>
      unwrap(
        await supabase
          .from("events")
          .select("*")
          .eq("status", "published")
          .order("event_date", { ascending: true }),
      ).map(mapEvent),
  });

export const eventQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public", "event", slug],
    queryFn: async () => {
      const row = unwrap(
        await supabase.from("events").select("*").eq("slug", slug).eq("status", "published").maybeSingle(),
      );
      return row ? mapEvent(row) : null;
    },
  });

export const sermonsQuery = () =>
  queryOptions({
    queryKey: ["public", "sermons"],
    queryFn: async () =>
      unwrap(
        await supabase
          .from("sermons")
          .select("*")
          .eq("status", "published")
          .order("sermon_date", { ascending: false }),
      ).map(mapSermon),
  });

export const sermonQuery = (slug: string) =>
  queryOptions({
    queryKey: ["public", "sermon", slug],
    queryFn: async () => {
      const row = unwrap(
        await supabase.from("sermons").select("*").eq("slug", slug).eq("status", "published").maybeSingle(),
      );
      return row ? mapSermon(row) : null;
    },
  });

export const announcementsQuery = () =>
  queryOptions({
    queryKey: ["public", "announcements"],
    queryFn: async () =>
      unwrap(
        await supabase
          .from("announcements")
          .select("*")
          .eq("status", "published")
          .order("publish_date", { ascending: false }),
      ).map(mapAnnouncement),
  });

export const leadersQuery = () =>
  queryOptions({
    queryKey: ["public", "leaders"],
    queryFn: async () =>
      unwrap(
        await supabase
          .from("leaders")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true }),
      ).map(mapLeader),
  });

export const testimonialsQuery = () =>
  queryOptions({
    queryKey: ["public", "testimonials"],
    queryFn: async () =>
      unwrap(
        await supabase
          .from("testimonials")
          .select("*")
          .eq("status", "published")
          .order("display_order", { ascending: true }),
      ).map(mapTestimonial),
  });

export const serviceTimesQuery = () =>
  queryOptions({
    queryKey: ["public", "service_times"],
    queryFn: async () =>
      unwrap(
        await supabase
          .from("service_times")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true }),
      ).map(mapServiceTime),
  });

export const coreValuesQuery = () =>
  queryOptions({
    queryKey: ["public", "core_values"],
    queryFn: async () =>
      unwrap(
        await supabase
          .from("core_values")
          .select("*")
          .eq("is_active", true)
          .order("display_order", { ascending: true }),
      ),
  });

export const homepageQuery = () =>
  queryOptions({
    queryKey: ["public", "homepage"],
    queryFn: async () => unwrap(await supabase.from("homepage_content").select("*").limit(1).maybeSingle()),
  });

export const aboutQuery = () =>
  queryOptions({
    queryKey: ["public", "about"],
    queryFn: async () => unwrap(await supabase.from("about_content").select("*").limit(1).maybeSingle()),
  });

export const settingsQuery = () =>
  queryOptions({
    queryKey: ["public", "settings"],
    queryFn: async () =>
      mapSettings(unwrap(await supabase.from("church_settings").select("*").limit(1).maybeSingle())),
  });

/* ---------------- Admin (includes drafts) ---------------- */

export type AdminTable =
  | "ministries"
  | "events"
  | "sermons"
  | "announcements"
  | "testimonials"
  | "leaders"
  | "media";

export const adminListQuery = (table: AdminTable, orderBy = "updated_at", ascending = false) =>
  queryOptions({
    queryKey: ["admin", table],
    queryFn: async () =>
      unwrap(await supabase.from(table).select("*").order(orderBy, { ascending })) as Record<
        string,
        never
      >[] as unknown as Record<string, unknown>[],
  });

export const adminCountsQuery = () =>
  queryOptions({
    queryKey: ["admin", "counts"],
    queryFn: async () => {
      const tables = [
        "events",
        "sermons",
        "announcements",
        "ministries",
        "testimonials",
        "media",
      ] as const;
      const entries = await Promise.all(
        tables.map(async (t) => {
          const { count, error } = await supabase.from(t).select("id", { count: "exact", head: true });
          if (error) throw new Error(error.message);
          return [t, count ?? 0] as const;
        }),
      );
      return Object.fromEntries(entries) as Record<(typeof tables)[number], number>;
    },
  });

export const recentActivityQuery = () =>
  queryOptions({
    queryKey: ["admin", "activity"],
    queryFn: async () => {
      const sources = [
        { table: "events", label: "Event" },
        { table: "sermons", label: "Sermon" },
        { table: "announcements", label: "Announcement" },
        { table: "ministries", label: "Ministry" },
      ] as const;
      const results = await Promise.all(
        sources.map(async (s) => {
          const { data, error } = await supabase
            .from(s.table)
            .select("id,title,name,updated_at")
            .order("updated_at", { ascending: false })
            .limit(3);
          if (error) return [];
          return (data ?? []).map((row) => {
            const r = row as { id: string; title?: string; name?: string; updated_at: string };
            return {
              id: `${s.table}-${r.id}`,
              action: `Updated ${s.label.toLowerCase()} — ${r.title ?? r.name ?? ""}`,
              updated_at: r.updated_at,
            };
          });
        }),
      );
      return results
        .flat()
        .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
        .slice(0, 6);
    },
  });
