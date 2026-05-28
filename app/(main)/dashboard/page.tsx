"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { useAuth, type Portfolio } from "@/app/lib/auth";
import { Eye, Save, Plus, Trash2, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mockPortfolioData } from "@/app/constants/mockData";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<Portfolio | null>(
    mockPortfolioData[0] as Portfolio,
  );
  const [saved, setSaved] = useState(false);

  if (!user || !form)
    return (
      <div className="min-h-screen">
        <SiteHeader />
      </div>
    );

  const set = <K extends keyof Portfolio>(k: K, v: Portfolio[K]) =>
    setForm({ ...form, [k]: v });

  const save = () => {
    // updatePortfolio(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/u/${user.username}`
      : "";

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl">Your Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Logged in as <strong>@{user.fullName}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/u/${user.fullName}`}>
              <Button variant="secondary">
                <Eye className="mr-2 h-4 w-4" /> Preview
              </Button>
            </Link>
            <Button onClick={save} className="bg-gradient-brand shadow-glow">
              <Save className="mr-2 h-4 w-4" />{" "}
              {saved ? "Saved!" : "Save changes"}
            </Button>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-card p-4 text-sm">
          <Share2 className="h-4 w-4 text-brand-cyan" />
          <span className="text-muted-foreground">Share with clients:</span>
          <code className="rounded bg-background px-2 py-1 text-xs">
            {shareUrl}
          </code>
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            Copy
          </Button>
        </div>

        <div className="mt-8 grid gap-6 rounded-3xl bg-card p-8">
          <h2 className="text-xl">Basics</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Display name</Label>
              <Input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div>
              <Label>Tagline</Label>
              <Input
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
              />
            </div>
            <div>
              <Label>Greeting</Label>
              <Input
                value={form.greeting}
                onChange={(e) => set("greeting", e.target.value)}
              />
            </div>
            <div>
              <Label>Avatar URL</Label>
              <Input
                value={form.avatarUrl ?? ""}
                onChange={(e) => set("avatarUrl", e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
            <div>
              <Label>WhatsApp</Label>
              <Input
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Short bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
            />
          </div>
          <div>
            <Label>Long bio</Label>
            <Textarea
              value={form.bio}
              onChange={(e) => set("bio", e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-card p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Skills</h2>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                set("skills", [
                  ...form.skills,
                  { name: "New skill", level: 70 },
                ])
              }
            >
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
          <div className="mt-4 space-y-3">
            {form.skills.map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr_120px_auto] gap-3">
                <Input
                  value={s.name}
                  onChange={(e) => {
                    const next = [...form.skills];
                    next[i] = { ...s, name: e.target.value };
                    set("skills", next);
                  }}
                />
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={s.level}
                  onChange={(e) => {
                    const next = [...form.skills];
                    next[i] = { ...s, level: Number(e.target.value) };
                    set("skills", next);
                  }}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() =>
                    set(
                      "skills",
                      form.skills.filter((_, idx) => idx !== i),
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-card p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Projects</h2>
            <Button
              size="sm"
              variant="secondary"
              onClick={() =>
                set("projects", [
                  ...form.projects,
                  {
                    title: "New project",
                    description: "",
                    link: "",
                    id: "",
                    portfolioId: "",
                  },
                ])
              }
            >
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
          <div className="mt-4 space-y-4">
            {form.projects.map((p, i) => (
              <div key={i} className="space-y-2 rounded-2xl bg-background p-4">
                <div className="grid gap-2 md:grid-cols-2">
                  <Input
                    value={p.title}
                    placeholder="Title"
                    onChange={(e) => {
                      const next = [...form.projects];
                      next[i] = { ...p, title: e.target.value };
                      set("projects", next);
                    }}
                  />
                  <Input
                    value={p.link}
                    placeholder="https://link"
                    onChange={(e) => {
                      const next = [...form.projects];
                      next[i] = { ...p, link: e.target.value };
                      set("projects", next);
                    }}
                  />
                </div>
                <Textarea
                  value={p.description}
                  placeholder="Description"
                  onChange={(e) => {
                    const next = [...form.projects];
                    next[i] = { ...p, description: e.target.value };
                    set("projects", next);
                  }}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() =>
                    set(
                      "projects",
                      form.projects.filter((_, idx) => idx !== i),
                    )
                  }
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Remove
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
