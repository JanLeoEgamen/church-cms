import { useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, Loader2, Pencil, Plus, Save, Search, Trash2 } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { slugify, statusLabel, formatShortDate } from "@/lib/mappers";
import { adminListQuery, type AdminTable } from "@/lib/queries";
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

export function SaveBar({
  primaryLabel = "Save Changes",
  onSave,
  saving,
}: {
  primaryLabel?: string;
  onSave?: () => void;
  saving?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button className="rounded-lg" onClick={onSave} disabled={saving}>
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{" "}
        {primaryLabel}
      </Button>
      <Button asChild variant="outline" className="rounded-lg">
        <Link to="/">
          <Eye className="h-4 w-4" /> Preview Website
        </Link>
      </Button>
    </div>
  );
}

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "date" | "time" | "email";
  required?: boolean;
};

type DbRow = Record<string, unknown>;

export type DisplayRow = {
  id: string;
  image?: string | undefined;
  title: string;
  meta: string;
  extra?: string | undefined;
  status: string;
  updated: string;
};

const PAGE_SIZE = 8;

export function ContentManager({
  table,
  title,
  description,
  addLabel,
  columns,
  fields,
  toRow,
  titleField = "title",
  slugField,
  hasStatus = true,
  imageField,
  orderBy = "updated_at",
  emptyTitle,
  emptyDescription,
}: {
  table: AdminTable;
  title: string;
  description: string;
  addLabel: string;
  columns: [string, string, string];
  fields: FieldDef[];
  toRow: (row: DbRow) => DisplayRow;
  titleField?: string;
  slugField?: string;
  hasStatus?: boolean;
  imageField?: string;
  orderBy?: string;
  emptyTitle: string;
  emptyDescription: string;
}) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(adminListQuery(table, orderBy));
  const rows = data ?? [];

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<DbRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState("draft");
  const [deleting, setDeleting] = useState<DisplayRow | null>(null);

  const display = useMemo(() => rows.map((r) => ({ row: r, view: toRow(r) })), [rows, toRow]);

  const visible = display.filter(
    ({ view }) =>
      (status === "All" || view.status === status) &&
      (view.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        view.meta.toLowerCase().includes(query.trim().toLowerCase())),
  );

  const pageCount = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const paged = visible.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const openCreate = () => {
    setForm(Object.fromEntries(fields.map((f) => [f.name, ""])));
    setFormStatus("draft");
    setCreating(true);
  };

  const openEdit = (row: DbRow) => {
    setForm(
      Object.fromEntries(fields.map((f) => [f.name, row[f.name] == null ? "" : String(row[f.name])])),
    );
    setFormStatus(typeof row['status'] === "string" ? row['status'] : "draft");
    setEditing(row);
  };

  const close = () => {
    setCreating(false);
    setEditing(null);
  };

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["admin"] });
    queryClient.invalidateQueries({ queryKey: ["public"] });
  };

  const save = useMutation({
    mutationFn: async (nextStatus: string) => {
      const missing = fields.filter((f) => f.required && !form[f.name]?.trim());
      if (missing.length) throw new Error(`${missing[0]!.label} is required.`);

      const payload: Record<string, unknown> = {};
      for (const f of fields) {
        const raw = form[f.name]?.trim() ?? "";
        payload[f.name] = raw === "" ? null : f.type === "number" ? Number(raw) : raw;
      }
      if (hasStatus) payload['status'] = nextStatus;
      if (slugField) {
        const base = slugify(String(form[titleField] ?? "")) || `item-${Date.now()}`;
        const taken = rows.some(
          (r) => r[slugField] === base && (!editing || r['id'] !== editing['id']),
        );
        payload[slugField] = taken ? `${base}-${Date.now().toString(36).slice(-4)}` : base;
      }

      const { data: auth } = await supabase.auth.getUser();
      const uid = auth.user?.id ?? null;

      if (editing) {
        const { error: err } = await supabase
          .from(table)
          .update({ ...payload, ...(uid ? { updated_by: uid } : {}) } as never)
          .eq("id", String(editing['id']));
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await supabase
          .from(table)
          .insert({ ...payload, ...(uid ? { created_by: uid, updated_by: uid } : {}) } as never);
        if (err) throw new Error(err.message);
      }
    },
    onSuccess: (_d, nextStatus) => {
      invalidate();
      toast.success(nextStatus === "published" ? "Published successfully" : "Draft saved");
      close();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error: err } = await supabase.from(table).delete().eq("id", id);
      if (err) throw new Error(err.message);
    },
    onSuccess: () => {
      invalidate();
      toast.success("Item deleted");
      setDeleting(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const editorOpen = creating || editing !== null;

  return (
    <>
      <AdminPageHeader
        title={title}
        description={description}
        actions={
          <Button className="rounded-lg" onClick={openCreate}>
            <Plus className="h-4 w-4" /> {addLabel}
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
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
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid place-items-center rounded-2xl border border-border bg-card p-14">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-8 text-center text-sm text-destructive">
          {(error as Error).message}
        </div>
      ) : visible.length === 0 ? (
        <EmptyBlock title={emptyTitle} description={emptyDescription} onCreate={openCreate} />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          <div className="hidden grid-cols-[minmax(0,2.5fr)_minmax(0,1.5fr)_8rem_9rem] gap-4 border-b border-border px-5 py-3 text-xs font-bold tracking-wider text-muted-foreground uppercase md:grid">
            <span>{columns[0]}</span>
            <span>{columns[1]}</span>
            <span>{columns[2]}</span>
            <span className="text-right">Actions</span>
          </div>
          <ul className="divide-y divide-border">
            {paged.map(({ row, view }) => (
              <li
                key={view.id}
                className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,2.5fr)_minmax(0,1.5fr)_8rem_9rem] md:items-center md:gap-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {view.image && (
                    <img
                      src={view.image}
                      alt=""
                      loading="lazy"
                      className="h-11 w-11 shrink-0 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{view.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {view.extra ?? `Updated ${view.updated}`}
                    </p>
                  </div>
                </div>
                <p className="truncate text-sm text-muted-foreground">{view.meta}</p>
                <div>
                  <StatusBadge status={view.status} />
                </div>
                <div className="flex gap-1 md:justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Edit"
                    className="rounded-lg"
                    onClick={() => openEdit(row)}
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
                    onClick={() => setDeleting(view)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {pageCount > 1 && (
            <div className="flex items-center justify-between border-t border-border px-5 py-3 text-sm">
              <span className="text-muted-foreground">
                Page {current} of {pageCount} · {visible.length} items
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  disabled={current === 1}
                  onClick={() => setPage(current - 1)}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                  disabled={current === pageCount}
                  onClick={() => setPage(current + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <Dialog open={editorOpen} onOpenChange={(o) => !o && close()}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {creating ? addLabel : `Edit ${String(editing?.[titleField] ?? "")}`}
            </DialogTitle>
            <DialogDescription>
              Content changes are saved as a draft until you publish them.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 py-2">
            {fields.map((f) => (
              <Field key={f.name} label={f.label}>
                {f.type === "textarea" ? (
                  <Textarea
                    rows={4}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                  />
                ) : (
                  <Input
                    type={f.type ?? "text"}
                    value={form[f.name] ?? ""}
                    onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
                  />
                )}
              </Field>
            ))}
            {imageField && form[imageField] && (
              <img
                src={form[imageField]}
                alt=""
                className="h-28 w-full rounded-lg object-cover"
                onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
              />
            )}
            {hasStatus && (
              <Field label="Status">
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </Field>
            )}
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" className="rounded-lg" onClick={close}>
              Cancel
            </Button>
            {hasStatus && (
              <Button
                variant="outline"
                className="rounded-lg"
                disabled={save.isPending}
                onClick={() => save.mutate("draft")}
              >
                Save Draft
              </Button>
            )}
            <Button
              className="rounded-lg"
              disabled={save.isPending}
              onClick={() => save.mutate(hasStatus ? "published" : formStatus)}
            >
              {save.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {hasStatus ? "Publish" : "Save"}
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
              disabled={remove.isPending}
              onClick={() => deleting && remove.mutate(deleting.id)}
            >
              {remove.isPending && <Loader2 className="h-4 w-4 animate-spin" />} Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function makeRow(
  row: DbRow,
  opts: { title: string; meta: string; image?: string; extra?: string },
): DisplayRow {
  return {
    id: String(row['id']),
    image: opts.image ? ((row[opts.image] as string | null) ?? undefined) : undefined,
    title: String(row[opts.title] ?? ""),
    meta: String(row[opts.meta] ?? ""),
    extra: opts.extra,
    status: statusLabel(row['status'] as string | null),
    updated: formatShortDate(row['updated_at'] as string),
  };
}

export function EmptyBlock({
  title,
  description,
  onCreate,
}: {
  title: string;
  description: string;
  onCreate?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/50 p-14 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      {onCreate && (
        <Button className="mt-6 rounded-lg" onClick={onCreate}>
          <Plus className="h-4 w-4" /> Create your first item
        </Button>
      )}
    </div>
  );
}
