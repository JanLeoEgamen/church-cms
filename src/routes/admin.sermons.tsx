import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager } from "@/components/admin/ContentManager";
import { sermons } from "@/data/church";

export const Route = createFileRoute("/admin/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Publish weekly messages to the sermon library." },
      { property: "og:title", content: "Sermons — Church CMS" },
      { property: "og:description", content: "Publish weekly messages to the sermon library." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        title="Sermons"
        description="Publish weekly messages to the sermon library."
        addLabel="Add Sermon"
        columns={["Sermon", "Speaker & Date", "Status"]}
        rows={sermons.map((s) => ({ id: s.id, image: s.image, title: s.title, meta: `${s.speaker} · ${s.dateLabel}`, extra: s.scripture, status: s.status, updated: s.dateLabel }))}
        editorFields={["Sermon Title", "Speaker", "Date", "Scripture", "Description", "Thumbnail URL", "Video URL"]}
        emptyTitle="No sermons yet"
        emptyDescription="Add your first sermon to build the library."
      />
    </AdminLayout>
  );
}
