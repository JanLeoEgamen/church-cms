import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager, makeRow } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/ministries")({
  head: () => ({
    meta: [
      { title: "Ministries — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Manage the ministries shown on your public website." },
      { property: "og:title", content: "Ministries — Church CMS" },
      { property: "og:description", content: "Manage the ministries shown on your public website." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        table="ministries"
        title="Ministries"
        description="Manage the ministries shown on your public website."
        addLabel="Add Ministry"
        columns={["Ministry", "Schedule", "Status"]}
        titleField="name"
        slugField="slug"
        imageField="image_url"
        orderBy="display_order"
        fields={[
          { name: "name", label: "Ministry Name", required: true },
          { name: "short_description", label: "Short Description", type: "textarea" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "image_url", label: "Image URL" },
          { name: "mission", label: "Mission", type: "textarea" },
          { name: "schedule", label: "Schedule" },
          { name: "audience", label: "Audience" },
          { name: "leader_name", label: "Leader Name" },
          { name: "contact_email", label: "Contact Email", type: "email" },
          { name: "display_order", label: "Display Order", type: "number" },
        ]}
        toRow={(row) => makeRow(row, { title: "name", meta: "schedule", image: "image_url" })}
        emptyTitle="No ministries yet"
        emptyDescription="Create your first ministry to get started."
      />
    </AdminLayout>
  );
}
