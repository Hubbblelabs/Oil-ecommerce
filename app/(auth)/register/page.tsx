"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/ui/motion";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error ?? "Registration failed.");
          return;
        }

        router.push("/");
        router.refresh();
      } catch {
        setError("Network error. Please try again.");
      }
    });
  };

  return (
    <FadeIn className="w-full max-w-[420px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">Create an account</h1>
        <p className="text-muted-foreground text-sm">
          Join Shri Sameya Village to track orders and save your favorites.
        </p>
      </div>

      {/* Tabs Design */}
      <div className="flex p-1 bg-muted/50 rounded-xl mb-8 border border-border/50">
        <Link href="/login" className="flex-1 text-muted-foreground hover:text-foreground rounded-lg py-2 text-sm font-medium text-center transition-all">
          Sign In
        </Link>
        <Link href="/register" className="flex-1 bg-background text-foreground shadow-sm rounded-lg py-2 text-sm font-semibold text-center transition-all">
          Register
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm font-medium text-destructive" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold">Full name</Label>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            disabled={isPending}
            className="h-12 bg-muted/30 border-transparent focus:border-amber-500/50 focus:bg-background focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending}
            className="h-12 bg-muted/30 border-transparent focus:border-amber-500/50 focus:bg-background focus:ring-4 focus:ring-amber-500/10 rounded-xl px-4 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Min. 8 characters"
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

        <Button
          type="submit"
          className="w-full h-12 gradient-amber text-white border-0 btn-shine rounded-xl font-semibold text-base shadow-amber-glow hover:shadow-amber-glow-lg transition-all"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign up for Shri Sameya Village"}
        </Button>
        
        <p className="text-center text-xs text-muted-foreground pt-4">
          By registering, you agree to our <a href="#" className="underline hover:text-foreground">Terms of Service</a> and <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
        </p>
      </form>
    </FadeIn>
  );
}
