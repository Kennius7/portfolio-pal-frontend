"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/app/lib/auth";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function SiteHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-nav/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center text-background shadow-glow">
            <Image
              src="/Portfolio_Pal_Logo1.png"
              alt="Logo"
              width={40}
              height={40}
              // className="h-9 w-9"
            />
          </div>

          <span className="text-lg font-bold">
            Portfolio <span className="text-gradient">Pal</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>

          {user ? (
            <>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>

              {user.email === "ogbogukenny@yahoo.com" && (
                <Link href="/admin" className="hover:text-foreground">
                  Admin
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-foreground">
                Login
              </Link>

              <Link href="/signup">
                <Button size="sm" className="bg-gradient-brand">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
