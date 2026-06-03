// "use client";

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import { SiteHeader } from "@/app/components/SiteHeader";
// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import { Label } from "@/app/components/ui/label";
// import { useAuth } from "@/app/lib/auth";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// const SignupPage = () => {
//   const { register } = useAuth();
//   const router = useRouter();
//   const [username, setUsername] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const payload = { username, fullName, email, password };
//     setErr("");
//     setLoading(true);
//     try {
//       await register(payload);
//       router.push("/login");
//     } catch (e: any) {
//       setErr(e.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <SiteHeader />
//       <div className="mx-auto max-w-md px-6 py-20">
//         <div className="rounded-3xl bg-card p-8 shadow-glow">
//           <h1 className="text-3xl">Create your portfolio</h1>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Your public URL will be /p/your-portfolio-slug.
//           </p>
//           <form onSubmit={submit} className="mt-8 space-y-4">
//             <div>
//               <Label>Full Name</Label>
//               <Input
//                 required
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 placeholder="Eg. John Doe"
//               />
//             </div>
//             <div>
//               <Label>Username</Label>
//               <Input
//                 required
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Eg. @portfolio-pal-01"
//               />
//             </div>
//             <div>
//               <Label>Email</Label>
//               <Input
//                 type="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Eg. johndoe@mail.com"
//               />
//             </div>
//             <div>
//               <Label>Password</Label>
//               <Input
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             {err && <p className="text-sm text-destructive">{err}</p>}
//             <Button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-gradient-brand shadow-glow"
//             >
//               {loading ? "Creating..." : "Create account"}
//             </Button>
//           </form>
//           <p className="mt-6 text-center text-sm text-muted-foreground">
//             Have an account?{" "}
//             <Link href="/login" className="text-brand-cyan font-semibold">
//               Log in
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;

"use client";

import { useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useAuth } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

const SignupPage = () => {
  const { register } = useAuth();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
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
    } catch (e: unknown) {
      const msg =
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Vertically centre the card on taller viewports, pad on short ones */}
      <div className="flex min-h-[calc(100vh-4rem)] items-start justify-center px-4 py-10 sm:items-center sm:px-6 sm:py-16">
        <div className="w-full max-w-md rounded-3xl bg-card p-6 shadow-glow sm:p-8">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl">Create your portfolio</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your public URL will be{" "}
            <code className="rounded bg-background px-1.5 py-0.5 text-xs">
              /p/your-portfolio-slug
            </code>
          </p>

          {/* Form */}
          <form onSubmit={submit} className="mt-6 space-y-4 sm:mt-8">
            <div className="grid gap-1.5">
              <Label htmlFor="su-fullname">Full name</Label>
              <Input
                id="su-fullname"
                required
                autoComplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="su-username">Username</Label>
              <Input
                id="su-username"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="portfolio-pal-01"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="su-email">Email</Label>
              <Input
                id="su-email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johndoe@mail.com"
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="su-password">Password</Label>
              <Input
                id="su-password"
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {/* Error banner */}
            {err && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
              >
                <AlertCircle
                  className="mt-0.5 h-4 w-4 shrink-0"
                  aria-hidden="true"
                />
                <span>{err}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-brand shadow-glow"
            >
              {loading ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Creating…
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-cyan hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
