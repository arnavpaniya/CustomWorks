import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsClientPage from "./ProductsClientPage";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our full catalogue of customizable products. T-shirts, mugs, caps, hoodies and more.",
};

function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="h-10 w-48 bg-zinc-200 animate-pulse rounded-lg mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClientPage />
    </Suspense>
  );
}
