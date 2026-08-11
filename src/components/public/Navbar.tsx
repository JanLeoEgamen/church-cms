import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/queries";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/ministries", label: "Ministries" },
  { to: "/events", label: "Events" },
  { to: "/sermons", label: "Sermons" },
  { to: "/announcements", label: "Announcements" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const { data: settings } = useQuery(settingsQuery());
  const church = settings;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg">
            G
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight font-semibold sm:text-xl">
              {church?.name ?? ""}
            </span>
            <span className="hidden text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase sm:block">
              Springfield, California
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <Button asChild variant="accent">
            <Link to="/contact">Plan Your Visit</Link>
          </Button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-xl px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "bg-muted text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="accent" size="lg" className="mt-3">
              <Link to="/contact" onClick={() => setOpen(false)}>
                Plan Your Visit
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
