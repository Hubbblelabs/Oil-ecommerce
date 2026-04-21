import { Droplets } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-50/40 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-bold">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white">
          <Droplets className="h-5 w-5" />
        </div>
        <span className="text-amber-600">OilMart</span>
      </Link>
      {children}
    </div>
  );
}
