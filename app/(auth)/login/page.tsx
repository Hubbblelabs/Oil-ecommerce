"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/ui/motion";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Login failed.");
          return;
        }

        const role: string = data.role;
        if (redirect && redirect !== "/") {
          router.push(redirect);
        } else if (role === "ADMIN") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
        router.refresh();
      } catch {
        setError("Network error. Please try again.");
      }
    });
  };

  return (
    <FadeIn className="mx-auto w-full max-w-[420px]">
      <div className="mb-10">
        <p className="eyebrow mb-4 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-primary" />
          Account
        </p>
        <h1 className="text-display-hero mb-3 text-4xl text-foreground">
          Welcome <em className="text-display-italic text-primary">back</em>
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to access your account.
        </p>
      </div>

      {/* Sign in / Register toggle */}
      <div className="mb-8 flex rounded-full border border-border bg-muted/40 p-1">
        <Link
          href="/login"
          className="flex-1 rounded-full bg-card py-2.5 text-center text-sm font-semibold text-foreground shadow-premium transition-all"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="flex-1 rounded-full py-2.5 text-center text-sm font-medium text-muted-foreground transition-all hover:text-foreground"
        >
          Register
        </Link>
      </div>

      {error && (
        <div
          className="mb-6 rounded-2xl border border-destructive/25 bg-destructive/10 p-4 text-sm font-medium text-destructive"
          role="alert"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="label-xs text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending}
            className="input-premium h-12 rounded-xl px-4"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="label-xs text-foreground">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="link-underline text-xs font-semibold text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isPending}
              className="input-premium h-12 rounded-xl px-4 pr-12"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="btn-shine group h-13 w-full rounded-full bg-secondary py-4 text-sm font-bold text-secondary-foreground transition-transform duration-300 hover:scale-[1.02] hover:bg-secondary active:scale-[0.99]"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Sign in to your account
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to Shri Sameya?{" "}
        <Link href="/register" className="link-underline font-semibold text-primary">
          Create an account
        </Link>
      </p>
    </FadeIn>
  );
}
