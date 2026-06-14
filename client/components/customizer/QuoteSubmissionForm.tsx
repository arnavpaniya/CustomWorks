"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, MessageCircle, ShoppingCart, Info, Palette, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDesignStore } from "@/store/design.store";
import { useCartStore } from "@/store/cart.store";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";
import { toast } from "sonner";

interface Props {
  productId: string;
  productName: string;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "919632022529"; // Replace with actual number

export default function QuoteSubmissionForm({ productId, productName, onClose }: Props) {
  const design = useDesignStore();
  const cart = useCartStore();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [needDesignHelp, setNeedDesignHelp] = useState(false);
  const [designSpecs, setDesignSpecs] = useState("");

  const product = useMemo(() => {
    return PRODUCTS_CATALOG.find(p => p.id === productId || p.slug === productId);
  }, [productId]);



  const priceResult = design.getPricingResult();
  const unitPrice = design.getUnitPrice();
  const quantity = design.quantity;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const getSerializedOptions = () => {
    if (!product?.options) return "";
    return Object.entries(design.options)
      .map(([key, val]) => {
        if (key === "bannerDimensions") return `Size: ${val.width}x${val.height}ft`;
        const optDef = product.options?.find(o => o.key === key);
        const choiceLabel = optDef?.choices?.find(c => c.value === val)?.label || val;
        return `${optDef?.name || key}: ${choiceLabel}`;
      })
      .filter(Boolean)
      .join(", ");
  };

  const generateQuoteText = () => {
    const optionsStr = Object.entries(design.options)
      .map(([key, val]) => {
        if (key === "bannerDimensions") return `- Dimensions: ${val.width}ft x ${val.height}ft`;
        const optDef = product?.options?.find(o => o.key === key);
        const choiceLabel = optDef?.choices?.find(c => c.value === val)?.label || val;
        return `- ${optDef?.name || key}: ${choiceLabel}`;
      })
      .join("\n");

    const specs = [

      optionsStr,
      uploadedFile ? `- Artwork provided: Yes (${uploadedFile.name})` : "- Artwork provided: No",
      needDesignHelp ? "- Requires design assistance: Yes" : "",
      designSpecs ? `- Design Specs: ${designSpecs}` : "",
    ].filter(Boolean).join("\n");

    const message = `Hello CustomWorks,\n\nI would like to request a quote for:\n\n*Product:* ${productName}\n*Quantity:* ${quantity} units\n\n*Specifications:*\n${specs}\n\nPlease let me know the next steps!`;
    return encodeURIComponent(message);
  };

  const handleWhatsApp = () => {
    const text = generateQuoteText();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    onClose();
  };

  const handleAddToCart = () => {
    const serialized = getSerializedOptions();
    let summary = serialized;
    if (uploadedFile) summary += ` | Artwork: ${uploadedFile.name}`;
    if (needDesignHelp) summary += ` | Needs Design Help`;
    if (designSpecs) summary += ` | Specs: ${designSpecs}`;

    cart.addItem({
      productId: product?.id || productId,
      name: productName,
      image: "/images/placeholder-product.jpg",
      price: unitPrice,
      quantity,
      variant: (serialized || "Standard"),
      customSummary: summary,
      gstExempt: product?.gstExempt,
      freeShipping: product?.freeShipping,
      moq: product?.moq || 1,
    });
    
    design.reset();
    onClose();
  };

  const handleSaveDesign = () => {
    const serialized = getSerializedOptions();
    let summary = serialized;
    if (uploadedFile) summary += ` | Artwork: ${uploadedFile.name}`;
    if (needDesignHelp) summary += ` | Needs Design Help`;
    if (designSpecs) summary += ` | Specs: ${designSpecs}`;

    const gradients = [
      { from: "from-purple-500", to: "to-indigo-500" },
      { from: "from-pink-500", to: "to-rose-500" },
      { from: "from-blue-500", to: "to-cyan-500" },
      { from: "from-amber-500", to: "to-orange-500" },
      { from: "from-emerald-500", to: "to-teal-500" }
    ];
    const grad = gradients[Math.floor(Math.random() * gradients.length)];

    const newDesign = {
      id: "D-" + Math.floor(100000 + Math.random() * 900000),
      productName: productName,
      variant: serialized || "Standard",
      customSummary: summary,
      savedAt: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      gradientFrom: grad.from,
      gradientTo: grad.to
    };

    try {
      const existing = localStorage.getItem("customworks_saved_designs");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newDesign);
      localStorage.setItem("customworks_saved_designs", JSON.stringify(list));
      toast.success("Design saved to drafts successfully!");
    } catch (err) {
      console.error("Failed to save design:", err);
      toast.error("Could not save design draft.");
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Request Quote / Add to Cart</h2>
              <p className="text-sm text-zinc-500">{productName} • {quantity} Units</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              
              {/* Custom Options from Product */}
              {product?.options && product.options.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                    <Palette size={18} className="text-zinc-500" />
                    Product Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.options.map((opt) => (
                      <div key={opt.key} className="space-y-1.5">
                        <label className="text-sm font-medium text-zinc-700">{opt.name}</label>
                        {opt.type === "select" && (
                          <select
                            value={design.options[opt.key] || opt.defaultValue}
                            onChange={(e) => design.setOption(opt.key, e.target.value)}
                            className="w-full h-10 px-3 rounded-lg border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-black"
                          >
                            {opt.choices?.map(c => (
                              <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                          </select>
                        )}
                        {opt.key === "bannerDimensions" && (
                          <div className="flex gap-2">
                            <input
                              type="number"
                              placeholder="Width (ft)"
                              value={design.options.bannerDimensions?.width || ""}
                              onChange={(e) => design.setOption("bannerDimensions", { ...design.options.bannerDimensions, width: e.target.value })}
                              className="w-full h-10 px-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-black"
                            />
                            <span className="self-center text-zinc-400">x</span>
                            <input
                              type="number"
                              placeholder="Height (ft)"
                              value={design.options.bannerDimensions?.height || ""}
                              onChange={(e) => design.setOption("bannerDimensions", { ...design.options.bannerDimensions, height: e.target.value })}
                              className="w-full h-10 px-3 rounded-lg border border-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-black"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Artwork Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-zinc-900 flex items-center gap-2">
                  <Upload size={18} className="text-zinc-500" />
                  Artwork & Design
                </h3>
                
                <div className="space-y-4">
                  <div className="relative border-2 border-dashed border-zinc-200 rounded-xl p-6 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept=".pdf,.png,.cdr,.psd,.ai,.eps,.jpg,.jpeg"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={24} className="text-zinc-400 mb-2" />
                    {uploadedFile ? (
                      <p className="text-sm font-semibold text-brand-black">{uploadedFile.name}</p>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-zinc-700">Upload your artwork</p>
                        <p className="text-xs text-zinc-500 mt-1">Accepts PDF, PNG, CDR, PSD, AI, EPS</p>
                      </>
                    )}
                  </div>

                  <label className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200 bg-white cursor-pointer hover:border-brand-black transition-colors">
                    <input
                      type="checkbox"
                      checked={needDesignHelp}
                      onChange={(e) => setNeedDesignHelp(e.target.checked)}
                      className="mt-1"
                    />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">I need design help</p>
                      <p className="text-xs text-zinc-500 mt-0.5">Don't have print-ready artwork? Our designers will help you create it.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4">
                <label className="text-sm font-semibold text-zinc-900 block">
                  Design Specifications & Notes (Optional)
                </label>
                <textarea
                  placeholder="E.g., Please use the font 'Inter', make the logo background transparent, pantone colors..."
                  value={designSpecs}
                  onChange={(e) => setDesignSpecs(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-zinc-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-black resize-none"
                />
              </div>

            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={handleWhatsApp}
            >
              <MessageCircle size={18} className="text-green-600" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={handleSaveDesign}
            >
              <Bookmark size={18} className="text-zinc-600" />
              Save Draft
            </Button>
            {!priceResult.isEmailEnquiry && (
              <Button
                variant="accent"
                size="lg"
                className="flex-grow-[1.5] flex items-center justify-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} />
                Add to Cart (₹{unitPrice * quantity})
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
