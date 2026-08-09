import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/public/SectionHeading";
import { church, images, serviceTimes } from "@/data/church";

export const Route = createFileRoute("/_public/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Plan Your Visit — Grace Community Church" },
      {
        name: "description",
        content:
          "Visit us at 123 Main Street, Springfield, CA. Call (555) 123-4567 or send a message — we'd love to hear from you.",
      },
      { property: "og:title", content: "Contact Grace Community Church" },
      { property: "og:description", content: "Plan your visit, ask a question, or request prayer." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent", {
      description: "Thanks for reaching out — someone from our team will reply within two days.",
    });
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd Love to Hear From You"
        description="Questions about a first visit, a ministry, or a prayer request? Reach out any time."
        image={images.welcomeCommunity}
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[22rem_minmax(0,1fr)]">
          <div className="space-y-8">
            <div className="surface-card p-8">
              <h2 className="text-2xl font-semibold">{church.name}</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">
                    {church.addressLines[0]}
                    <br />
                    {church.addressLines[1]}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a href={`tel:${church.phone}`} className="text-muted-foreground hover:text-accent">
                    {church.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <a
                    href={`mailto:${church.email}`}
                    className="break-all text-muted-foreground hover:text-accent"
                  >
                    {church.email}
                  </a>
                </li>
              </ul>
            </div>

            <div className="surface-card p-8">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Clock className="h-5 w-5 text-accent" /> Office Hours
              </h2>
              <p className="mt-4 text-sm text-muted-foreground">Monday–Friday</p>
              <p className="text-sm text-muted-foreground">9:00 AM–5:00 PM</p>
              <h3 className="mt-8 text-lg font-semibold">Service Times</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {serviceTimes.map((s) => (
                  <li key={s.id}>
                    {s.name} · {s.time}
                  </li>
                ))}
              </ul>
            </div>

            <div className="surface-card p-8">
              <h2 className="text-xl font-semibold">Follow Along</h2>
              <div className="mt-5 flex gap-3">
                {[
                  { icon: Facebook, href: church.social.facebook, label: "Facebook" },
                  { icon: Instagram, href: church.social.instagram, label: "Instagram" },
                  { icon: Youtube, href: church.social.youtube, label: "YouTube" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="surface-card p-8 sm:p-10">
              <h2 className="text-3xl font-semibold">Send Us a Message</h2>
              <p className="mt-3 text-muted-foreground">
                Fill out the form and a member of our team will get back to you.
              </p>
              <form className="mt-8 grid gap-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jordan Miller" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jordan@example.com" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(555) 987-6543" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us a little about yourself or ask us anything."
                    required
                  />
                </div>
                <Button type="submit" variant="accent" size="lg" className="justify-self-start">
                  Send Message
                </Button>
                {sent && (
                  <p className="text-sm text-sage">
                    Thank you — your message has been received. We typically reply within two days.
                  </p>
                )}
              </form>
            </div>

            <div className="surface-card mt-10 overflow-hidden">
              <div className="grid min-h-72 place-items-center bg-sand/60 p-10 text-center">
                <div>
                  <MapPin className="mx-auto h-8 w-8 text-accent" />
                  <p className="mt-4 font-display text-2xl">Find Us on Main Street</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {church.address} · Free parking behind the sanctuary
                  </p>
                  <p className="mt-4 text-xs tracking-wider text-muted-foreground uppercase">
                    Interactive map placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
