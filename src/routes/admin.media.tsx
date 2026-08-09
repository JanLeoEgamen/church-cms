import { createFileRoute } from "@tanstack/react-router";
import { Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { mediaFiles } from "@/data/church";

export const Route = createFileRoute("/admin/media")({
  head: () => ({
    meta: [
      { title: "Media Library — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Browse and manage images used across the church website." },
      { property: "og:title", content: "Media Library — Church CMS" },
      { property: "og:description", content: "Browse and manage church website images." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AdminLayout>
      <AdminPageHeader
        title="Media Library"
        description="124 files · 1.8 GB of 5 GB used"
        actions={
          <Button className="rounded-lg" onClick={() => toast.success("Changes saved successfully")}>
            <Upload className="h-4 w-4" /> Upload Files
          </Button>
        }
      />
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center">
        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium">Drag and drop images here</p>
        <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, or WEBP up to 10 MB each</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {mediaFiles.map((f) => (
          <figure key={f.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={f.src} alt={f.name} loading="lazy" className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label={`Delete ${f.name}`}
                onClick={() => toast.error("File deleted")}
                className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-lg bg-background/90 text-destructive opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <figcaption className="p-4">
              <p className="truncate text-sm font-medium">{f.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {f.type} · {f.size} · {f.date}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </AdminLayout>
  );
}
