"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Share2, Lock, Sparkles } from "lucide-react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/lib/auth";
import { useGetAllUser } from "./hooks/helpers";
import { User } from "./types/types";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Beautiful by default",
    body: "A polished dark, gradient-rich theme tuned for developers.",
  },
  {
    icon: Share2,
    title: "Shareable link",
    body: "Send /u/your-name to clients — public view, no login required.",
  },
  {
    icon: Lock,
    title: "Only you can edit",
    body: "Your portfolio is locked to your account. Admins can moderate.",
  },
];

// Safely get two initials from a full name, handling single-word names
function getInitials(fullName: string): string {
  const parts = fullName.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

export default function Home() {
  const { user, isHydrated } = useAuth();
  const [featured, setFeatured] = useState<User[]>([]);
  const { data: allUsers = [], isPending } = useGetAllUser();

  useEffect(() => {
    if (allUsers?.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFeatured(allUsers.slice(0, 6));
    }
  }, [allUsers]);

  const firstName = user?.fullName?.split(" ")[0] ?? "";
  const isLongName = firstName.length > 15;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
          {/* Background glow */}
          <div
            className="absolute inset-0 -z-10 bg-gradient-brand opacity-20 blur-3xl"
            aria-hidden="true"
          />

          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Build. Share. Get hired.
            </span>

            {/* Headline — scales from mobile to desktop */}
            <h1 className="mt-5 text-4xl leading-tight sm:mt-6 sm:text-5xl md:text-7xl">
              Your{" "}
              <span className={user ? "" : "text-gradient"}>portfolio</span>
              {!user && <br />}
              {/* {user && (
                <span
                  className={`text-gradient ${
                    isLongName
                      ? "text-2xl sm:text-3xl md:text-5xl"
                      : "text-3xl sm:text-4xl md:text-7xl"
                  }`}
                >
                  &nbsp;{firstName},
                  <br />
                </span>
              )} */}
              {isHydrated && user && (
                <span
                  className={`text-gradient ${
                    isLongName
                      ? "text-2xl sm:text-3xl md:text-5xl"
                      : "text-3xl sm:text-4xl md:text-7xl"
                  }`}
                >
                  &nbsp;{firstName},
                  <br />
                </span>
              )}{" "}
              one link away.
            </h1>

            <p className="mx-auto mt-5 max-w-xl px-2 text-sm text-muted-foreground sm:mt-6 sm:px-0 sm:text-base">
              Sign up, design your portfolio, and share a unique link with
              clients. They can view it, but only you can edit.
            </p>

            {/* CTAs — stack on mobile, row on sm+ */}
            <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center">
              {user ? (
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-gradient-brand shadow-glow w-full sm:w-auto"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="bg-gradient-brand shadow-glow w-full sm:w-auto"
                    >
                      Create your portfolio
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link href="/u/kenny" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-auto"
                    >
                      View demo
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── Features ─────────────────────────────────────────────── */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-4 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-card p-5 transition hover:shadow-glow sm:p-6"
              >
                <f.icon
                  className="h-7 w-7 text-brand-cyan sm:h-8 sm:w-8"
                  aria-hidden="true"
                />
                <h3 className="mt-3 text-lg sm:mt-4 sm:text-xl">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Recent Portfolios ────────────────────────────────────── */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl sm:text-3xl">Recent portfolios</h2>

            <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {isPending ? (
                /* Skeleton placeholders match the real card height */
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl bg-card p-5 sm:p-6"
                    aria-hidden="true"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 shrink-0 rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3.5 w-3/4 rounded bg-muted" />
                        <div className="h-3 w-1/2 rounded bg-muted" />
                      </div>
                    </div>
                    <div className="mt-4 h-3 w-full rounded bg-muted" />
                    <div className="mt-2 h-3 w-2/3 rounded bg-muted" />
                  </div>
                ))
              ) : featured.length === 0 ? (
                <p className="col-span-full text-sm text-muted-foreground">
                  No portfolios found
                </p>
              ) : (
                featured.map((u) => (
                  <Link
                    key={u.userId}
                    href={`/p/${u.portfolio.slug}`}
                    className="group rounded-2xl bg-card p-5 transition hover:shadow-glow sm:p-6"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      {/* Avatar */}
                      <div
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-brand text-base font-bold sm:h-14 sm:w-14 sm:text-lg"
                        aria-hidden="true"
                      >
                        {getInitials(u.fullName)}
                      </div>

                      {/* Name + handle */}
                      <div className="min-w-0">
                        <p className="truncate font-semibold leading-snug">
                          {u.portfolio.title}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          /p/{u.portfolio.slug}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground sm:mt-4">
                      {u.email}
                    </p>
                  </Link>
                ))
              )}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
