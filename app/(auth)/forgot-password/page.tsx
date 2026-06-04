"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { useApiMutation } from "@/app/hooks/useApiMutation";
import { forgotPassword } from "@/app/services/api";

// type Step = "idle" | "loading" | "success";

interface ForgotPasswordFormState {
  email: string;
  error: string;
}

interface SuccessViewProps {
  email: string;
  onResend: () => void;
}

const SuccessView = ({ email, onResend }: SuccessViewProps) => (
  <div className="flex flex-col items-center gap-4 py-4 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
      <CheckCircle2 className="h-7 w-7 text-emerald-500" />
    </div>

    <div className="space-y-1">
      <h2 className="text-xl font-semibold tracking-tight">Check your inbox</h2>
      <p className="text-sm text-muted-foreground">
        We sent a password reset link to
      </p>
      <p className="text-sm font-medium">{email}</p>
    </div>

    <p className="max-w-xs text-xs text-muted-foreground">
      Didn&apos;t receive it? Check your spam folder, or{" "}
      <button
        type="button"
        onClick={onResend}
        className="font-semibold text-brand-cyan underline-offset-2 hover:underline"
      >
        resend the email
      </button>
      .
    </p>
  </div>
);

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

const ForgotPasswordPage = () => {
  // const router = useRouter();

  // const [step, setStep] = useState<Step>("idle");
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState<ForgotPasswordFormState>({
    email: "",
    error: "",
  });
  console.log("Form Email:>>>>>>>>>>", form.email);

  // const isLoading = step === "loading";
  // const isSuccess = step === "success";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSuccess(false);

    return () => {
      setShowSuccess(false);
    };
  }, []);

  const { mutate: forgotPasswordMutation, isPending: isPendingForgotPassword } =
    useApiMutation({
      mutationKey: ["forgotPassword"],
      mutationFn: forgotPassword,
      successMessage: "Forgot password process initiated successfully!",
      invalidateKeys: [],
      onSuccessCallback: () => setShowSuccess(true),
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, email: e.target.value, error: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email.trim()) {
      setForm((prev) => ({
        ...prev,
        error: "Please enter your email address.",
      }));
      return;
    }

    // setStep("loading");
    setForm((prev) => ({ ...prev, error: "" }));
    forgotPasswordMutation(form.email);

    // try {
    //   // await requestPasswordReset(form.email.trim());
    //   // setStep("success");
    // } catch (err: unknown) {
    //   const message =
    //     err instanceof Error
    //       ? (err as { response?: { data?: { message?: string } } }).response
    //           ?.data?.message || err.message
    //       : "Something went wrong. Please try again.";
    //   setForm((prev) => ({ ...prev, error: message }));
    //   // setStep("idle");
    //   console.log("Forgot Password error:>>>>>>>>>>>>", message);
    //   toast.error(message, { position: "top-right", duration: 5000 });
    // }
  };

  const handleResend = async () => {
    // setStep("loading");
    try {
      // await requestPasswordReset(form.email.trim());
      await forgotPasswordMutation(form.email.trim());
      toast.success("Reset link resent!", {
        position: "top-right",
        duration: 4000,
      });
      // setStep("success");
    } catch {
      toast.error("Could not resend. Please try again.", {
        position: "top-right",
        duration: 5000,
      });
      // setStep("success");
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-3xl bg-card p-6 shadow-glow sm:p-8">
          {/* Back navigation */}
          <Link
            href="/login"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Back to log in"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to log in
          </Link>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Reset your password
            </h1>
            {!isPendingForgotPassword && (
              <p className="mt-2 text-sm text-muted-foreground">
                Enter the email address linked to your account and we&apos;ll
                send you a reset link.
              </p>
            )}
          </div>

          {/* Content: form or success */}
          {showSuccess ? (
            <SuccessView email={form.email} onResend={handleResend} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-1.5">
                <Label htmlFor="forgot-email">Email address</Label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="forgot-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    disabled={isPendingForgotPassword}
                    value={form.email}
                    onChange={handleChange}
                    aria-describedby={
                      form.error ? "forgot-email-error" : undefined
                    }
                    aria-invalid={!!form.error}
                    className="pl-9"
                  />
                </div>

                {form.error && (
                  <p
                    id="forgot-email-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {form.error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPendingForgotPassword}
                className="w-full bg-gradient-brand shadow-glow"
              >
                {isPendingForgotPassword ? "Sending link…" : "Send reset link"}
              </Button>
            </form>
          )}

          {/* Footer links */}
          <div className="mt-6 flex flex-col gap-1.5 text-center text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-3">
            <span>
              Remembered it?{" "}
              <Link href="/login" className="font-semibold text-brand-cyan">
                Log in
              </Link>
            </span>
            <span className="hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span>
              No account?{" "}
              <Link href="/signup" className="font-semibold text-brand-cyan">
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
