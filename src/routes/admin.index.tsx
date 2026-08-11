import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, HeartHandshake, Image, Megaphone, Mic, Quote } from "lucide-react";
import { AdminLayout, AdminPageHeader, StatCard } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { adminCountsQuery, recentActivityQuery } from "@/lib/queries";
import { formatShortDate } from "@/lib/mappers";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Overview of your church website content." },
      { property: "og:title", content: "Church CMS Dashboard" },
      { property: "og:description", content: "Here's what's happening with your website." },
    ],
  }),
  component: Page,
});

function Page() {
  const counts = useQuery(adminCountsQuery());
  const activity = useQuery(recentActivityQuery());

  const stats = [
    { label: "Events", value: counts.data?.events ?? "—", icon: CalendarDays },
    { label: "Sermons", value: counts.data?.sermons ?? "—", icon: Mic },
    { label: "Announcements", value: counts.data?.announcements ?? "—", icon: Megaphone },
    { label: "Ministries", value: counts.data?.ministries ?? "—", icon: HeartHandshake },
    { label: "Testimonials", value: counts.data?.testimonials ?? "—", icon: Quote },
    { label: "Media Files", value: counts.data?.media ?? "—", icon: Image },
  ];

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Welcome back"
        description="Here's what's happening with your website."
        actions={
          <Button asChild variant="outline" className="rounded-lg">
            <Link to="/admin/content/home">Edit Home Page</Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
        ))}
      </div>
      <section className="rounded-2xl border border-border bg-card shadow-soft">
        <h2 className="border-b border-border px-6 py-4 text-lg font-bold">Recent Activity</h2>
        <ul className="divide-y divide-border">
          {(activity.data ?? []).map((a) => (
            <li
              key={a.id}
              className="grid gap-1 px-6 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{a.action}</p>
              </div>
              <p className="text-xs text-muted-foreground sm:text-right">
                {formatShortDate(a.updated_at)}
              </p>
            </li>
          ))}
          {activity.isSuccess && (activity.data ?? []).length === 0 && (
            <li className="px-6 py-8 text-center text-sm text-muted-foreground">No activity yet.</li>
          )}
        </ul>
      </section>
    </AdminLayout>
  );
}
