"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await register({ username, fullName, email, password });
      router.push("/login");
    } catch (e: any) {
      setErr(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-3xl bg-card p-8 shadow-glow">
          <h1 className="text-3xl">Create your portfolio</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your public URL will be /u/your-username.
          </p>
          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Eg. John Doe"
              />
            </div>
            <div>
              <Label>Username</Label>
              <Input
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Eg. @portfolio-pal-01"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Eg. johndoe@mail.com"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-brand shadow-glow"
            >
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Have an account?{" "}
            <Link href="/login" className="text-brand-cyan font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
