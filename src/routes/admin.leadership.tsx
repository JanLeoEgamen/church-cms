import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager, makeRow } from "@/components/admin/ContentManager";

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
        table="leaders"
        title="Leadership"
        description="Manage staff profiles and their display order."
        addLabel="Add Leader"
        columns={["Name", "Position", "Status"]}
        titleField="name"
        imageField="photo_url"
        orderBy="display_order"
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "position", label: "Position" },
          { name: "photo_url", label: "Photo URL" },
          { name: "biography", label: "Biography", type: "textarea" },
          { name: "display_order", label: "Display Order", type: "number" },
        ]}
        toRow={(row) => makeRow(row, { title: "name", meta: "position", image: "photo_url" })}
        emptyTitle="No leaders yet"
        emptyDescription="Add your first staff profile to get started."
      />
    </AdminLayout>
  );
}
