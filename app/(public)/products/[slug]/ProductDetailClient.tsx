"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Share2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import CustomizationWizard from "@/components/customizer/CustomizationWizard";

interface ProductDetailClientProps {
  slug: string;
}

const MOCK_PRODUCT = {
  id: "1",
  slug: "custom-printed-tshirt",
  name: "Custom Printed T-Shirt",
  description:
    "Premium 180 GSM cotton T-shirt with full-color printing. Available in multiple colors and sizes. Perfect for personal use, team uniforms, or brand merchandise. DTF printing ensures vibrant colors that last.",
  basePrice: 499,
  images: [
    "/images/placeholder-product.jpg",
    "/images/placeholder-product.jpg",
    "/images/placeholder-product.jpg",
  ],
  category: "T-Shirts",
  rating: 4.8,
  reviewCount: 124,
  badge: "Best Seller",
  variants: [
    { id: "v1", size: "S", color: "White", material: "Cotton", priceAdj: 0, stockQty: 50 },
    { id: "v2", size: "M", color: "White", material: "Cotton", priceAdj: 0, stockQty: 45 },
    { id: "v3", size: "L", color: "White", material: "Cotton", priceAdj: 0, stockQty: 40 },
    { id: "v4", size: "XL", color: "White", material: "Cotton", priceAdj: 50, stockQty: 30 },
    { id: "v5", size: "XXL", color: "White", material: "Cotton", priceAdj: 100, stockQty: 20 },
  ],
  colors: ["White", "Black", "Navy", "Grey", "Red"],
  priceTiers: [
    { minQty: 1, maxQty: 4, price: 499 },
    { minQty: 5, maxQty: 9, price: 449 },
    { minQty: 10, maxQty: 49, price: 399 },
    { minQty: 50, maxQty: 999, price: 349 },
  ],
};

const COLOR_MAP: Record<string, string> = {
  White: "#FFFFFF",
  Black: "#0A0A0A",
  Navy: "#1A237E",
  Grey: "#9E9E9E",
  Red: "#E53935",
};

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = MOCK_PRODUCT;
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("White");
  const [showWizard, setShowWizard] = useState(false);

  const sizes = Array.from(new Set(product.variants.map((v) => v.size)));

  const currentPrice =
    product.basePrice +
    (product.variants.find((v) => v.size === selectedSize)?.priceAdj ?? 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-[#6B6B6B] mb-8" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
        <ChevronRight size={12} />
        <Link href="/products" className="hover:text-[#0A0A0A]">Products</Link>
        <ChevronRight size={12} />
        <span className="text-[#0A0A0A] font-medium">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image gallery */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="hidden sm:flex flex-col gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                  activeImage === i ? "border-[#0A0A0A]" : "border-transparent hover:border-[#E5E5E5]",
                )}
                aria-label={`Product image ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="flex-1 relative aspect-square rounded-2xl overflow-hidden bg-[#F5F5F5]">
            <Image
              src={product.images[activeImage]}
              alt={product.name}
              fill
              className="object-contain p-4"
              priority
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge variant="warning">{product.badge}</Badge>
              </div>
            )}
          </div>
        </div>

        {/* Product info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6B6B6B] mb-1">
              {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0A0A0A] leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-[#E5E5E5] text-[#E5E5E5]"}
                />
              ))}
            </div>
            <span className="text-sm text-[#6B6B6B]">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <p className="text-3xl font-black text-[#0A0A0A] mb-2">
            {formatPrice(currentPrice)}
          </p>

          {/* Bulk pricing */}
          <div className="flex flex-wrap gap-2 mb-6">
            {product.priceTiers.map((tier) => (
              <span key={tier.minQty} className="text-xs px-2.5 py-1 bg-[#F5F5F5] rounded-full text-[#6B6B6B]">
                {tier.minQty === tier.maxQty
                  ? `${tier.minQty}+`
                  : `${tier.minQty}–${tier.maxQty}`} pcs: {formatPrice(tier.price)}/ea
              </span>
            ))}
          </div>

          {/* Color selector */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-[#0A0A0A] mb-2">
              Color: <span className="font-normal text-[#6B6B6B]">{selectedColor}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color}`}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-all",
                    selectedColor === color ? "border-[#0A0A0A] scale-110" : "border-transparent hover:scale-105",
                    color === "White" && "shadow-sm border-[#E5E5E5]",
                  )}
                  style={{ background: COLOR_MAP[color] ?? color }}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#0A0A0A] mb-2">Size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => {
                const variant = product.variants.find((v) => v.size === size);
                const outOfStock = (variant?.stockQty ?? 0) === 0;
                return (
                  <button
                    key={size}
                    onClick={() => !outOfStock && setSelectedSize(size)}
                    disabled={outOfStock}
                    className={cn(
                      "h-10 min-w-10 px-3 rounded-lg border text-sm font-medium transition-all",
                      selectedSize === size
                        ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                        : "bg-white text-[#0A0A0A] border-[#E5E5E5] hover:border-[#0A0A0A]",
                      outOfStock && "opacity-40 cursor-not-allowed line-through",
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              variant="accent"
              size="lg"
              className="flex-1"
              onClick={() => setShowWizard(true)}
            >
              Customize Now
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              Add to Cart
            </Button>
            <button
              className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-lg border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={18} className="text-[#6B6B6B]" />
            </button>
            <button
              className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-lg border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
              aria-label="Share product"
            >
              <Share2 size={18} className="text-[#6B6B6B]" />
            </button>
          </div>

          {/* Description */}
          <div className="border-t border-[#E5E5E5] pt-6">
            <h2 className="text-sm font-bold text-[#0A0A0A] mb-2">Product Details</h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Customization Wizard Modal */}
      {showWizard && (
        <CustomizationWizard
          productId={product.id}
          productName={product.name}
          onClose={() => setShowWizard(false)}
        />
      )}
    </div>
  );
}
