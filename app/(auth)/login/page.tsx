"use client";

import { useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/app/lib/auth";
import { useRouter } from "next/router";
import Link from "next/link";

// export const Route = createFileRoute("/login")({ component: LoginPage });

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (err: unknown) {
      setErr((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-3xl bg-card p-8 shadow-glow">
          <h1 className="text-3xl">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Log in to manage your portfolio.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-brand shadow-glow"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/signup" className="text-brand-cyan font-semibold">
              Sign up
            </Link>
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Demo: <code>kenny@demo.dev</code> / <code>demo1234</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
