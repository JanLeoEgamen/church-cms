import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentManager, makeRow } from "@/components/admin/ContentManager";

export const Route = createFileRoute("/admin/sermons")({
  head: () => ({
    meta: [
      { title: "Sermons — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Publish sermon recordings and notes." },
      { property: "og:title", content: "Sermons — Church CMS" },
      { property: "og:description", content: "Publish sermon recordings and notes." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <ContentManager
        table="sermons"
        title="Sermons"
        description="Publish sermon recordings and notes."
        addLabel="Add Sermon"
        columns={["Sermon", "Speaker", "Status"]}
        titleField="title"
        slugField="slug"
        imageField="thumbnail_url"
        fields={[
          { name: "title", label: "Sermon Title", required: true },
          { name: "speaker", label: "Speaker" },
          { name: "sermon_date", label: "Date", type: "date" },
          { name: "scripture_reference", label: "Scripture Reference" },
          { name: "series", label: "Series" },
          { name: "duration", label: "Duration" },
          { name: "summary", label: "Summary", type: "textarea" },
          { name: "description", label: "Description", type: "textarea" },
          { name: "thumbnail_url", label: "Thumbnail URL" },
          { name: "video_url", label: "Video URL" },
        ]}
        toRow={(row) => makeRow(row, { title: "title", meta: "speaker", image: "thumbnail_url" })}
        emptyTitle="No sermons yet"
        emptyDescription="Add your first sermon to get started."
      />
    </AdminLayout>
  );
}
