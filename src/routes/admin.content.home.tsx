import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Field, Panel, SaveBar } from "@/components/admin/ContentManager";
import { Textarea } from "@/components/ui/textarea";

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
      <AdminPageHeader title="Home Page" description="Edit every section of the public homepage." actions={<SaveBar primaryLabel="Save Changes" />} />
            <Panel title="Hero">
        <Field label="Eyebrow" hint="" />
        <Field label="Heading" hint="" />
        <Field label="Description">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Primary Button" hint="" />
        <Field label="Secondary Button" hint="" />
        <Field label="Hero Image" hint="" />
      </Panel>
      <Panel title="Welcome Section">
        <Field label="Heading" hint="" />
        <Field label="Description">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Image" hint="" />
        <Field label="Button" hint="" />
      </Panel>
      <Panel title="Service Times">
        <Field label="Service 1 Name" hint="" />
        <Field label="Service 1 Time" hint="" />
        <Field label="Service 2 Name" hint="" />
        <Field label="Service 2 Time" hint="" />
        <Field label="Midweek Name" hint="" />
        <Field label="Midweek Time" hint="" />
      </Panel>
      <Panel title="Mission / Values">
        <Field label="Faith Card">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Community Card">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Service Card">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Hope Card">{<Textarea rows={3} defaultValue="" />}</Field>
      </Panel>
      <Panel title="Featured Events">
        <Field label="Featured Event 1" hint="" />
        <Field label="Featured Event 2" hint="" />
        <Field label="Featured Event 3" hint="" />
      </Panel>
      <Panel title="Latest Sermons">
        <Field label="Featured Sermon 1" hint="" />
        <Field label="Featured Sermon 2" hint="" />
        <Field label="Featured Sermon 3" hint="" />
      </Panel>
      <Panel title="Testimonials">
        <Field label="Featured Testimonial 1" hint="" />
        <Field label="Featured Testimonial 2" hint="" />
        <Field label="Featured Testimonial 3" hint="" />
      </Panel>
      <Panel title="Call To Action">
        <Field label="Heading" hint="" />
        <Field label="Description">{<Textarea rows={3} defaultValue="" />}</Field>
        <Field label="Button" hint="" />
      </Panel>
      <SaveBar primaryLabel="Save Changes" />
    </AdminLayout>
  );
}
