import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager, makeRow } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/events")({
  head: () => ({
    meta: [
      { title: "Events — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Create and publish upcoming church events." },
      { property: "og:title", content: "Events — Church CMS" },
      { property: "og:description", content: "Create and publish upcoming church events." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        table="events"
        title="Events"
        description="Create and publish upcoming church events."
        addLabel="Add Event"
        columns={["Event", "Date & Location", "Status"]}
        titleField="title"
        slugField="slug"
        imageField="image_url"
        fields={[
          { name: "title", label: "Event Title", required: true },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image_url", label: "Image URL" },
          { name: "event_date", label: "Date", type: "date" },
          { name: "start_time", label: "Start Time", type: "time" },
          { name: "end_time", label: "End Time", type: "time" },
          { name: "location", label: "Location" },
          { name: "category", label: "Category" },
          { name: "contact_name", label: "Contact Name" },
          { name: "contact_email", label: "Contact Email", type: "email" },
          { name: "registration_url", label: "Registration URL" },
        ]}
        toRow={(row) => makeRow(row, { title: "title", meta: "location", image: "image_url" })}
        emptyTitle="No events yet"
        emptyDescription="Add your first event to get started."
      />
    </AdminLayout>
  );
}
