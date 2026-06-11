"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/ui/motion";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Something went wrong. Please try again.");
          return;
        }

        router.push("/login");
      } catch {
        setError("Network error. Please try again.");
      }
    });
  };

  if (!token) {
    return (
      <FadeIn className="w-full max-w-[420px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Invalid link</h1>
          <p className="text-muted-foreground text-sm">
            This reset link is missing its token. Request a new one below.
          </p>
        </div>
        <Button asChild className="w-full h-12 gradient-amber text-white border-0 btn-shine rounded-xl font-semibold text-base shadow-amber-glow hover:shadow-amber-glow-lg transition-all">
          <Link href="/forgot-password">Request a new link</Link>
        </Button>
      </FadeIn>
    );
  }

  return (
    <FadeIn className="w-full max-w-[420px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Reset password</h1>
        <p className="text-muted-foreground text-sm">
          Choose a new password for your account.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-medium text-destructive" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold">New password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={isPending}
              className="h-12 bg-muted/30 border-transparent focus:border-amber-500/50 focus:bg-background focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 pr-12 transition-all"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm" className="text-sm font-semibold">Confirm password</Label>
          <Input
            id="confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            minLength={8}
            disabled={isPending}
            className="h-12 bg-muted/30 border-transparent focus:border-amber-500/50 focus:bg-background focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 transition-all"
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 gradient-amber text-white border-0 btn-shine rounded-xl font-semibold text-base shadow-amber-glow hover:shadow-amber-glow-lg transition-all"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update password"}
        </Button>
      </form>
    </FadeIn>
  );
}
