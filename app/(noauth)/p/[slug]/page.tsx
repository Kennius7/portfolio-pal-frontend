/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { SiteFooter } from "@/app/components/SiteFooter";
import { PortfolioView } from "@/app/components/PortfolioView";
import { Button } from "@/app/components/ui/button";
// import { Eye, Share2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetPortfolioBySlug } from "@/app/hooks/helpers";
import LoadingComponent from "@/app/components/LoadingComponent";

const NotFoundComponent = () => {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <h1 className="text-4xl">Portfolio not found</h1>
        <p className="mt-3 text-muted-foreground">
          This porfolio isn&apos;t published or this user doesn&apos;t exist.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button className="bg-gradient-brand">Go home</Button>
        </Link>
      </div>
    </div>
  );
};

const PublicPortfolio = () => {
  const { slug } = useParams();
  const [portfolio, setPortfolio] = useState<any | null>(null);
  // const [copied, setCopied] = useState(false);
  const { data: portfolioBySlug, isPending: isPendingPortfolioBySlug } =
    useGetPortfolioBySlug(slug as string);
  // console.log("Portfolio by slug:>>>>>>>>>>>>>", portfolioBySlug);

  useEffect(() => {
    if (!portfolioBySlug) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPortfolio(portfolioBySlug);
  }, [portfolioBySlug]);

  if (isPendingPortfolioBySlug)
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <LoadingComponent />
      </div>
    );

  if (!portfolio)
    return (
      <div className="min-h-screen">
        <NotFoundComponent />
      </div>
    );

  // const share = async () => {
  //   await navigator.clipboard.writeText(window.location.href);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 1800);
  // };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      {/* <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 pt-6">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-border 
          bg-card px-4 py-1.5 text-xs text-muted-foreground"
        >
          <Eye className="h-3.5 w-3.5" /> Public view — read only
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={share}>
            <Share2 className="mr-1.5 h-4 w-4" />{" "}
            {copied ? "Copied!" : "Share link"}
          </Button>
        </div>
      </div> */}
      <PortfolioView
        portfolio={portfolio}
        skills={portfolio.skills}
        projects={portfolio.projects}
      />
      <SiteFooter />
    </div>
  );
};

export default PublicPortfolio;
