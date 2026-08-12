import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { SingletonEditor } from "@/components/admin/SingletonEditor";

export const Route = createFileRoute("/admin/content/about")({
  head: () => ({
    meta: [
      { title: "About Page — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Edit the story, mission, and vision shown on the About page." },
      { property: "og:title", content: "About Page — Church CMS" },
      { property: "og:description", content: "Edit the story, mission, and vision shown on the About page." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <AdminPageHeader
        title="About Page"
        description="Edit the story, mission, and vision shown on the About page."
      />
      <SingletonEditor
        table="about_content"
        sections={[
          {
            title: "Page Header",
            fields: [
              { name: "page_title", label: "Page Title" },
              { name: "introduction", label: "Introduction", type: "textarea" },
              { name: "about_image_url", label: "Main Image URL" },
            ],
          },
          {
            title: "Our Story",
            fields: [{ name: "church_story", label: "Church Story", type: "textarea" }],
          },
          {
            title: "Mission & Vision",
            fields: [
              { name: "mission", label: "Mission", type: "textarea" },
              { name: "vision", label: "Vision", type: "textarea" },
            ],
          },
        ]}
      />
    </AdminLayout>
  );
}
