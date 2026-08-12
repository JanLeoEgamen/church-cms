import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { SingletonEditor } from "@/components/admin/SingletonEditor";

export const Route = createFileRoute("/admin/content/home")({
  head: () => ({
    meta: [
      { title: "Home Page — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Edit every section of the public homepage." },
      { property: "og:title", content: "Home Page — Church CMS" },
      { property: "og:description", content: "Edit every section of the public homepage." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Home Page" description="Edit every section of the public homepage." />
      <SingletonEditor
        table="homepage_content"
        sections={[
          {
            title: "Hero",
            fields: [
              { name: "eyebrow", label: "Eyebrow" },
              { name: "hero_title", label: "Heading" },
              { name: "hero_description", label: "Description", type: "textarea" },
              { name: "primary_button_text", label: "Primary Button Text" },
              { name: "primary_button_url", label: "Primary Button URL" },
              { name: "secondary_button_text", label: "Secondary Button Text" },
              { name: "secondary_button_url", label: "Secondary Button URL" },
              { name: "hero_image_url", label: "Hero Image URL" },
            ],
          },
          {
            title: "Welcome Section",
            fields: [
              { name: "welcome_title", label: "Heading" },
              { name: "welcome_description", label: "Description", type: "textarea" },
              { name: "welcome_image_url", label: "Image URL" },
              { name: "welcome_button_text", label: "Button Text" },
              { name: "welcome_button_url", label: "Button URL" },
            ],
          },
          {
            title: "About Section",
            fields: [
              { name: "about_title", label: "Heading" },
              { name: "about_description", label: "Description", type: "textarea" },
              { name: "about_image_url", label: "Image URL" },
              { name: "about_button_text", label: "Button Text" },
              { name: "about_button_url", label: "Button URL" },
            ],
          },
          {
            title: "Call To Action",
            fields: [
              { name: "cta_title", label: "Heading" },
              { name: "cta_description", label: "Description", type: "textarea" },
              { name: "cta_button_text", label: "Button Text" },
              { name: "cta_button_url", label: "Button URL" },
            ],
          },
        ]}
      />
    </AdminLayout>
  );
}
