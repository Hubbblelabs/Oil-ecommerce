"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
  category: string;
  isActive: boolean;
  createdAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  COOKING: "bg-orange-100 text-orange-800",
  PREMIUM: "bg-purple-100 text-purple-800",
  ORGANIC: "bg-green-100 text-green-800",
  INDUSTRIAL: "bg-gray-100 text-gray-800",
};

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProducts = async (p: number) => {
    setLoading(true);
    const res = await fetch(`/api/seller/products?page=${p}&limit=20`);
    const data = await res.json();
    setProducts(data.data ?? []);
    setTotalPages(data.totalPages ?? 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to deactivate this product?")) return;
    startTransition(async () => {
      await fetch(`/api/seller/products/${id}`, { method: "DELETE" });
      fetchProducts(page);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="text-muted-foreground">Manage your oil products</p>
        </div>
        <Link
          href="/seller/products/new"
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Product</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Stock</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No products yet.{" "}
                  <Link href="/seller/products/new" className="text-amber-600 hover:underline">
                    Add your first product
                  </Link>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[product.category] ?? ""}`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-amber-600">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3">
                    <span className={product.stock <= 10 ? "text-red-600 font-medium" : ""}>
                      {product.stock}
                      {product.stock <= 10 && product.stock > 0 && " ⚠"}
                      {product.stock === 0 && " (out)"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Link href={`/seller/products/${product.id}/edit`}>
                        <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 w-7 p-0 hover:text-red-600 hover:border-red-300"
                        disabled={isPending}
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}
