import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager, makeRow } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Share news and updates with the congregation." },
      { property: "og:title", content: "Announcements — Church CMS" },
      { property: "og:description", content: "Share news and updates with the congregation." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        table="announcements"
        title="Announcements"
        description="Share news and updates with the congregation."
        addLabel="Add Announcement"
        columns={["Announcement", "Summary", "Status"]}
        titleField="title"
        slugField="slug"
        imageField="image_url"
        orderBy="publish_date"
        fields={[
          { name: "title", label: "Title", required: true },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "content", label: "Content", type: "textarea" },
          { name: "image_url", label: "Image URL" },
        ]}
        toRow={(row) => makeRow(row, { title: "title", meta: "summary", image: "image_url" })}
        emptyTitle="No announcements yet"
        emptyDescription="Post your first announcement to get started."
      />
    </AdminLayout>
  );
}
