import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager } from "@/components/admin/ContentManager";
import { ministries } from "@/data/church";

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
        title="Ministries"
        description="Manage the ministries shown on your public website."
        addLabel="Add Ministry"
        columns={["Ministry", "Schedule", "Status"]}
        rows={ministries.map((m) => ({ id: m.id, image: m.image, title: m.name, meta: m.schedule, status: m.status, updated: m.updated }))}
        editorFields={["Ministry Name", "Description", "Image URL", "Mission", "Schedule", "Contact Email"]}
        emptyTitle="No ministries yet"
        emptyDescription="Create your first ministry to get started."
      />
    </AdminLayout>
  );
}
