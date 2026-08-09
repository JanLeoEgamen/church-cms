import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager } from "@/components/admin/ContentManager";
import { events } from "@/data/church";

export const Route = createFileRoute("/admin/events")({
  head: () => ({
    meta: [
      { title: "Events — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Create, schedule, and publish church events." },
      { property: "og:title", content: "Events — Church CMS" },
      { property: "og:description", content: "Create, schedule, and publish church events." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        title="Events"
        description="Create, schedule, and publish church events."
        addLabel="Add Event"
        columns={["Event", "Date & Location", "Status"]}
        rows={events.map((e) => ({ id: e.id, image: e.image, title: e.title, meta: `${e.dateLabel} · ${e.location}`, extra: `${e.time} – ${e.endTime}`, status: e.status, updated: e.dateLabel }))}
        editorFields={["Event Title", "Description", "Image URL", "Date", "Start Time", "End Time", "Location", "Contact Information", "Registration URL"]}
        emptyTitle="No events yet"
        emptyDescription="Create your first event to get started."
      />
    </AdminLayout>
  );
}
