import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager, makeRow } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Manage stories shared by your church community." },
      { property: "og:title", content: "Testimonials — Church CMS" },
      { property: "og:description", content: "Manage stories shared by your church community." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        table="testimonials"
        title="Testimonials"
        description="Manage stories shared by your church community."
        addLabel="Add Testimonial"
        columns={["Person", "Quote", "Status"]}
        titleField="name"
        imageField="photo_url"
        orderBy="display_order"
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "role", label: "Role" },
          { name: "photo_url", label: "Photo URL" },
          { name: "quote", label: "Quote", type: "textarea" },
          { name: "display_order", label: "Display Order", type: "number" },
        ]}
        toRow={(row) => makeRow(row, { title: "name", meta: "quote", image: "photo_url" })}
        emptyTitle="No testimonials yet"
        emptyDescription="Add a story from your community to get started."
      />
    </AdminLayout>
  );
}
