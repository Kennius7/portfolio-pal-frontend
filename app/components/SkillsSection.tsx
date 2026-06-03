"use client";

import { useEffect, useRef, useState } from "react";
import { getInitials } from "../lib/utils";
import SafeImage from "@/app/components/SafeImage";
import fallbackPics from "../../public/fallback_user_pic.png";
import { CreateSkillProps } from "../types/types";
import { toSkillLabel } from "../constants/skillCategoriesTransform";

interface Skill extends CreateSkillProps {
  id: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const LEVEL_LABELS: Record<string, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Beginner",
};

function getLevelLabel(pct: number): string {
  if (pct >= 90) return LEVEL_LABELS.expert;
  if (pct >= 75) return LEVEL_LABELS.advanced;
  if (pct >= 55) return LEVEL_LABELS.intermediate;
  return LEVEL_LABELS.beginner;
}

function SkillBar({ level }: { level: number }) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transform = "scaleX(1)";
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bar-track">
      <div
        ref={fillRef}
        className="skill-bar-fill"
        style={{ width: `${level}%` }}
      />
    </div>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const isExpert = skill.level >= 80;

  return (
    <div className="skill-card" style={{ animationDelay: `${index * 50}ms` }}>
      {isExpert && (
        <span
          className="skill-expert-dot"
          title="Expert level"
          aria-label="Expert level"
        />
      )}

      <div className="skill-icon-wrap">
        {skill.imageUrl ? (
          <SafeImage
            src={skill.imageUrl}
            fallbackSrc={fallbackPics}
            width={32}
            height={32}
            alt={skill.name}
            className="skill-image"
          />
        ) : (
          <span className="skill-initials">{getInitials(skill.name)}</span>
        )}
      </div>

      <div className="skill-info">
        <p className="skill-name">{skill.name}</p>
        {skill.category && (
          <p className="skill-category">{toSkillLabel(skill.category)}</p>
        )}
      </div>

      <div className="skill-bar-wrap">
        <div className="skill-bar-meta">
          <span className="skill-level-label">
            {getLevelLabel(skill.level)}
          </span>
          <span className="skill-pct">{skill.level}%</span>
        </div>
        <SkillBar level={skill.level} />
      </div>
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  // Derive unique categories from skills data
  const categories = [
    "All",
    ...Array.from(new Set(skills.map((s) => s.category).filter(Boolean))),
  ];
  console.log("Skills:>>>>>>>>>>", skills);
  console.log("Categories:>>>>>>>>>>", categories);

  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? skills
      : skills.filter((s) => s.category === activeFilter);

  return (
    <section className="skills-section px-6 py-20">
      <div className="skills-header">
        <span className="skills-eyebrow">Expertise</span>
        <h2>Skills &amp; Competencies</h2>
        <p className="skills-sub">
          Capabilities I&apos;ve built and refined across projects and roles.
        </p>
      </div>

      {/* Category filter — only show if skills have categories */}
      {categories.length > 1 && (
        <div
          className="skills-filters"
          role="group"
          aria-label="Filter skills by category"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill${activeFilter === cat ? " active" : ""}`}
              onClick={() => setActiveFilter(cat)}
              aria-pressed={activeFilter === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="skills-grid">
        {filtered.length === 0 && (
          <p className="skills-empty">No skills to display.</p>
        )}
        {filtered.map((skill, i) => (
          <SkillCard key={skill.id} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}
