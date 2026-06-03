"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/app/lib/auth";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { cn } from "@/app/lib/utils";
import { useIsMobile } from "../hooks/use-mobile";
import { useDashboard } from "../lib/dashboard-context";

export function SiteHeader() {
  const { user, isAdmin, logout, isHydrated } = useAuth();
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isPreviewing } = useDashboard();
  console.log("Is it mobile:>>>>>>>>>>>>", isMobile);
  console.log("Is it previewing:>>>>>>>>>>>>", isPreviewing);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isLoggedIn = isHydrated && !!user;
  const isGuest = !isHydrated || !user;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/40 bg-nav/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <div className="relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-xl shadow-glow">
              <Image
                src="/Portfolio_Pal_Logo1.png"
                alt="Portfolio Pal"
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <span className="text-[15px] font-bold tracking-tight">
              Portfolio <span className="text-gradient">Pal</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            <NavLink href="/">Home</NavLink>

            {isGuest && (
              <>
                <NavLink href="/login">Login</NavLink>
                <Link href="/signup" className="ml-2">
                  <Button
                    size="sm"
                    className="bg-gradient-brand h-8 px-4 text-sm"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <NavLink href="/dashboard">Dashboard</NavLink>
                {isAdmin && <NavLink href="/admin">Admin</NavLink>}
                <button
                  onClick={handleLogout}
                  className="ml-1 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <LogOut className="h-[15px] w-[15px]" aria-hidden="true" />
                  Logout
                </button>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          {isMobile && !isPreviewing && (
            <button
              className="grid h-9 w-9 place-items-center rounded-md text-muted-foreground 
              transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      {isMobile && !isPreviewing && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={cn(
            "fixed inset-0 z-40",
            "transition-all duration-300 ease-in-out",
            mobileOpen ? "pointer-events-auto" : "pointer-events-none",
          )}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "absolute inset-0 bg-background/60 backdrop-blur-sm transition-opacity duration-300",
              mobileOpen ? "opacity-100" : "opacity-0",
            )}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <nav
            className={cn(
              "absolute right-0 top-0 h-full w-64 border-l border-border/40 bg-nav/95 backdrop-blur-md",
              "flex flex-col gap-1 px-4 pb-8 pt-20",
              "transition-transform duration-300 ease-in-out",
              mobileOpen ? "translate-x-0" : "translate-x-full",
            )}
          >
            <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>
              Home
            </MobileNavLink>

            {isGuest && (
              <>
                <MobileNavLink
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </MobileNavLink>
                <div className="mt-2 px-1">
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    <Button size="sm" className="bg-gradient-brand w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </>
            )}

            {isLoggedIn && (
              <>
                <MobileNavLink
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </MobileNavLink>
                {isAdmin && (
                  <MobileNavLink
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                  >
                    Admin
                  </MobileNavLink>
                )}

                <div className="mt-2 border-t border-border/40 pt-2">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    Logout
                  </button>
                </div>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}

// ── Sub-components ──────────────────────────────────────────────

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm transition-colors",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-2.5 text-sm transition-colors",
        isActive
          ? "bg-accent text-foreground font-medium"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
