import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-auth";
import { formatShortDate } from "@/lib/mappers";

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

const BUCKET = "church-media";
const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/svg+xml"];
const MAX_BYTES = 10 * 1024 * 1024;

type MediaRow = {
  id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  file_size: number | null;
  created_at: string;
  signedUrl: string | null;
};

function formatSize(bytes: number | null) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function Page() {
  const queryClient = useQueryClient();
  const { user } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const { data: files = [], isLoading } = useQuery({
    queryKey: ["admin", "media"],
    queryFn: async (): Promise<MediaRow[]> => {
      const { data, error } = await supabase
        .from("media")
        .select("id, file_name, storage_path, mime_type, file_size, created_at")
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      const rows = data ?? [];
      if (rows.length === 0) return [];
      const { data: signed } = await supabase.storage
        .from(BUCKET)
        .createSignedUrls(rows.map((r) => r.storage_path), 60 * 60);
      const byPath = new Map((signed ?? []).map((s) => [s.path ?? "", s.signedUrl]));
      return rows.map((r) => ({ ...r, signedUrl: byPath.get(r.storage_path) ?? null }));
    },
  });

  const upload = useMutation({
    mutationFn: async (list: File[]) => {
      for (const file of list) {
        if (!ALLOWED.includes(file.type)) {
          throw new Error(`${file.name}: only JPG, PNG, WEBP, or SVG files are allowed`);
        }
        if (file.size > MAX_BYTES) throw new Error(`${file.name}: file must be under 10 MB`);
      }
      for (const file of list) {
        const ext = file.name.split(".").pop() ?? "bin";
        const path = `uploads/${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from(BUCKET)
          .upload(path, file, { contentType: file.type, upsert: false });
        if (upErr) throw new Error(upErr.message);
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
        const { error: insErr } = await supabase.from("media").insert({
          file_name: file.name,
          storage_path: path,
          public_url: pub.publicUrl,
          mime_type: file.type,
          file_size: file.size,
          folder: "uploads",
          uploaded_by: user?.id ?? null,
        });
        if (insErr) throw new Error(insErr.message);
      }
    },
    onSuccess: () => {
      toast.success("Upload complete");
      queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "counts"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: async (row: MediaRow) => {
      const { error: sErr } = await supabase.storage.from(BUCKET).remove([row.storage_path]);
      if (sErr) throw new Error(sErr.message);
      const { error } = await supabase.from("media").delete().eq("id", row.id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("File deleted");
      queryClient.invalidateQueries({ queryKey: ["admin", "media"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "counts"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const totalBytes = files.reduce((sum, f) => sum + (f.file_size ?? 0), 0);

  function handleFiles(fileList: FileList | null) {
    const list = Array.from(fileList ?? []);
    if (list.length > 0) upload.mutate(list);
  }

  return (
    <AdminLayout>
      <AdminPageHeader
        title="Media Library"
        description={`${files.length} files · ${formatSize(totalBytes)} used`}
        actions={
          <Button
            className="rounded-lg"
            onClick={() => inputRef.current?.click()}
            disabled={upload.isPending}
          >
            {upload.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}{" "}
            Upload Files
          </Button>
        }
      />
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.svg"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`rounded-2xl border border-dashed p-10 text-center transition-colors ${
          dragging ? "border-primary bg-primary/5" : "border-border bg-card/60"
        }`}
      >
        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium">Drag and drop images here</p>
        <p className="mt-1 text-xs text-muted-foreground">JPG, PNG, WEBP, or SVG up to 10 MB each</p>
      </div>

      {isLoading ? (
        <div className="grid place-items-center py-20 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : files.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No files uploaded yet.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {files.map((f) => (
            <figure
              key={f.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                {f.signedUrl && (
                  <img
                    src={f.signedUrl}
                    alt={f.file_name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
                <button
                  type="button"
                  aria-label={`Delete ${f.file_name}`}
                  onClick={() => {
                    if (window.confirm(`Delete ${f.file_name}? This cannot be undone.`)) {
                      remove.mutate(f);
                    }
                  }}
                  className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-lg bg-background/90 text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <figcaption className="p-4">
                <p className="truncate text-sm font-medium">{f.file_name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {(f.mime_type ?? "").replace("image/", "").toUpperCase()} · {formatSize(f.file_size)} ·{" "}
                  {formatShortDate(f.created_at)}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
