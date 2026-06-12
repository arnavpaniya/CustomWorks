"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star, Share2, ChevronRight, Info, Mail, Package, MessageCircle, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import QuoteSubmissionForm from "@/components/customizer/QuoteSubmissionForm";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";
import { useDesignStore } from "@/store/design.store";
import { toast } from "sonner";

interface ProductDetailClientProps {
  slug: string;
}

const CONTACT_EMAIL = "orders.customworks@gmail.com";

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [showWizard, setShowWizard] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product?.name || 'CustomWorks Product',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Product link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const product = PRODUCTS_CATALOG.find((p) => p.slug === slug || p.id === slug);
  
  const setProduct = useDesignStore((s) => s.setProduct);
  const selectedVariantId = useDesignStore((s) => s.variantId);
  const setVariant = useDesignStore((s) => s.setVariant);
  const quantity = useDesignStore((s) => s.quantity);
  const setQuantity = useDesignStore((s) => s.setQuantity);
  const getUnitPrice = useDesignStore((s) => s.getUnitPrice);
  const getPricingResult = useDesignStore((s) => s.getPricingResult);

  // Initialize the design store with this product on mount
  useEffect(() => {
    if (product) {
      setProduct(product.id);
    }
  }, [product, setProduct]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-brand-muted mb-8">The printing category you requested does not exist or has been moved.</p>
        <Link href="/products">
          <Button variant="accent">Browse All Products</Button>
        </Link>
      </div>
    );
  }

  // Get active pricing tiers
  const activeTiers = product.priceTiers || [];

  const priceResult = getPricingResult();
  const unitPrice = priceResult.unitPrice;
  const totalPrice = priceResult.totalPrice;
  const isEmailEnquiry = priceResult.isEmailEnquiry;

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
          {product.images.length > 1 && (
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
          )}

          {/* Main image */}
          <div className="flex-1 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F5F5] border border-brand-border">
            <Image
              src={product.images[activeImage] ?? "/images/placeholder-product.jpg"}
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



          {/* Price display */}
          <div className="mb-6 p-4 rounded-xl bg-brand-surface border border-brand-border">
            <p className="text-sm text-brand-muted mb-1">Price</p>
            {isEmailEnquiry ? (
              <p className="text-2xl font-black text-brand-orange">Quote on Request</p>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-brand-black">
                    {formatPrice(unitPrice)}
                  </span>
                  <span className="text-sm text-brand-muted">per piece</span>
                </div>
                <div className="text-sm text-brand-black font-semibold mt-1">
                  Total: {formatPrice(totalPrice)} <span className="font-normal text-brand-muted text-xs">(exclusive of taxes)</span>
                </div>
                {product.priceTiers && product.priceTiers.length > 0 && !isEmailEnquiry && (
                  <div className="mt-3">
                    <button 
                      onClick={() => setIsPricingModalOpen(true)}
                      className="text-xs text-brand-orange bg-brand-orange/10 hover:bg-brand-orange/20 px-3 py-2 rounded-md inline-flex items-center gap-1.5 font-medium transition-colors"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      View Volume Pricing
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOQs & Quantity */}
          <div className="mb-6">
            <div className="mb-2">
              <span className="text-sm font-semibold text-brand-black">Order Quantity</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={product.moq}
                value={quantity || ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-32 h-10 px-3 border border-brand-border rounded-lg bg-white text-brand-black font-semibold text-center focus:outline-none focus:ring-2 focus:ring-brand-black"
              />
              {quantity < product.moq && (
                <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                  <Info size={12} /> MOQ of {product.moq} required
                </span>
              )}
            </div>
          </div>



          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {isEmailEnquiry ? (
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Quote request for ${product.name}`)}&body=${encodeURIComponent(
                  `Hi CustomWorks,\n\nI want to enquire about "${product.name}", Quantity: ${quantity}.\n\nPlease share a quote.`
                )}`}
                className="flex-1"
              >
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Mail size={16} />
                  Enquire by Email
                </Button>
              </a>
            ) : (
              <Button
                variant="accent"
                size="lg"
                className="flex-1"
                onClick={() => setShowWizard(true)}
              >
                Customise and Add to Cart
              </Button>
            )}
            <button
              onClick={() => {
                setIsFavorite(!isFavorite);
                if (!isFavorite) toast.success("Added to favorites!");
              }}
              className={cn(
                "h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-lg border transition-colors",
                isFavorite 
                  ? "border-red-500 bg-red-50 hover:border-red-600" 
                  : "border-[#E5E5E5] hover:border-[#0A0A0A]"
              )}
              aria-label="Add to wishlist"
            >
              <Heart size={18} className={isFavorite ? "fill-red-500 text-red-500" : "text-[#6B6B6B]"} />
            </button>
            <button
              onClick={handleShare}
              className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-lg border border-[#E5E5E5] hover:border-[#0A0A0A] transition-colors"
              aria-label="Share product"
            >
              <Share2 size={18} className="text-[#6B6B6B]" />
            </button>
          </div>

          {/* Description */}
          <div className="border-t border-[#E5E5E5] pt-6">
            <h2 className="text-sm font-bold text-[#0A0A0A] mb-2">Corporate Category Details</h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{product.description}</p>
            {product.moq > 1 && (
              <div className="p-3 bg-brand-surface rounded-lg border border-dashed border-brand-border flex items-start gap-2.5">
                <Info size={14} className="text-brand-orange mt-0.5" />
                <span className="text-xs text-brand-muted">
                  <strong>Notice:</strong> This is a bulk contract category. Single piece samples are not available. Minimum bulk run is strictly set to <strong>{product.moq} items</strong>.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quote Submission Form Modal */}
      {showWizard && (
        <QuoteSubmissionForm
          productId={product.id}
          productName={product.name}
          onClose={() => setShowWizard(false)}
        />
      )}

      {/* Pricing Modal */}
      {isPricingModalOpen && product.priceTiers && (
        <div 
          onClick={() => setIsPricingModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-zinc-100"
          >
            {/* Header */}
            <div className="relative p-6 border-b border-zinc-100 bg-gradient-to-br from-zinc-50 to-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-orange/10 rounded-2xl">
                    <Tag className="w-5 h-5 text-brand-orange animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-brand-black leading-tight">
                      Volume Discount Pricing
                    </h3>
                    <p className="text-xs text-brand-muted mt-0.5">
                      Buy in bulk to get wholesale rates
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsPricingModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-600 rounded-full hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4 bg-zinc-50 rounded-xl p-3.5 flex items-center gap-3 border border-zinc-100">
                <Info className="w-4.5 h-4.5 text-brand-orange shrink-0" />
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Your selected quantity of <strong className="text-brand-orange">{quantity.toLocaleString()} pcs</strong> places you in the highlighted pricing tier below.
                </p>
              </div>

              <div className="space-y-1">
                {/* Table Header */}
                <div className="grid grid-cols-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wider pb-2 px-3">
                  <span>Quantity</span>
                  <span className="text-right">Price / Unit</span>
                  <span className="text-right">Discount</span>
                </div>

                {/* Table Rows */}
                {(() => {
                  const basePrice = product.priceTiers[0].price;
                  return product.priceTiers.map((tier, idx) => {
                    const isActive = quantity >= tier.min && quantity <= tier.max;
                    const discount = basePrice > 0 ? Math.round(((basePrice - tier.price) / basePrice) * 100) : 0;
                    
                    return (
                      <div 
                        key={idx} 
                        className={cn(
                          "grid grid-cols-3 items-center py-2.5 px-3 rounded-xl transition-all duration-150 border",
                          isActive 
                            ? "bg-brand-orange/[0.04] border-brand-orange/30 shadow-xs" 
                            : "border-transparent hover:bg-zinc-50/50"
                        )}
                      >
                        {/* Quantity Column */}
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-sm font-semibold",
                            isActive ? "text-brand-orange font-bold" : "text-zinc-700"
                          )}>
                            {tier.min.toLocaleString()}
                            {tier.max && tier.max !== Infinity ? ` - ${tier.max.toLocaleString()}` : '+'}
                          </span>
                          {isActive && (
                            <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full shrink-0">
                              Active
                            </span>
                          )}
                        </div>

                        {/* Price Column */}
                        <span className={cn(
                          "text-sm text-right",
                          isActive ? "text-brand-orange font-bold" : "text-zinc-800 font-medium"
                        )}>
                          {formatPrice(tier.price)}
                        </span>

                        {/* Discount Column */}
                        <div className="text-right">
                          {discount > 0 ? (
                            <span className={cn(
                              "text-xs font-semibold px-2 py-0.5 rounded-full inline-block",
                              isActive 
                                ? "bg-green-100 text-green-800" 
                                : "bg-green-50 text-green-600"
                            )}>
                              Save {discount}%
                            </span>
                          ) : (
                            <span className="text-xs text-zinc-400 italic font-normal pr-1">-</span>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-100 bg-zinc-50/50 flex justify-end gap-3">
              <Button 
                onClick={() => setIsPricingModalOpen(false)}
                className="w-full sm:w-auto bg-brand-black hover:bg-brand-black/90 text-white rounded-xl py-2 px-6 font-semibold"
              >
                Done
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
