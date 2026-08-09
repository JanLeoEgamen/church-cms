import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager } from "@/components/admin/ContentManager";
import { testimonials } from "@/data/church";

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
        title="Testimonials"
        description="Manage stories shared by your church community."
        addLabel="Add Testimonial"
        columns={["Person", "Quote", "Status"]}
        rows={testimonials.map((t) => ({ id: t.id, image: t.image, title: t.name, meta: t.quote, extra: t.role, status: t.status, updated: "Aug 2026" }))}
        editorFields={["Name", "Photo URL", "Quote"]}
        emptyTitle="No testimonials yet"
        emptyDescription="Add a story from your community to get started."
      />
    </AdminLayout>
  );
}
