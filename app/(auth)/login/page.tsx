"use client";

import { useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";

// export const Route = createFileRoute("/login")({ component: LoginPage });

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { email, password };
    setErr("");
    setLoading(true);
    try {
      await login(payload);
      toast.success("Signed in successfully!", {
        position: "top-right",
        duration: 5000,
      });
      router.push("/");
    } catch (error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setErr((error as any).response.data.message);
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
            <div className="grid gap-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input
                type="email"
                required
                id="login-email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </div>
            <div className="grid gap-1.5 relative">
              <Label htmlFor="login-password">Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                required
                id="login-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <div
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-[50%] flex cursor-pointer items-center px-2"
              >
                {!showPassword ? (
                  <EyeClosed className="h-5 w-5 text-muted-foreground outline-none" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground outline-none" />
                )}
              </div>
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
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Forgot Password?{" "}
            <Link
              href="/forgot-password"
              className="text-brand-cyan font-semibold"
            >
              Reset Password
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
