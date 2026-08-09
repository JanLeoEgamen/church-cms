import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Pencil, Plus, Save, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminPageHeader, StatusBadge } from "./AdminLayout";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children?: ReactNode;
  hint?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children ?? <Input id={id} placeholder={hint} />}
      {hint && children && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-5 grid gap-5">{children}</div>
    </section>
  );
}

export function SaveBar({ primaryLabel = "Save Changes" }: { primaryLabel?: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        className="rounded-lg"
        onClick={() => toast.success("Changes saved successfully")}
      >
        <Save className="h-4 w-4" /> {primaryLabel}
      </Button>
      <Button asChild variant="outline" className="rounded-lg">
        <Link to="/">
          <Eye className="h-4 w-4" /> Preview Website
        </Link>
      </Button>
    </div>
  );
}

type Row = {
  id: string;
  image?: string;
  title: string;
  meta: string;
  extra?: string;
  status: string;
  updated: string;
};

export function ContentManager({
  title,
  description,
  addLabel,
  columns,
  rows,
  editorFields,
  emptyTitle,
  emptyDescription,
}: {
  title: string;
  description: string;
  addLabel: string;
  columns: [string, string, string];
  rows: Row[];
  editorFields: string[];
  emptyTitle: string;
  emptyDescription: string;
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Row | null>(null);

  const visible = rows.filter(
    (r) =>
      (status === "All" || r.status === status) &&
      (r.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        r.meta.toLowerCase().includes(query.trim().toLowerCase())),
  );

  const editorOpen = creating || editing !== null;

  return (
    <>
      <AdminPageHeader
        title={title}
        description={description}
        actions={
          <Button className="rounded-lg" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" /> {addLabel}
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${title.toLowerCase()}…`}
            className="h-10 rounded-lg pl-9"
          />
        </div>
        <div className="flex gap-2">
          {["All", "Published", "Draft"].map((s) => (
            <Button
              key={s}
              variant={status === s ? "default" : "outline"}
              size="sm"
              className="rounded-lg"
              onClick={() => setStatus(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyBlock title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="hidden grid-cols-[minmax(0,2.5fr)_minmax(0,1.5fr)_8rem_9rem] gap-4 border-b border-border px-5 py-3 text-xs font-bold tracking-wider text-muted-foreground uppercase md:grid">
            <span>{columns[0]}</span>
            <span>{columns[1]}</span>
            <span>{columns[2]}</span>
            <span className="text-right">Actions</span>
          </div>
          <ul className="divide-y divide-border">
            {visible.map((row) => (
              <li
                key={row.id}
                className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,2.5fr)_minmax(0,1.5fr)_8rem_9rem] md:items-center md:gap-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {row.image && (
                    <img
                      src={row.image}
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{row.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {row.extra ?? `Updated ${row.updated}`}
                    </p>
                  </div>
                </div>
                <p className="truncate text-sm text-muted-foreground">{row.meta}</p>
                <div>
                  <StatusBadge status={row.status} />
                </div>
                <div className="flex gap-1 md:justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit"
                    className="rounded-lg"
                    onClick={() => setEditing(row)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button asChild variant="ghost" size="icon" aria-label="Preview" className="rounded-lg">
                    <Link to="/">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Delete"
                    className="rounded-lg text-destructive"
                    onClick={() => setDeleting(row)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Dialog
        open={editorOpen}
        onOpenChange={(o) => {
          if (!o) {
            setCreating(false);
            setEditing(null);
          }
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{creating ? addLabel : `Edit ${editing?.title ?? ""}`}</DialogTitle>
            <DialogDescription>
              Content changes are saved as a draft until you publish them.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-2">
            {editorFields.map((f) =>
              f.toLowerCase().includes("description") ||
              f.toLowerCase().includes("bio") ||
              f.toLowerCase().includes("quote") ||
              f.toLowerCase().includes("content") ||
              f.toLowerCase().includes("mission") ? (
                <Field key={f} label={f}>
                  <Textarea rows={4} defaultValue={creating ? "" : undefined} />
                </Field>
              ) : (
                <Field key={f} label={f}>
                  <Input defaultValue={creating ? "" : editing?.title && f === "Title" ? editing.title : ""} />
                </Field>
              ),
            )}
            <Field label="Status">
              <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                <option>Draft</option>
                <option>Published</option>
              </select>
            </Field>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="rounded-lg"
              onClick={() => {
                setCreating(false);
                setEditing(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="rounded-lg"
              onClick={() => {
                toast.success("Draft saved");
                setCreating(false);
                setEditing(null);
              }}
            >
              Save Draft
            </Button>
            <Button
              className="rounded-lg"
              onClick={() => {
                toast.success("Changes saved successfully");
                setCreating(false);
                setEditing(null);
              }}
            >
              Publish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleting !== null} onOpenChange={(o) => !o && setDeleting(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
            <DialogDescription>
              "{deleting?.title}" will be removed from the website. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-lg" onClick={() => setDeleting(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-lg"
              onClick={() => {
                toast.error("Item deleted", { description: "You can restore it from the trash for 30 days." });
                setDeleting(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function EmptyBlock({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-14 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Button className="mt-6 rounded-lg" onClick={() => toast.success("Editor opened")}>
        <Plus className="h-4 w-4" /> Create your first item
      </Button>
    </div>
  );
}
