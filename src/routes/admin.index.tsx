import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, HeartHandshake, Image, Megaphone, Mic, Quote } from "lucide-react";
import { AdminLayout, AdminPageHeader, StatCard } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { recentActivity } from "@/data/church";

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

const stats = [
  { label: "Events", value: 12, icon: CalendarDays },
  { label: "Sermons", value: 34, icon: Mic },
  { label: "Announcements", value: 8, icon: Megaphone },
  { label: "Ministries", value: 8, icon: HeartHandshake },
  { label: "Testimonials", value: 16, icon: Quote },
  { label: "Media Files", value: 124, icon: Image },
];

function Page() {
  return (
    <AdminLayout>
      <AdminPageHeader
        title="Good morning, Admin"
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
          {recentActivity.map((a) => (
            <li key={a.id} className="grid gap-1 px-6 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{a.action}</p>
                <p className="text-xs text-muted-foreground">by {a.user}</p>
              </div>
              <p className="text-xs text-muted-foreground sm:text-right">{a.time}</p>
            </li>
          ))}
        </ul>
      </section>
    </AdminLayout>
  );
}
