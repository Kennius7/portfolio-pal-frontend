"use client";

import { Button } from "@/app/components/ui/button";
import { Download } from "lucide-react";
import { CreateProjectProps, Portfolio } from "../types/types";
import SafeImage from "@/app/components/SafeImage";
import fallbackPics from "../../public/fallback_user_pic.png";
import SafeRichText from "./SafeRichText";
import WhatsappIcon from "../../public/whatsapp_icon1.png";
import Image from "next/image";
import { SkillsSection } from "./SkillsSection";
import ProjectsSection from "./ProjectSection";
import { handleResumeDownload } from "../lib/utils";
import { useDashboard } from "../lib/dashboard-context";
import { useEffect } from "react";

interface Project extends CreateProjectProps {
  id: string;
}

interface PortfolioViewProps {
  portfolio: Portfolio;
  // `skills` is forwarded directly to <SkillsSection> — see SkillsSection.tsx
  skills: React.ComponentProps<typeof SkillsSection>["skills"];
  projects: Project[];
}

export function PortfolioView({
  portfolio,
  skills,
  projects,
}: PortfolioViewProps) {
  console.log("Portfolio Data:>>>>>>>", portfolio);
  const { setIsPreviewing } = useDashboard();

  useEffect(() => {
    setIsPreviewing(true);

    return () => {
      setIsPreviewing(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 md:py-20 py-12">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-md bg-gradient-brand px-5 py-2 text-sm font-semibold shadow-glow">
              {portfolio.greeting}
            </span>
            <h1 className="mt-6 mb-8 text-4xl md:text-6xl">
              {portfolio.tagline}
            </h1>
            <SafeRichText html={portfolio.bioShort} />
            <button
              onClick={() =>
                window.open(`https://wa.me/${portfolio.whatsapp}`, "_blank")
              }
              className="mt-8 bg-gradient-brand shadow-glow flex items-center 
              justify-start gap-3 px-5 py-2.5 rounded-md cursor-pointer"
            >
              <Image
                src={WhatsappIcon}
                alt="WhatsApp Icon"
                height={32}
                width={32}
              />
              Chat me on WhatsApp
            </button>
          </div>
          <div className="relative mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-brand blur-3xl opacity-40" />
            <div className="relative h-72 w-72 overflow-hidden rounded-full border-4 border-accent shadow-glow md:h-96 md:w-96">
              <SafeImage
                src={portfolio.avatarUrl || fallbackPics}
                alt={portfolio.title}
                className="h-full w-full object-cover"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-card p-10 shadow-glow md:p-16">
          <h2 className="text-4xl mb-3">About me</h2>
          <SafeRichText html={portfolio.bioLong} />
          <Button
            onClick={() => handleResumeDownload(portfolio)}
            className="mt-8"
            variant="secondary"
          >
            <Download className="mr-2 h-4 w-4" /> Download my Resume
          </Button>
        </div>
      </section>

      {/* ── Skills (refactored) ───────────────────────────────────────── */}
      <SkillsSection skills={skills} />

      {/* ── Projects ── */}
      <ProjectsSection projects={projects} />

      {/* ── Contact ───────────────────────────────────────────────────── */}
      <section className="bg-gradient-contact px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-5xl">Get In Touch</h2>
            <p className="mt-4 max-w-md text-white/80">
              Want to share this portfolio? Send{" "}
              <strong>/p/{portfolio.slug}</strong> to anyone — they can view but
              not edit.
            </p>
          </div>
          <form className="space-y-4">
            <input
              className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 
              text-sm text-white placeholder:text-white/70 outline-none"
              placeholder="Full Name"
            />
            <input
              className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 
              text-sm text-white placeholder:text-white/70 outline-none"
              placeholder="Email Address"
            />
            <textarea
              rows={4}
              className="w-full rounded-2xl border border-white/30 bg-white/10 px-5 py-3 
              text-sm text-white placeholder:text-white/70 outline-none"
              placeholder="Message"
            />
            <Button type="button" variant="secondary" className="rounded-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
