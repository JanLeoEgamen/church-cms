import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Field, Panel, SaveBar } from "@/components/admin/ContentManager";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Church details, website metadata, and your admin profile." },
      { property: "og:title", content: "Settings — Church CMS" },
      { property: "og:description", content: "Church details, website metadata, and your admin profile." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <AdminPageHeader title="Settings" description="Church details, website metadata, and your admin profile." actions={<SaveBar primaryLabel="Save Changes" />} />
            <Panel title="Church Information">
        <Field label="Church Name" hint="" />
        <Field label="Logo URL" hint="" />
        <Field label="Favicon URL" hint="" />
      </Panel>
      <Panel title="Website Settings">
        <Field label="Website Title" hint="" />
        <Field label="Website Description">{<Textarea rows={3} defaultValue="" />}</Field>
      </Panel>
      <Panel title="Admin Profile">
        <Field label="Name" hint="" />
        <Field label="Email" hint="" />
        <Field label="Password" hint="" />
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
