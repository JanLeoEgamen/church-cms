import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager } from "@/components/admin/ContentManager";
import { announcements } from "@/data/church";

export const Route = createFileRoute("/admin/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Share church news and updates with your congregation." },
      { property: "og:title", content: "Announcements — Church CMS" },
      { property: "og:description", content: "Share church news and updates with your congregation." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        title="Announcements"
        description="Share church news and updates with your congregation."
        addLabel="Add Announcement"
        columns={["Announcement", "Publish Date", "Status"]}
        rows={announcements.map((a) => ({ id: a.id, image: a.image, title: a.title, meta: a.dateLabel, status: a.status, updated: a.dateLabel }))}
        editorFields={["Title", "Content", "Featured Image URL", "Publish Date"]}
        emptyTitle="No announcements yet"
        emptyDescription="Post your first announcement to get started."
      />
    </AdminLayout>
  );
}
