import { ShopNavbar } from "@/components/shop/ShopNavbar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <ShopNavbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 bg-muted/30 py-8 text-center text-sm text-muted-foreground">
        <p>
          © 2026{" "}
          <span className="font-semibold text-amber-600">OilMart</span> — Premium Natural Oils
        </p>
      </footer>
    </div>
  );
}
