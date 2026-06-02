"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { PortfolioView } from "@/app/components/PortfolioView";
import { Button } from "@/app/components/ui/button";
import { Edit, Eye, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { User } from "@/app/types/types";
import { useAuth } from "@/app/lib/auth";
import {
  useGetAllProjectsByPortfolioId,
  useGetAllSkillsByPortfolioId,
  useGetAllUser,
} from "@/app/hooks/helpers";
import LoadingComponent from "@/app/components/LoadingComponent";

// export const Route = createFileRoute("/u/$username")({
//   component: PublicPortfolio,
//   notFoundComponent: () => (
//     <div className="min-h-screen">
//       <SiteHeader />
//       <div className="mx-auto max-w-md px-6 py-24 text-center">
//         <h1 className="text-4xl">Portfolio not found</h1>
//         <p className="mt-3 text-muted-foreground">That user doesn&apos;t exist.</p>
//         <Link href="/" className="mt-6 inline-block">
//           <Button className="bg-gradient-brand">Go home</Button>
//         </Link>
//       </div>
//     </div>
//   ),
// });

const NotFoundComponent = () => {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="text-4xl">Portfolio not found</h1>
        <p className="mt-3 text-muted-foreground">
          That user doesn&apos;t exist.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button className="bg-gradient-brand">Go home</Button>
        </Link>
      </div>
    </div>
  );
};

const PublicPortfolio = () => {
  //   const { username } = Route.useParams();
  const { username } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);
  const isOwner = user?.id === profile?.userId;
  //   console.log("Am I the owner?>>>>>", isOwner);
  //   console.log("Auth user:>>>>>>>>", user);
  //   console.log("User ID:>>>>>>>>", user?.userId);
  //   console.log("Profile ID:>>>>>>>>", profile?.userId);
  const portfolioId = profile?.portfolio?.id || "";
  const { data: allUsers = [], isPending: isPendingAllUsers } = useGetAllUser();
  const {
    data: allSkillsForCurrentPortfolio = [],
    isPending: isPendingAllSkills,
  } = useGetAllSkillsByPortfolioId(portfolioId);
  const {
    data: allProjectsForCurrentPortfolio = [],
    isPending: isPendingAllProjects,
  } = useGetAllProjectsByPortfolioId(portfolioId);
  const filteredUserByUsername = allUsers.filter(
    (user: User) => user.username === username,
  )[0];

  const isLoading =
    isPendingAllUsers || isPendingAllSkills || isPendingAllProjects;

  useEffect(() => {
    if (!filteredUserByUsername) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(filteredUserByUsername);
  }, [filteredUserByUsername]);

  if (isLoading)
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <LoadingComponent />
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen">
        <NotFoundComponent />
      </div>
    );

  const share = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 pt-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
          <Eye className="h-3.5 w-3.5" /> Public view — read only
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={share}>
            <Share2 className="mr-1.5 h-4 w-4" />{" "}
            {copied ? "Copied!" : "Share link"}
          </Button>
          {isOwner && (
            <Link href="/dashboard">
              <Button size="sm" className="bg-gradient-brand">
                <Edit className="mr-1.5 h-4 w-4" /> Edit
              </Button>
            </Link>
          )}
        </div>
      </div>
      <PortfolioView
        portfolio={profile.portfolio}
        skills={allSkillsForCurrentPortfolio}
        projects={allProjectsForCurrentPortfolio}
        username={profile.username}
      />
      <SiteFooter />
    </div>
  );
};

export default PublicPortfolio;
