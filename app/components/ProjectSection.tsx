"use client";

import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { CreateProjectProps } from "../types/types";
import SafeImage from "@/app/components/SafeImage";
import fallbackPics from "../../public/fallback_user_pic.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { ellipsis, formatDateWithMoment, getDateDiff } from "../lib/utils";

interface Project extends CreateProjectProps {
  id: string;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isOngoing = project.projectEndAt === "ongoing";
  const endDate = isOngoing ? new Date() : project.projectEndAt;

  return (
    <article
      className="project-card group relative flex flex-col bg-card rounded-2xl overflow-hidden
                 border border-white/5 hover:border-white/15 transition-all duration-500
                 hover:shadow-[0_0_40px_rgba(0,0,0,0.4)] hover:-translate-y-1"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image area */}
      <div className="relative h-52 overflow-hidden bg-gradient-brand/10">
        {project.imageUrl !== "" ? (
          <SafeImage
            src={project.imageUrl}
            fallbackSrc={fallbackPics}
            width={600}
            height={400}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-brand opacity-30" />
        )}

        {/* Hover overlay — full description */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-end p-5
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <p className="text-white/90 text-sm leading-relaxed line-clamp-6">
            {project.description}
          </p>
        </div>

        {/* Ongoing badge */}
        {isOngoing && (
          <span
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full
                       bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs
                       font-semibold text-emerald-400 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Ongoing
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-lg font-semibold leading-snug group-hover:text-brand-cyan transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {ellipsis(project.description, 100)}
        </p>

        {/* Date row */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span className="text-xs text-muted-foreground">
            {formatDateWithMoment(project.projectCreatedAt)}
            {" → "}
            {isOngoing ? (
              <span className="text-emerald-400">Present</span>
            ) : (
              formatDateWithMoment(project.projectEndAt)
            )}
          </span>
        </div>

        {/* Duration + CTA */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            {getDateDiff(project.projectCreatedAt, endDate as Date)}
          </span>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-white/5 hover:bg-brand-cyan/10
                       border border-white/10 hover:border-brand-cyan/40 px-3 py-1.5
                       text-xs font-semibold text-white/80 hover:text-brand-cyan
                       transition-all duration-200"
          >
            View project
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-cyan/70 mb-3">
            Selected Work
          </span>
          <h2 className="text-4xl md:text-5xl">Projects</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            A selection of notable work I&apos;ve shipped.
          </p>
        </div>

        {/* Empty state */}
        {projects.length === 0 && (
          <p className="text-center text-muted-foreground py-16">
            No projects added yet.
          </p>
        )}

        {/* Responsive grid for ≤3 projects */}
        {projects.length > 0 && projects.length <= 3 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}

        {/* Splide carousel for 4+ projects */}
        {projects.length > 3 && (
          <Splide
            options={{
              type: "loop",
              perPage: 3,
              perMove: 1,
              gap: "1.5rem",
              arrows: true,
              pagination: true,
              breakpoints: {
                1024: { perPage: 2 },
                640: { perPage: 1 },
              },
            }}
          >
            {projects.map((p, i) => (
              <SplideSlide key={p.id}>
                <ProjectCard project={p} index={i} />
              </SplideSlide>
            ))}
          </Splide>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
