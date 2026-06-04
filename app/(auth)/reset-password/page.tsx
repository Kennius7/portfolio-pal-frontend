"use client";

import { useState } from "react";
import { SiteHeader } from "@/app/components/SiteHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
// import { toast } from "sonner";
import {
  ArrowLeft,
  Eye,
  EyeClosed,
  KeyRound,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useApiMutation } from "@/app/hooks/useApiMutation";
import { resetPassword } from "@/app/services/api";

interface ResetPasswordFormState {
  password: string;
  confirmPassword: string;
  errors: Partial<Record<"password" | "confirmPassword" | "general", string>>;
}

interface PasswordVisibility {
  password: boolean;
  confirmPassword: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PASSWORD_MIN_LENGTH = 8;

interface StrengthLevel {
  label: string;
  color: string;
  segments: number;
}

const STRENGTH_LEVELS: StrengthLevel[] = [
  { label: "Too short", color: "#ef4444", segments: 1 },
  { label: "Weak", color: "#f97316", segments: 2 },
  { label: "Fair", color: "#eab308", segments: 3 },
  { label: "Good", color: "#22c55e", segments: 4 },
  { label: "Strong", color: "#10b981", segments: 4 },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getPasswordStrength(password: string): number {
  if (password.length < PASSWORD_MIN_LENGTH) return 0;
  let score = 1;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

interface PasswordStrengthBarProps {
  password: string;
}

const PasswordStrengthBar = ({ password }: PasswordStrengthBarProps) => {
  if (!password) return null;

  const score = getPasswordStrength(password);
  const level = STRENGTH_LEVELS[score];

  return (
    <div className="mt-2 space-y-1" aria-live="polite" aria-atomic="true">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-colors duration-300"
            style={{
              backgroundColor:
                i < level.segments ? level.color : "hsl(var(--muted))",
            }}
          />
        ))}
      </div>
      <p
        className="text-xs"
        style={{ color: level.color }}
        aria-label={`Password strength: ${level.label}`}
      >
        {level.label}
      </p>
    </div>
  );
};

interface SuccessViewProps {
  onGoToLogin: () => void;
}

const SuccessView = ({ onGoToLogin }: SuccessViewProps) => (
  <div className="flex flex-col items-center gap-5 py-4 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10">
      <CheckCircle2 className="h-7 w-7 text-emerald-500" aria-hidden="true" />
    </div>

    <div className="space-y-1">
      <h2 className="text-xl font-semibold tracking-tight">Password updated</h2>
      <p className="text-sm text-muted-foreground">
        Your password has been reset successfully. You can now log in with your
        new password.
      </p>
    </div>

    <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
      <ShieldCheck
        className="h-4 w-4 shrink-0 text-emerald-500"
        aria-hidden="true"
      />
      <span>Your account is now secured with your new password.</span>
    </div>

    <Button
      onClick={onGoToLogin}
      className="w-full bg-gradient-brand shadow-glow"
    >
      Continue to log in
    </Button>
  </div>
);

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

// interface ResetPasswordPageProps {
//   /** JWT or opaque token from the reset-password email link. */
//   token?: string;
// }

const ResetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // const [step, setStep] = useState<Step>("idle");
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState<ResetPasswordFormState>({
    password: "",
    confirmPassword: "",
    errors: {},
  });
  const [visibility, setVisibility] = useState<PasswordVisibility>({
    password: false,
    confirmPassword: false,
  });

  // const isLoading = step === "loading";
  // const isSuccess = step === "success";

  // ---- Handlers ------------------------------------------------------------

  const { mutate: resetPasswordMutation, isPending: isPendingResetPassword } =
    useApiMutation({
      mutationKey: ["resetPassword"],
      mutationFn: resetPassword,
      successMessage: "Password reset successfully!",
      invalidateKeys: [],
      onSuccessCallback: () => setShowSuccess(true),
    });

  const handleChange =
    (field: "password" | "confirmPassword") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
        errors: { ...prev.errors, [field]: undefined, general: undefined },
      }));
    };

  const toggleVisibility = (field: keyof PasswordVisibility) => () => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = (): boolean => {
    const errs: ResetPasswordFormState["errors"] = {};

    if (form.password.length < PASSWORD_MIN_LENGTH) {
      errs.password = `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`;
    }
    if (!form.confirmPassword) {
      errs.confirmPassword = "Please confirm your new password.";
    } else if (form.password !== form.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errs).length > 0) {
      setForm((prev) => ({ ...prev, errors: errs }));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    resetPasswordMutation({ token: token as string, password: form.password });

    // try {
    //   await submitPasswordReset(token, form.password);
    //   setStep("success");
    // } catch (err: unknown) {
    //   const message =
    //     err instanceof Error
    //       ? err.message
    //       : "Something went wrong. Please try again.";

    //   setForm((prev) => ({ ...prev, errors: { general: message } }));
    //   setStep("idle");
    //   toast.error(message, { position: "top-right", duration: 5000 });
    // }
  };

  // ---- Render --------------------------------------------------------------

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-md px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-3xl bg-card p-6 shadow-glow sm:p-8">
          {/* Back navigation — hidden on success */}
          {!showSuccess && (
            <Link
              href="/login"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Back to log in"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to log in
            </Link>
          )}

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {showSuccess ? "All done" : "Choose a new password"}
            </h1>
            {!showSuccess && (
              <p className="mt-2 text-sm text-muted-foreground">
                Your new password must be at least {PASSWORD_MIN_LENGTH}{" "}
                characters long.
              </p>
            )}
          </div>

          {/* Content: form or success */}
          {showSuccess ? (
            <SuccessView onGoToLogin={() => router.push("/login")} />
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* New password */}
              <div className="grid gap-1.5">
                <Label htmlFor="reset-password">New password</Label>
                <div className="relative">
                  <KeyRound
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="reset-password"
                    type={visibility.password ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    disabled={isPendingResetPassword}
                    value={form.password}
                    onChange={handleChange("password")}
                    aria-describedby={
                      form.errors.password ? "reset-password-error" : undefined
                    }
                    aria-invalid={!!form.errors.password}
                    className="pl-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility("password")}
                    aria-label={
                      visibility.password ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={0}
                  >
                    {visibility.password ? (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeClosed className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <PasswordStrengthBar password={form.password} />

                {form.errors.password && (
                  <p
                    id="reset-password-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {form.errors.password}
                  </p>
                )}
              </div>

              {/* Confirm password */}
              <div className="grid gap-1.5">
                <Label htmlFor="reset-confirm-password">
                  Confirm new password
                </Label>
                <div className="relative">
                  <KeyRound
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    id="reset-confirm-password"
                    type={visibility.confirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    disabled={isPendingResetPassword}
                    value={form.confirmPassword}
                    onChange={handleChange("confirmPassword")}
                    aria-describedby={
                      form.errors.confirmPassword
                        ? "reset-confirm-password-error"
                        : undefined
                    }
                    aria-invalid={!!form.errors.confirmPassword}
                    className="pl-9 pr-10"
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility("confirmPassword")}
                    aria-label={
                      visibility.confirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={0}
                  >
                    {visibility.confirmPassword ? (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeClosed className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                {form.errors.confirmPassword && (
                  <p
                    id="reset-confirm-password-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {form.errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* General / server error */}
              {form.errors.general && (
                <p role="alert" className="text-sm text-destructive">
                  {form.errors.general}
                </p>
              )}

              <Button
                type="submit"
                disabled={isPendingResetPassword}
                className="w-full bg-gradient-brand shadow-glow"
              >
                {isPendingResetPassword
                  ? "Updating password…"
                  : "Reset password"}
              </Button>
            </form>
          )}

          {/* Footer links — always visible */}
          {!showSuccess && (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default ResetPasswordPage;
