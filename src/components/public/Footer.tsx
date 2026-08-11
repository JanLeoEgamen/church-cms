import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { serviceTimesQuery, settingsQuery } from "@/lib/queries";

export function Footer() {
  const { data: church } = useQuery(settingsQuery());
  const { data: serviceTimesData } = useQuery(serviceTimesQuery());
  const serviceTimes = serviceTimesData ?? [];
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-display text-lg text-accent-foreground">
              G
            </span>
            <span className="font-display text-xl">{church?.name ?? ""}</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            A Christ-centered community in Springfield committed to growing in faith, serving others,
            and sharing God's love with our neighbors.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Facebook, href: church?.social.facebook ?? "#", label: "Facebook" },
              { icon: Instagram, href: church?.social.instagram ?? "#", label: "Instagram" },
              { icon: Youtube, href: church?.social.youtube ?? "#", label: "YouTube" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-accent hover:border-accent"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow text-primary-foreground/60">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              { to: "/about", label: "About Us" },
              { to: "/ministries", label: "Ministries" },
              { to: "/events", label: "Events" },
              { to: "/sermons", label: "Sermons" },
              { to: "/announcements", label: "Announcements" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-primary-foreground/75 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-primary-foreground/60">Service Times</h4>
          <ul className="mt-5 space-y-4 text-sm">
            {serviceTimes.map((s) => (
              <li key={s.id}>
                <p className="font-semibold">{s.name}</p>
                <p className="text-primary-foreground/70">{s.time}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-primary-foreground/60">Visit Us</h4>
          <ul className="mt-5 space-y-4 text-sm text-primary-foreground/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>
                {church?.addressLines[0] ?? ""}
                <br />
                {church?.addressLines[1] ?? ""}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${church?.phone ?? ""}`} className="hover:text-accent">
                {church?.phone ?? ""}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href={`mailto:${church?.email ?? ""}`} className="break-all hover:text-accent">
                {church?.email ?? ""}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-7xl px-5 py-6 text-center text-xs text-primary-foreground/60 lg:px-8">
          © 2026 {church?.name ?? ""}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
