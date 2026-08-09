import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Field, Panel, SaveBar } from "@/components/admin/ContentManager";
import { Textarea } from "@/components/ui/textarea";

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
      <AdminPageHeader title="Contact Page" description="Update contact details, office hours, and social links." actions={<SaveBar primaryLabel="Save Changes" />} />
            <Panel title="Church Information">
        <Field label="Church Name" hint="" />
        <Field label="Address" hint="" />
        <Field label="Phone" hint="" />
        <Field label="Email" hint="" />
      </Panel>
      <Panel title="Hours & Map">
        <Field label="Office Hours" hint="" />
        <Field label="Map URL" hint="" />
      </Panel>
      <Panel title="Social Media">
        <Field label="Facebook" hint="" />
        <Field label="Instagram" hint="" />
        <Field label="YouTube" hint="" />
      </Panel>
      <SaveBar primaryLabel="Save Changes" />
    </AdminLayout>
  );
}
