import { ProductForm } from "@/components/admin/ProductForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product | Admin Catalog",
  description: "Publish a new premium village oil product to the platform.",
};

export default function NewProductPage() {
  return (
    <div className="space-y-6 pb-20">
      <ProductForm />
    </div>
  );
}
