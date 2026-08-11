import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Church CMS" },
      { name: "robots", content: "noindex" },
      { name: "description", content: "Sign in to manage the First Chirstian Church - Bagumbayan website." },
      { property: "og:title", content: "Church CMS Sign In" },
      { property: "og:description", content: "Manage your church website content." },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { user, loading } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"signin" | "forgot">("signin");

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin", replace: true });
  }, [loading, user, navigate]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Email and password are required.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Welcome back");
    navigate({ to: "/admin", replace: true });
  };

  const sendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Enter your email address first.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setBusy(false);
    if (error) toast.error(error.message);
    else toast.success("Password reset link sent. Check your inbox.");
  };

  return (
    <div className="grid min-h-screen place-items-center bg-muted/60 px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-soft sm:p-10">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary font-display text-lg text-primary-foreground">
          G
        </span>
        <h1 className="mt-6 font-sans text-2xl font-bold">Church CMS</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Sign in to manage your church website content."
            : "We'll email you a link to reset your password."}
        </p>
        <form className="mt-8 grid gap-5" onSubmit={mode === "signin" ? signIn : sendReset}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {mode === "signin" && (
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}
          <Button type="submit" className="mt-2 h-11 rounded-lg" disabled={busy}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign In" : "Send Reset Link"}
          </Button>
          <button
            type="button"
            className="text-center text-sm text-accent hover:underline"
            onClick={() => setMode(mode === "signin" ? "forgot" : "signin")}
          >
            {mode === "signin" ? "Forgot Password?" : "Back to sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
