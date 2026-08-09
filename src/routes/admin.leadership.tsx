import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager } from "@/components/admin/ContentManager";
import { leadership } from "@/data/church";

export const Route = createFileRoute("/admin/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Manage staff profiles and their display order." },
      { property: "og:title", content: "Leadership — Church CMS" },
      { property: "og:description", content: "Manage staff profiles and their display order." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        title="Leadership"
        description="Manage staff profiles and their display order."
        addLabel="Add Leader"
        columns={["Name", "Position", "Status"]}
        rows={leadership.map((l) => ({ id: l.id, image: l.image, title: l.name, meta: l.role, extra: `Display order ${l.order} · drag to reorder`, status: l.status, updated: "Aug 2026" }))}
        editorFields={["Name", "Position", "Photo URL", "Biography", "Display Order"]}
        emptyTitle="No leaders yet"
        emptyDescription="Add your first staff profile to get started."
      />
    </AdminLayout>
  );
}
