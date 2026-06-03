"use client";

import { Button } from "@/app/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
// import Image from "next/image";
import {
  CreateProjectProps,
  CreateSkillProps,
  Portfolio,
} from "../types/types";
import SafeImage from "@/app/components/SafeImage";
import fallbackPics from "../../public/fallback_user_pic.png";
import SafeRichText from "./SafeRichText";
import { toast } from "sonner";
import WhatsappIcon from "../../public/whatsapp_icon1.png";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { projectSplideOptions, skillSplideOptions } from "../constants/data";
import {
  ellipsis,
  formatDateWithMoment,
  getDateDiff,
  getInitials,
} from "../lib/utils";
import SignalStrength from "./SignalStrength";

interface Skill extends CreateSkillProps {
  id: string;
}

interface Project extends CreateProjectProps {
  id: string;
}

interface PortfolioViewProps {
  portfolio: Portfolio;
  skills: Skill[];
  projects: Project[];
  username: string;
}

export function PortfolioView({
  portfolio,
  skills,
  projects,
  username,
}: PortfolioViewProps) {
  // console.log("Projects Data:>>>>>>", projects[0].description.length);

  const handleResumeDownload = async () => {
    // const downloadUrl = portfolio.resumeUrl;
    const downloadUrl = `${portfolio.resumeUrl}?fl_attachment`;

    if (!downloadUrl) {
      toast.error("No resume available");
      return;
    }

    try {
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch file");
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${portfolio.title || "resume"}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
      toast.error("Download failed. Opening file instead.");

      // fallback
      window.open(downloadUrl, "_blank");
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-md bg-gradient-brand px-5 py-2 text-sm font-semibold shadow-glow">
              {portfolio.greeting}
            </span>
            <h1 className="mt-6 mb-8 text-5xl md:text-6xl">
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
              />{" "}
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

      {/* About */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl rounded-3xl bg-card p-10 shadow-glow md:p-16">
          <h2 className="text-4xl mb-3">About me</h2>
          <SafeRichText html={portfolio.bioLong} />
          <Button
            onClick={() => handleResumeDownload()}
            className="mt-8"
            variant="secondary"
          >
            <Download className="mr-2 h-4 w-4" /> Download my Resume
          </Button>
        </div>
      </section>

      {/* Skills */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl w-full flex flex-col items-center">
          <h2 className="text-4xl">Skills</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground text-center">
            Some of the skills and competencies I&apos;ve acquired over the
            years.
          </p>
          <div
            // className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6"
            className="mt-10 flex justify-center"
          >
            {skills.length === 0 && (
              <p className="text-left my-4">No skills added yet.</p>
            )}
            {skills.length > 0 && (
              <div className="w-[98%]">
                <Splide options={skillSplideOptions}>
                  {skills.map((s) => (
                    <SplideSlide key={s.name}>
                      <div className="w-[100px] bg-primary rounded-2xl p-5 transition hover:shadow-glow relative">
                        <div
                          className={`mx-auto grid h-30 w-30 place-items-center rounded-full 
                          text-xl font-bold 
                          ${s.imageUrl !== "" ? "bg-none" : "bg-gradient-brand"}`}
                        >
                          {s.imageUrl !== "" ? (
                            <SafeImage
                              src={s.imageUrl}
                              fallbackSrc={fallbackPics}
                              width={100}
                              height={100}
                              alt="skill image"
                            />
                          ) : (
                            <div className="text-3xl">
                              {getInitials(s.name)}
                            </div>
                          )}
                        </div>
                        <p className="mt-3 text-sm font-semibold">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.level}%
                        </p>
                        <div className="absolute top-[78%] right-2">
                          <SignalStrength percentage={s.level} />
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-4xl">Projects</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
            A selection of notable work I&apos;ve shipped.
          </p>
          <div
            // className="mt-12 grid gap-6 md:grid-cols-3"
            className="mt-10 flex justify-center"
          >
            {projects.length === 0 && (
              <p className="text-left my-4">No projects added yet.</p>
            )}
            {projects.length > 0 && (
              <div className="w-[98%]">
                <Splide options={projectSplideOptions}>
                  {projects.map((p) => (
                    <SplideSlide key={p.title}>
                      <div className="w-full h-full relative">
                        <div className="w-full h-full rounded-2xl proj-imgbx">
                          <div className="proj-txtx px-8 gap-4">
                            <h4 className="text-white">{p.title}</h4>
                            <span className="text-white/70">
                              {ellipsis(p.description, 390)}
                            </span>
                          </div>

                          <div className="p-4 bg-card group rounded-2xl hover:shadow-glow">
                            {p.imageUrl !== "" ? (
                              <SafeImage
                                src={p.imageUrl}
                                fallbackSrc={fallbackPics}
                                width={255}
                                height={100}
                                alt="project image"
                                className="w-full h-[208px] rounded-lg object-cover"
                              />
                            ) : (
                              <div className="aspect-video rounded-lg bg-gradient-brand" />
                            )}
                            <h3 className="mt-5 text-xl">{p.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {ellipsis(p.description, 110)}
                            </p>
                            <div
                              className={`flex flex-col items-start justify-center gap-2
                              ${p.description.length < 50 ? "mt-6" : "mt-1"}`}
                            >
                              <div className="flex items-center gap-1 text-xs">
                                From:{" "}
                                <span className="text-xs font-semibold">
                                  {formatDateWithMoment(p.projectCreatedAt)}
                                </span>
                                - To:{" "}
                                <span className="text-xs font-semibold">
                                  {formatDateWithMoment(
                                    p.projectEndAt === "ongoing"
                                      ? new Date()
                                      : p.projectEndAt,
                                  )}
                                </span>
                              </div>

                              <div className="flex items-center justify-between w-full">
                                <div className="text-[12px] text-muted-foreground">
                                  (
                                  {getDateDiff(
                                    p.projectCreatedAt,
                                    p.projectEndAt === "ongoing"
                                      ? new Date()
                                      : p.projectEndAt,
                                  )}
                                  )
                                </div>

                                <a
                                  href={p.liveUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-cyan"
                                >
                                  View project{" "}
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gradient-contact px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-5xl">Get In Touch</h2>
            <p className="mt-4 max-w-md text-white/80">
              Want to share this portfolio? Send <strong>/u/{username}</strong>{" "}
              to anyone — they can view but not edit.
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
