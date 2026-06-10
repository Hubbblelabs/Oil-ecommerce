"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag, Plus, Copy, Check, Trash2, ToggleLeft, ToggleRight,
  Loader2, AlertTriangle, RefreshCw, Percent, FileText,
} from "lucide-react";

interface Discount {
  id: string;
  code: string;
  description: string;
  percentage: number;
  isActive: boolean;
  usageCount: number;
  createdAt: string;
  _count?: { orders: number };
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [description, setDescription] = useState("");
  const [percentage, setPercentage] = useState("");

  const fetchDiscounts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/discounts");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setDiscounts(data.discounts);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch discounts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchDiscounts(); }, [fetchDiscounts]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/admin/discounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, percentage: Number(percentage) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess(`Discount code "${data.discount.code}" created successfully!`);
      setDescription("");
      setPercentage("");
      setShowForm(false);
      await fetchDiscounts();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create discount");
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/discounts/${id}`, { method: "PATCH" });
      if (!res.ok) throw new Error("Toggle failed");
      setDiscounts((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Toggle failed");
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`Delete discount code "${code}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`/api/admin/discounts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setDiscounts((prev) => prev.filter((d) => d.id !== id));
      setSuccess(`Discount "${code}" deleted.`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const handleCopy = (code: string) => {
    copyToClipboard(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-950/30">
            <Tag className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Discount Codes</h1>
            <p className="text-sm text-muted-foreground">
              Create & manage promo codes for customers
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchDiscounts}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border hover:bg-muted transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4" />
            New Code
          </button>
        </div>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-400 text-sm font-medium"
          >
            <Check className="h-4 w-4 shrink-0" /> {success}
            <button className="ml-auto text-green-600 hover:text-green-800" onClick={() => setSuccess(null)}>✕</button>
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-400 text-sm font-medium"
          >
            <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
            <button className="ml-auto text-red-600 hover:text-red-800" onClick={() => setError(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleCreate}
              className="bg-white dark:bg-zinc-900 rounded-2xl border border-border p-6 shadow-sm"
            >
              <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                <Plus className="h-5 w-5 text-red-600" /> Create New Discount Code
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" /> Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Diwali Special Offer"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Percent className="h-3.5 w-3.5 text-muted-foreground" /> Discount Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="e.g. 15"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      required
                      min={1}
                      max={100}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">%</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl mb-5 text-sm text-amber-800 dark:text-amber-400">
                <Tag className="h-4 w-4 shrink-0" />
                A random 8-character code will be auto-generated for this discount.
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
                >
                  {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  {creating ? "Generating..." : "Generate Code"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Codes", value: discounts.length, color: "text-foreground" },
          { label: "Active", value: discounts.filter((d) => d.isActive).length, color: "text-green-600" },
          { label: "Inactive", value: discounts.filter((d) => !d.isActive).length, color: "text-red-500" },
          { label: "Total Uses", value: discounts.reduce((acc, d) => acc + (d._count?.orders ?? d.usageCount), 0), color: "text-[#D97706]" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-zinc-900 rounded-2xl border border-border p-4 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
            <p className={`text-3xl font-black ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Discounts Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : discounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Tag className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="font-bold text-foreground mb-1">No discount codes yet</p>
            <p className="text-sm text-muted-foreground">Click "New Code" to create your first discount.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Code</th>
                  <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</th>
                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-widest text-muted-foreground">Discount</th>
                  <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">Uses</th>
                  <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {discounts.map((discount) => (
                  <tr key={discount.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-black text-[#D97706] text-base tracking-widest bg-amber-50 dark:bg-amber-950/20 px-3 py-1 rounded-lg border border-amber-200 dark:border-amber-900">
                          {discount.code}
                        </code>
                        <button
                          onClick={() => handleCopy(discount.code)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          title="Copy code"
                        >
                          {copiedId === discount.code ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-foreground font-medium max-w-[200px] truncate">
                      {discount.description}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-black text-red-600 text-lg">{discount.percentage}%</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="font-bold text-foreground">
                        {discount._count?.orders ?? discount.usageCount}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                          discount.isActive
                            ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900"
                            : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${discount.isActive ? "bg-green-500" : "bg-red-500"}`} />
                        {discount.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggle(discount.id)}
                          title={discount.isActive ? "Deactivate" : "Activate"}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {discount.isActive ? (
                            <ToggleRight className="h-5 w-5 text-green-600" />
                          ) : (
                            <ToggleLeft className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(discount.id, discount.code)}
                          title="Delete"
                          className="text-muted-foreground hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-2xl p-6">
        <h3 className="font-bold text-[#3B2416] dark:text-amber-300 mb-4 flex items-center gap-2">
          <Tag className="h-4 w-4" /> How Discount Codes Work
        </h3>
        <ol className="space-y-2 text-sm text-[#6b5a47] dark:text-amber-400/80">
          <li className="flex items-start gap-2">
            <span className="font-black text-[#D97706] shrink-0">1.</span>
            Create a discount with a description (e.g. "Diwali Special") and a percentage (e.g. 15%)
          </li>
          <li className="flex items-start gap-2">
            <span className="font-black text-[#D97706] shrink-0">2.</span>
            A random 8-character code is automatically generated (e.g. <code className="font-mono font-bold">DIWALI8X</code>)
          </li>
          <li className="flex items-start gap-2">
            <span className="font-black text-[#D97706] shrink-0">3.</span>
            Share the code with customers via WhatsApp, email, or social media
          </li>
          <li className="flex items-start gap-2">
            <span className="font-black text-[#D97706] shrink-0">4.</span>
            Customers paste the code at checkout → discount is applied to the bill instantly
          </li>
          <li className="flex items-start gap-2">
            <span className="font-black text-[#D97706] shrink-0">5.</span>
            Toggle codes active/inactive or delete them at any time
          </li>
        </ol>
      </div>
    </div>
  );
}
