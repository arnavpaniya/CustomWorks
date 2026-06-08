import type { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

import { PRODUCTS_CATALOG } from "@/lib/products-catalog";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS_CATALOG.find((p) => p.slug === slug || p.id === slug);
  const name = product ? product.name : slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const description = product ? product.description : `Customize your own ${name}. Premium quality, made-to-order.`;
  const images = product && product.images.length > 0 ? product.images : ["/images/placeholder-product.jpg"];

  return {
    title: name,
    description: description,
    openGraph: {
      title: name,
      description: description,
      images: images,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: description,
      images: images,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
