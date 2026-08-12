import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Panel, SaveBar } from "./ContentManager";

export type SingletonField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "email";
  hint?: string;
};

export type SingletonSection = {
  title: string;
  fields: SingletonField[];
};

type SingletonTable = "homepage_content" | "about_content" | "church_settings";

type Row = Record<string, unknown>;

export function SingletonEditor({
  table,
  sections,
}: {
  table: SingletonTable;
  sections: SingletonSection[];
}) {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  const { data, isLoading } = useQuery({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").limit(1).maybeSingle();
      if (error) throw new Error(error.message);
      return (data ?? null) as Row | null;
    },
  });

  useEffect(() => {
    if (!data) return;
    const next: Record<string, string> = {};
    for (const section of sections) {
      for (const field of section.fields) {
        const v = data[field.name];
        next[field.name] = v == null ? "" : String(v);
      }
    }
    setValues(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload: Record<string, string | null> = {};
      for (const section of sections) {
        for (const field of section.fields) {
          const raw = values[field.name] ?? "";
          payload[field.name] = raw.trim() === "" ? null : raw;
        }
      }
      const existingId = data?.["id"] as string | undefined;
      const client = supabase.from(table) as unknown as {
        update: (p: Record<string, string | null>) => {
          eq: (col: string, val: string) => Promise<{ error: { message: string } | null }>;
        };
        insert: (p: Record<string, string | null>) => Promise<{ error: { message: string } | null }>;
      };
      const { error } = existingId
        ? await client.update(payload).eq("id", existingId)
        : await client.insert(payload);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("Changes saved successfully");
      queryClient.invalidateQueries({ queryKey: ["admin", table] });
      queryClient.invalidateQueries({ queryKey: ["public"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center py-20 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {sections.map((section) => (
        <Panel key={section.title} title={section.title}>
          {section.fields.map((field) => {
            const id = `${table}-${field.name}`;
            const value = values[field.name] ?? "";
            const onChange = (v: string) =>
              setValues((prev) => ({ ...prev, [field.name]: v }));
            return (
              <div key={field.name} className="grid gap-2">
                <Label htmlFor={id}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={id}
                    rows={3}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                  />
                ) : (
                  <Input
                    id={id}
                    type={field.type === "email" ? "email" : "text"}
                    value={value}
                    placeholder={field.hint}
                    onChange={(e) => onChange(e.target.value)}
                  />
                )}
              </div>
            );
          })}
        </Panel>
      ))}
      <SaveBar onSave={() => save.mutate()} saving={save.isPending} />
    </>
  );
}
