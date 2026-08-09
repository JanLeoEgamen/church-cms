import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Home,
  Info,
  Phone,
  HeartHandshake,
  CalendarDays,
  Mic,
  Megaphone,
  Quote,
  Users,
  Image,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const groups = [
  {
    label: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true }],
  },
  {
    label: "Website Content",
    items: [
      { to: "/admin/content/home", label: "Home Page", icon: Home },
      { to: "/admin/content/about", label: "About Page", icon: Info },
      { to: "/admin/content/contact", label: "Contact Page", icon: Phone },
    ],
  },
  {
    label: "Content",
    items: [
      { to: "/admin/ministries", label: "Ministries", icon: HeartHandshake },
      { to: "/admin/events", label: "Events", icon: CalendarDays },
      { to: "/admin/sermons", label: "Sermons", icon: Mic },
      { to: "/admin/announcements", label: "Announcements", icon: Megaphone },
      { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { to: "/admin/leadership", label: "Leadership", icon: Users },
    ],
  },
  {
    label: "Assets",
    items: [
      { to: "/admin/media", label: "Media Library", icon: Image },
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
] as const;

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Published"
      ? "bg-sage/15 text-sage"
      : status === "Draft"
        ? "bg-gold/20 text-[oklch(0.45_0.09_82)]"
        : "bg-muted text-muted-foreground";
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", tone)}>{status}</span>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: typeof Home;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="h-4 w-4 text-accent" />
      </div>
      <p className="mt-3 font-display text-4xl">{value}</p>
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="grid gap-4 border-b border-border pb-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
      <div className="min-w-0">
        <h1 className="font-sans text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-14 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const nav = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-6 py-6">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-sidebar-primary font-display text-base text-sidebar-primary-foreground">
          G
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold">Church CMS</p>
          <p className="truncate text-xs text-sidebar-foreground/60">Grace Community</p>
        </div>
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="px-3 pb-2 text-[0.65rem] font-bold tracking-[0.18em] text-sidebar-foreground/45 uppercase">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active =
                  "exact" in item && item.exact ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-sidebar-accent text-xs font-bold">
            AD
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">Admin</p>
            <p className="truncate text-xs text-sidebar-foreground/60">admin@gracechurch.org</p>
          </div>
          <Link
            to="/admin/login"
            aria-label="Log out"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-muted/50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 bg-sidebar text-sidebar-foreground lg:block">
        {nav}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-sidebar text-sidebar-foreground">{nav}</div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur lg:px-8">
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <div className="relative min-w-0 max-w-md">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search content…" className="h-9 rounded-lg pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden rounded-lg sm:inline-flex">
              <Link to="/">
                <ExternalLink className="h-4 w-4" /> View site
              </Link>
            </Button>
            <button
              type="button"
              aria-label="Notifications"
              className="grid h-9 w-9 place-items-center rounded-lg border border-border"
            >
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
