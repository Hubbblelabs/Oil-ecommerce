"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Package, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ProductFormProps {
  initialData?: {
    id: string;
    name: string;
    price: number;
    stock: number;
    image: string | null;
    description: string | null;
    category: string;
  };
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialData?.name ?? "");
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : "");
  const [stock, setStock] = useState(initialData?.stock ? String(initialData.stock) : "");
  const [image, setImage] = useState(initialData?.image ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [category, setCategory] = useState(initialData?.category ?? "COOKING");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isEdit = !!initialData;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock, 10);

    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMsg("Price must be a valid positive number.");
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      setErrorMsg("Stock must be a valid non-negative integer.");
      return;
    }

    startTransition(async () => {
      try {
        const url = isEdit ? `/api/admin/products/${initialData.id}` : "/api/admin/products";
        const method = isEdit ? "PATCH" : "POST";

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            price: priceNum,
            stock: stockNum,
            category,
            image: image.trim() || undefined,
            description: description.trim() || undefined,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMsg(data.error ?? "Failed to save product. Check input validations.");
          toast.error(data.error ?? "Failed to save product.");
          return;
        }

        toast.success(isEdit ? "Product updated successfully!" : "Product created successfully!");
        router.push("/admin/products");
        router.refresh();
      } catch {
        setErrorMsg("Network error. Please try again.");
        toast.error("Network error. Please try again.");
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild className="gap-1.5 text-muted-foreground hover:text-foreground">
          <Link href="/admin/products">
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-border/50 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Dynamic Ops Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 to-[#D97706]"></div>

        <div className="flex items-center gap-3 mb-6 border-b border-border/40 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {isEdit ? "Edit Product Details" : "Publish New Product"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Configure product details, categories, and catalogs
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-destructive bg-destructive/10 p-4 text-xs font-semibold text-destructive mb-6" role="alert">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div className="space-y-1.5">
            <Label htmlFor="product-name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Name</Label>
            <Input
              id="product-name"
              type="text"
              placeholder="e.g. Pure Wood Pressed Gingelly Oil"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              disabled={isPending}
              className="rounded-xl"
            />
          </div>

          {/* Pricing & Stock Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="product-price" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price (₹)</Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                placeholder="299.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                disabled={isPending}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="product-stock" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Stock Count</Label>
              <Input
                id="product-stock"
                type="number"
                placeholder="100"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                disabled={isPending}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Category & Image Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="product-category" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Category</Label>
              <select
                id="product-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isPending}
                className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <option value="COOKING">Cooking (Groundnut/Sesame)</option>
                <option value="PREMIUM">Premium (Coconut)</option>
                <option value="ORGANIC">Organic (Cold Pressed)</option>
                <option value="INDUSTRIAL">Bulk / Industrial</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="product-image" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Image URL</Label>
              <Input
                id="product-image"
                type="text"
                placeholder="e.g. /site_assets/product_groundnut_1l.png"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled={isPending}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label htmlFor="product-description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Product Description</Label>
            <textarea
              id="product-description"
              placeholder="Describe the purity, extraction technique, origin, health benefits, and usage instructions of this premium oil mill product."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              rows={5}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none transition-shadow font-medium text-foreground/80"
            />
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold gap-2 shadow-sm text-sm uppercase tracking-wider mt-4"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Publishing Changes...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {isEdit ? "Update Catalog Entry" : "Add to Catalog"}
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
