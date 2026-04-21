"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CATEGORIES = ["COOKING", "PREMIUM", "ORGANIC", "INDUSTRIAL"] as const;

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    category: "COOKING",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    fetch(`/api/seller/products?page=1&limit=100`)
      .then((r) => r.json())
      .then((data) => {
        const product = data.data?.find((p: any) => p.id === id);
        if (product) {
          setForm({
            name: product.name,
            price: String(Number(product.price)),
            stock: String(product.stock),
            image: product.image ?? "",
            category: product.category,
          });
        }
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const price = parseFloat(form.price);
    const stock = parseInt(form.stock, 10);

    if (isNaN(price) || price <= 0) {
      setError("Price must be a positive number.");
      return;
    }
    if (isNaN(stock) || stock < 0) {
      setError("Stock must be a non-negative integer.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(`/api/seller/products/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            price,
            stock,
            image: form.image || "",
            category: form.category,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Failed to update product.");
          return;
        }

        router.push("/seller/products");
        router.refresh();
      } catch {
        setError("Network error. Please try again.");
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl">
      <div className="flex items-center gap-3">
        <Link href="/seller/products">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-muted-foreground">Update your product details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border border-border/60 bg-card p-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Product Name *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            required
            minLength={2}
            disabled={isPending}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="price">Price (₹) *</Label>
            <Input
              id="price"
              type="number"
              min="0.01"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              required
              disabled={isPending}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              step="1"
              value={form.stock}
              onChange={(e) => set("stock", e.target.value)}
              required
              disabled={isPending}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30"
            disabled={isPending}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="image">Image URL (optional)</Label>
          <Input
            id="image"
            type="url"
            value={form.image}
            onChange={(e) => set("image", e.target.value)}
            disabled={isPending}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Save Changes
          </Button>
          <Link href="/seller/products">
            <Button type="button" variant="outline" disabled={isPending}>
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
