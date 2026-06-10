import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { productService } from "@/server/services/product.service";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await productService.getProductById(id);
  if (!product) return { title: "Edit Product | Not Found" };
  return {
    title: `Edit ${product.name} | Admin Catalog`,
  };
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await productService.getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6 pb-20">
      <ProductForm initialData={product} />
    </div>
  );
}
