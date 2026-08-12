import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout, AdminPageHeader } from "@/components/admin/AdminLayout";
import { Panel } from "@/components/admin/ContentManager";
import { SingletonEditor } from "@/components/admin/SingletonEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useProfile, useSession } from "@/hooks/use-auth";

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

function ProfilePanel() {
  const { user } = useSession();
  const profile = useProfile(user);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile?.full_name) setFullName(profile.full_name);
  }, [profile]);

  async function saveProfile() {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName.trim() || null })
      .eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile updated");
  }

  async function changePassword() {
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) toast.error(error.message);
    else {
      setPassword("");
      toast.success("Password updated");
    }
  }

  return (
    <Panel title="Admin Profile">
      <div className="grid gap-2">
        <Label htmlFor="profile-name">Name</Label>
        <Input id="profile-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-email">Email</Label>
        <Input id="profile-email" value={user?.email ?? ""} readOnly disabled />
      </div>
      <div>
        <Button className="rounded-lg" onClick={saveProfile} disabled={saving}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save Profile
        </Button>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="profile-password">New Password</Label>
        <Input
          id="profile-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
        />
      </div>
      <div>
        <Button variant="outline" className="rounded-lg" onClick={changePassword}>
          Change Password
        </Button>
      </div>
    </Panel>
  );
}

function Page() {
  return (
    <AdminLayout>
      <AdminPageHeader
        title="Settings"
        description="Church details, website metadata, and your admin profile."
      />
      <SingletonEditor
        table="church_settings"
        sections={[
          {
            title: "Church Information",
            fields: [
              { name: "church_name", label: "Church Name" },
              { name: "logo_url", label: "Logo URL" },
              { name: "favicon_url", label: "Favicon URL" },
            ],
          },
          {
            title: "Website Settings",
            fields: [
              { name: "website_title", label: "Website Title" },
              { name: "website_description", label: "Website Description", type: "textarea" },
            ],
          },
          {
            title: "Social Media",
            fields: [
              { name: "facebook_url", label: "Facebook" },
              { name: "instagram_url", label: "Instagram" },
              { name: "youtube_url", label: "YouTube" },
            ],
          },
        ]}
      />
      <ProfilePanel />
    </AdminLayout>
  );
}
