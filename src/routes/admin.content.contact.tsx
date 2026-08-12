import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { SingletonEditor } from "@/components/admin/SingletonEditor";

export const Route = createFileRoute("/admin/content/contact")({
  head: () => ({
    meta: [
      { title: "Contact Page — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Update contact details, office hours, and social links." },
      { property: "og:title", content: "Contact Page — Church CMS" },
      { property: "og:description", content: "Update contact details, office hours, and social links." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <AdminPageHeader
        title="Contact Page"
        description="Update contact details, office hours, and social links."
      />
      <SingletonEditor
        table="church_settings"
        sections={[
          {
            title: "Church Information",
            fields: [
              { name: "church_name", label: "Church Name" },
              { name: "address", label: "Address" },
              { name: "phone", label: "Phone" },
              { name: "email", label: "Email", type: "email" },
            ],
          },
          {
            title: "Hours & Map",
            fields: [
              { name: "office_hours", label: "Office Hours", type: "textarea" },
              { name: "google_maps_url", label: "Map URL" },
            ],
          },
          {
            title: "Social Media",
            fields: [
              { name: "facebook_url", label: "Facebook" },
              { name: "instagram_url", label: "Instagram" },
              { name: "youtube_url", label: "YouTube" },
            ],
          },
        ]}
      />
    </AdminLayout>
  );
}
