import type { Metadata } from "next";
import ProductsClientPage from "./ProductsClientPage";

export const metadata: Metadata = {
  title: "All Products",
  description: "Browse our full catalogue of customizable products. T-shirts, mugs, caps, hoodies and more.",
};

export default function ProductsPage() {
  return <ProductsClientPage />;
}
