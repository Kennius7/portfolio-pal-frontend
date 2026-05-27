import type { PortfolioData } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { MessageCircle, ExternalLink, Download } from "lucide-react";

export function PortfolioView({ data, username }: { data: PortfolioData; username: string }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-md bg-gradient-brand px-5 py-2 text-sm font-semibold shadow-glow">
              {data.greeting}
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl">{data.tagline}</h1>
            <p className="mt-6 max-w-lg text-muted-foreground">{data.bioShort}</p>
            <p className="mt-4 max-w-lg text-muted-foreground">{data.bioLong}</p>
            <Button className="mt-8 bg-gradient-brand shadow-glow" size="lg">
              <MessageCircle className="mr-2 h-4 w-4" /> Chat me on WhatsApp
            </Button>
          </div>
          <div className="relative mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-brand blur-3xl opacity-40" />
            <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-accent shadow-glow md:h-96 md:w-96">
              {data.avatarUrl ? (
                <img src={data.avatarUrl} alt={data.name} className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center bg-gradient-brand text-7xl font-black">
                  {data.name.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-card p-10 shadow-glow md:p-16">
          <h2 className="text-4xl">About me</h2>
          <p className="mt-6 text-muted-foreground">{data.bioShort}</p>
          <p className="mt-4 text-muted-foreground">{data.bioLong}</p>
          <Button className="mt-8" variant="secondary">
            <Download className="mr-2 h-4 w-4" /> Download my Resume
          </Button>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl">Skills</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Some of the skills and competencies I've acquired over the years.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {data.skills.map((s) => (
              <div key={s.name} className="rounded-2xl bg-card p-5 text-center transition hover:shadow-glow">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand text-xl font-bold">
                  {s.name.slice(0, 2).toUpperCase()}
                </div>
                <p className="mt-3 text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.level}%</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl">Projects</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            A selection of notable work I've shipped.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {data.projects.map((p) => (
              <div key={p.title} className="group rounded-2xl bg-card p-6 transition hover:shadow-glow">
                <div className="aspect-video rounded-lg bg-gradient-brand opacity-80" />
                <h3 className="mt-5 text-xl">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-cyan"
                >
                  View project <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gradient-contact px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-5xl">Get In Touch</h2>
            <p className="mt-4 max-w-md text-white/80">
              Want to share this portfolio? Send <strong>/u/{username}</strong> to anyone — they can view but not edit.
            </p>
          </div>
          <form className="space-y-4">
            <input className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/70 outline-none" placeholder="First Name" />
            <input className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/70 outline-none" placeholder="Email Address" />
            <textarea rows={4} className="w-full rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/70 outline-none" placeholder="Message" />
            <Button type="button" variant="secondary" className="rounded-full">Send Message</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
