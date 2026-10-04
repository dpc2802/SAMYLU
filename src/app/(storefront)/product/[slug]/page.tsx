import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";
import { getLiveProductBySlug, getLiveProducts } from "@/db/queries/products";

const getProduct = cache(getLiveProductBySlug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Pieza no encontrada" };

  const description = (product.description || "").slice(0, 155) || `${product.name} - Samylú by Martha Cepeda`;
  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: product.images[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPageServer({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // "Completa el look": otras piezas activas, priorizando la misma categoria
  const all = await getLiveProducts();
  const related = all
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.type === product.type) - Number(a.type === product.type))
    .slice(0, 4)
    .map((p) => ({ id: p.id, name: p.name, slug: p.slug, price: p.price, img: p.img }));

  return <ProductClient initialProduct={product} related={related} />;
}
