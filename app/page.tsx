"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Share2, Lock, Sparkles } from "lucide-react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { Button } from "@/app/components/ui/button";
import { useAuth } from "@/app/lib/auth";
import { useGetAllUser } from "./hooks/helpers";

interface UserFeatured {
  userId: string;
  email: string;
  fullName: string;
  username: string;
  portfolio: {
    name: string;
    tagline: string;
  };
}

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

export default function Home() {
  const { user } = useAuth();
  const [featured, setFeatured] = useState<UserFeatured[]>([]);
  const { data: allUsers = [], isPending } = useGetAllUser();

  // 1. The callback safely handles fetching and updating state
  // const getFeatured = useCallback(async () => {
  //   // If we already have data, don't let a re-render wipe it out
  //   if (hasFetched) return;

  //   try {
  //     setHasFetched(true); // Mark as started
  //     setIsLoading(true);
  //     const users = await listAllUsers();
  //     if (users && users?.length > 0) {
  //       setFeatured(users.slice(0, 6));
  //       setHasFetched(true);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch featured users:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [listAllUsers, hasFetched]);

  // 2. The effect hooks into the component lifecycle to execute the fetch once
  useEffect(() => {
    // getFeatured();

    if (allUsers?.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFeatured(allUsers.slice(0, 6));
      // setIsLoading(false);
      // setHasFetched(true);
    }
  }, [allUsers]);

  console.log("Featured users:>>>>>>>>>>>>>", featured);
  console.log("Current user:>>>>>>>>>>>>>", user);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden px-6 py-24">
          <div className="absolute inset-0 -z-10 bg-gradient-brand opacity-20 blur-3xl" />
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Sparkles className="mr-1 inline h-3 w-3" /> Build. Share. Get
              hired.
            </span>
            <h1 className="mt-6 text-5xl md:text-7xl">
              Your{" "}
              <span className={`${user ? "" : "text-gradient"}`}>
                portfolio{!user && <br />}
              </span>
              {user && (
                <span
                  className={` 
                    ${user ? "text-gradient" : ""}
                    ${
                      user.fullName.length > 15
                        ? "text-3xl md:text-4xl"
                        : "text-3xl md:text-7xl"
                    }
                  `}
                >
                  &nbsp;{user.fullName.split(" ")[0]},<br />
                </span>
              )}
              one link away.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Sign up, design your portfolio, and share a unique link with
              clients. They can view it, but only you can edit.
            </p>
            <div className="mt-10 flex justify-center gap-3">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-gradient-brand shadow-glow">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <Button size="lg" className="bg-gradient-brand shadow-glow">
                      Create your portfolio{" "}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/u/kenny">
                    <Button size="lg" variant="secondary">
                      View demo
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-card p-6 transition hover:shadow-glow"
              >
                <f.icon className="h-8 w-8 text-brand-cyan" />
                <h3 className="mt-4 text-xl">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Portfolios Section */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-3xl">Recent portfolios</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {isPending ? (
                <div className="text-muted-foreground">
                  Loading portfolios...
                </div>
              ) : featured.length === 0 ? (
                <div className="text-muted-foreground">No portfolios found</div>
              ) : (
                featured.map((u) => (
                  <Link
                    key={u.userId}
                    href={`/u/${u.username}`}
                    className="group rounded-2xl bg-card p-6 transition hover:shadow-glow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-lg font-bold uppercase">
                        {u.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{u.fullName}</p>
                        <p className="text-xs text-muted-foreground">
                          /u/{u.fullName}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
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
