import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Field, Panel, SaveBar } from "@/components/admin/ContentManager";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin/content/about")({
  head: () => ({
    meta: [
      { title: "About Page — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Edit the story, mission, vision, and values shown on the About page." },
      { property: "og:title", content: "About Page — Church CMS" },
      { property: "og:description", content: "Edit the story, mission, vision, and values shown on the About page." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <AdminPageHeader title="About Page" description="Edit the story, mission, vision, and values shown on the About page." actions={<SaveBar primaryLabel="Save Changes" />} />
            <Panel title="Page Header">
        <Field label="Page Title" hint="" />
        <Field label="Introduction">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Main Image" hint="" />
      </Panel>
      <Panel title="Our Story">
        <Field label="Church Story">{<Textarea rows={3} defaultValue="" />}</Field>
      </Panel>
      <Panel title="Mission & Vision">
        <Field label="Mission">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Vision">{<Textarea rows={3} defaultValue="" />}</Field>
      </Panel>
      <Panel title="Values">
        <Field label="Faith">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Community">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Service">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Hope">{<Textarea rows={3} defaultValue="" />}</Field>
      </Panel>
      <Panel title="Leadership Section">
        <Field label="Section Heading" hint="" />
        <Field label="Leaders Displayed" hint="" />
      </Panel>
      <SaveBar primaryLabel="Save Changes" />
    </AdminLayout>
  );
}
