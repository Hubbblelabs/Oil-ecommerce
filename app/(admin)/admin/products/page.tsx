"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
  category: string;
  sellerId: string;
  isActive: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const fetchProducts = async (p: number, q: string) => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(p), limit: "20" });
    if (q) params.set("search", q);
    const res = await fetch(`/api/admin/products?${params}`);
    const data = await res.json();
    setProducts(data.data ?? []);
    setTotalPages(data.totalPages ?? 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(page, search);
  }, [page, search]);

  const handleToggle = (id: string, isActive: boolean) => {
    startTransition(async () => {
      await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });
      fetchProducts(page, search);
    });
  };

  const CATEGORY_COLORS: Record<string, string> = {
    COOKING: "bg-orange-100 text-orange-800",
    PREMIUM: "bg-purple-100 text-purple-800",
    ORGANIC: "bg-green-100 text-green-800",
    INDUSTRIAL: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground">Manage all products on the platform</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="rounded-lg border border-border/60 bg-background px-3 py-2 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => { setPage(1); setSearch(searchInput); }}
        >
          Search
        </Button>
        {search && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }}
          >
            Clear
          </Button>
        )}
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
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No products found.</td>
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
                  <td className="px-4 py-3 font-medium text-amber-600">₹{Number(product.price).toLocaleString("en-IN")}</td>
                  <td className="px-4 py-3">
                    <span className={product.stock <= 10 ? "text-red-600 font-medium" : ""}>{product.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${product.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                      {product.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className={`h-7 text-xs ${product.isActive ? "hover:text-red-600" : "hover:text-green-600"}`}
                      disabled={isPending}
                      onClick={() => handleToggle(product.id, product.isActive)}
                    >
                      {product.isActive ? "Disable" : "Enable"}
                    </Button>
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
