import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  return (
    <div className="grid min-h-screen place-items-center bg-muted/60 px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-soft sm:p-10">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary font-display text-lg text-primary-foreground">
          G
        </span>
        <h1 className="mt-6 font-sans text-2xl font-bold">Church CMS</h1>
        <p className="mt-2 text-sm text-muted-foreground">Manage your church website content.</p>
        <form className="mt-8 grid gap-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="admin@gracechurch.org" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" defaultValue="churchadmin" />
          </div>
          <Button asChild className="mt-2 h-11 rounded-lg">
            <Link to="/admin">Sign In</Link>
          </Button>
          <a href="#" className="text-center text-sm text-accent hover:underline">
            Forgot Password?
          </a>
        </form>
        <p className="mt-8 rounded-lg bg-muted px-4 py-3 text-xs text-muted-foreground">
          Demo credentials are pre-filled. This prototype does not authenticate.
        </p>
      </div>
    </div>
  );
}
