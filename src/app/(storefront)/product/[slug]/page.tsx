import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { getLiveProductBySlug } from "@/db/queries/products";

export default async function ProductPageServer({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getLiveProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductClient initialProduct={product} />;
}
