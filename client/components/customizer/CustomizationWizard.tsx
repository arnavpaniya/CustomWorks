"use client";

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Type, ImagePlus, Palette, ChevronLeft, ChevronRight, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDesignStore } from "@/store/design.store";
import { useCartStore } from "@/store/cart.store";
import { PRODUCTS_CATALOG } from "@/lib/products-catalog";

interface Props {
  productId: string;
  productName: string;
  onClose: () => void;
}

const STEPS = [
  { id: 1, label: "Configure" },
  { id: 2, label: "Customize" },
  { id: 3, label: "Preview" },
  { id: 4, label: "Quantity" },
];

const PLACEMENTS = ["Front", "Back", "Left Sleeve", "Right Sleeve"];
const BASE_COLORS = ["#FFFFFF", "#0A0A0A", "#1A237E", "#E53935", "#2E7D32", "#F57C00"];
const FONTS = ["Inter", "Georgia", "Courier New", "Arial Black", "Trebuchet MS"];
const CONTACT_EMAIL = "orders.customworks@gmail.com";

export default function CustomizationWizard({ productId, productName, onClose }: Props) {
  const design = useDesignStore();
  const cart = useCartStore();

  const currentStep = design.step;
  const setCurrentStep = design.setStep;
  const text = design.text;
  const setText = design.setText;
  const textColor = design.textColor;
  const setTextColor = design.setTextColor;
  const fontSize = design.fontSize;
  const setFontSize = design.setFontSize;
  const fontFamily = design.fontFamily;
  const setFontFamily = design.setFontFamily;
  const bold = design.bold;
  const setBold = design.setBold;
  const italic = design.italic;
  const setItalic = design.setItalic;
  const placement = design.placement;
  const setPlacement = design.setPlacement;
  const baseColor = design.baseColor;
  const setBaseColor = design.setBaseColor;
  const quantity = design.quantity;
  const setQuantity = design.setQuantity;
  const selectedSize = design.selectedSize;
  const setSelectedSize = design.setSelectedSize;
  const selectedColor = design.selectedColor;
  const setSelectedColor = design.setSelectedColor;

  // Retrieve current product information from catalog
  const product = useMemo(() => {
    return PRODUCTS_CATALOG.find(p => p.id === productId || p.slug === productId);
  }, [productId]);

  const subproduct = useMemo(() => {
    return product?.subproducts?.find(sp => sp.id === design.variantId);
  }, [product, design.variantId]);

  const moq = product?.moq || 1;

  // Dynamic pricing evaluation using our centralized pricing engine via the Zustand store
  const priceResult = design.getPricingResult();
  const unitPrice = design.getUnitPrice();
  const totalPrice = design.getTotalPrice();

  // Enforce MOQ on mount or product switch
  React.useEffect(() => {
    if (quantity < moq) {
      design.setQuantity(moq);
    }
  }, [moq, quantity, design]);

  // Serializes selected options into readable descriptions
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

  // Email enquiry draft generator
  const getEnquiryEmailUrl = () => {
    const optionsStr = Object.entries(design.options)
      .map(([key, val]) => {
        if (key === "bannerDimensions") return `- Dimensions: ${val.width}ft x ${val.height}ft`;
        const optDef = product?.options?.find(o => o.key === key);
        const choiceLabel = optDef?.choices?.find(c => c.value === val)?.label || val;
        return `- ${optDef?.name || key}: ${choiceLabel}`;
      })
      .join("\n");

    const specs = [
      subproduct ? `- Subproduct/Material: ${subproduct.name}` : "",
      product?.id === "custom-apparel" ? `- Size: ${selectedSize}\n- Colorway: ${selectedColor}` : "",
      `- Base Color: ${design.baseColor}`,
      `- Placement: ${design.placement}`,
      design.text ? `- Custom Text: "${design.text}"` : "",
      optionsStr
    ].filter(Boolean).join("\n");

    const message = `Hello CustomWorks,\n\nI would like to enquire about:\n\nProduct: ${productName}\nQuantity: ${design.quantity} units\n\nSpecifications:\n${specs}\n\nCan you please share a custom quotation?`;
    
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Quote request for ${productName}`)}&body=${encodeURIComponent(message)}`;
  };

  const handleAddToCart = () => {
    if (priceResult.isEmailEnquiry) {
      window.open(getEnquiryEmailUrl(), "_self");
      return;
    }

    const serialized = getSerializedOptions();
    
    cart.addItem({
      productId: product?.id || productId,
      name: productName,
      image: "/images/placeholder-product.jpg",
      price: unitPrice,
      quantity,
      variant: subproduct ? subproduct.name : (serialized || "Standard"),
      customSummary: `Placement: ${placement}${text ? `, Text: "${text}"` : ""}${serialized ? `, ${serialized}` : ""}`,
    });
    
    design.reset();
    onClose();
  };

  const handleClose = () => {
    design.reset();
    onClose();
  };

  // Dynamically determines preview shape classes and aspect ratio based on product & subproduct
  const getPreviewStyles = () => {
    const isRounded = design.options.corners === "rounded";
    let aspect = "aspect-square";
    let rounded = "rounded-xl";
    
    if (product?.id === "business-cards") {
      aspect = "aspect-[1.58]"; // standard card ratio
      rounded = isRounded ? "rounded-2xl" : "rounded-sm";
    } else if (product?.id === "banners") {
      const dims = design.options.bannerDimensions || { width: 6, height: 4 };
      const w = Number(dims.width) || 6;
      const h = Number(dims.height) || 4;
      aspect = `aspect-[${w}/${h}]`;
      rounded = "rounded-md";
    } else if (product?.id === "envelopes") {
      if (design.variantId === "dl-envelopes") aspect = "aspect-[2.2]";
      else if (design.variantId === "c5-envelopes") aspect = "aspect-[1.41]";
      else if (design.variantId === "c4-envelopes") aspect = "aspect-[0.71]";
      rounded = "rounded-sm";
    } else if (product?.id === "flyers-letterheads") {
      aspect = "aspect-[0.71]"; // vertical A4
      rounded = "rounded-none";
    } else if (product?.id === "calendars") {
      if (design.variantId === "rectangle-calendar") aspect = "aspect-[1.4]";
      else aspect = "aspect-square";
      rounded = "rounded-lg border-b-4 border-zinc-200"; // look like table standee
    } else if (product?.id === "diaries") {
      aspect = "aspect-[0.71]";
      rounded = "rounded-md border-r-8 border-brand-black/10"; // notebook binding
    } else if (product?.id === "promotional-cards") {
      if (design.variantId === "bookmarks") aspect = "aspect-[0.25]";
      else aspect = "aspect-[0.7]";
      rounded = "rounded-sm";
    } else if (product?.id === "stickers-mugs-badges") {
      if (design.variantId === "stickers") {
        aspect = "aspect-square";
        rounded = "rounded-full border border-dashed border-zinc-300";
      } else if (design.variantId === "ceramic-mugs") {
        aspect = "aspect-[0.8]";
        rounded = "rounded-[2rem] border-r-[12px] border-zinc-200 shadow-inner";
      } else {
        aspect = "aspect-[0.6]";
        rounded = "rounded-sm";
      }
    }
    return { aspect, rounded };
  };

  const previewStyles = getPreviewStyles();
  const isBanner = product?.id === "banners";
  const bannerDims = design.options.bannerDimensions || { width: 6, height: 4 };
  const bannerAspect = isBanner ? Number(bannerDims.width) / Number(bannerDims.height) : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in-50 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Product customization wizard"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
          <div>
            <h2 className="font-black text-lg text-brand-black">Customize {productName}</h2>
            <p className="text-xs text-brand-muted font-serif">Step {currentStep} of {STEPS.length}</p>
          </div>
          <button
            onClick={handleClose}
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-brand-surface transition-colors cursor-pointer"
            aria-label="Close wizard"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 py-3 border-b border-brand-border bg-brand-surface/20">
          <div className="flex items-center gap-2">
            {STEPS.map((step, i) => (
              <div key={step.id} className="flex items-center gap-2 flex-1">
                <div
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all",
                    currentStep > step.id
                      ? "bg-[#22C55E] text-white"
                      : currentStep === step.id
                      ? "bg-brand-black text-white"
                      : "bg-brand-border text-brand-muted/60",
                  )}
                >
                  {currentStep > step.id ? <Check size={12} /> : step.id}
                </div>
                <span className={cn(
                  "text-xs font-bold hidden sm:block",
                  currentStep === step.id ? "text-brand-black" : "text-brand-muted/70",
                )}>
                  {step.label}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={cn("flex-1 h-px", currentStep > step.id ? "bg-[#22C55E]" : "bg-brand-border")} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto p-6 bg-brand-surface/5">
          <AnimatePresence mode="wait">
            {/* Step 1: Configure & Choose Variant / Specifications */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                
                {/* 1. Subproduct selector if available */}
                {product?.subproducts && product.subproducts.length > 0 && (
                  <div>
                    <h3 className="text-sm font-black text-brand-black mb-3 uppercase tracking-wider">Choose Material & Finish</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.subproducts.map((sp) => {
                        const isSelected = design.variantId === sp.id;
                        return (
                          <button
                            key={sp.id}
                            onClick={() => design.setVariant(sp.id)}
                            className={cn(
                              "text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group hover:scale-[1.01] hover:shadow-md",
                              isSelected
                                ? "border-brand-black bg-brand-white shadow-md"
                                : "border-brand-border bg-white hover:border-zinc-400"
                            )}
                          >
                            <div className="flex justify-between items-start w-full">
                              <span className="font-bold text-sm text-brand-black group-hover:text-brand-accent transition-colors">
                                {sp.name}
                              </span>
                              {isSelected && (
                                <span className="bg-brand-black text-white p-0.5 rounded-full shrink-0">
                                  <Check size={12} />
                                </span>
                              )}
                            </div>
                            {sp.basePrice > 0 && (
                              <span className="text-xs text-brand-muted mt-2 font-serif font-semibold">
                                Starting from ₹{sp.basePrice}/unit
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Dynamic options based on product type */}
                {product?.options && product.options.length > 0 && (
                  <div className="border-t border-brand-border pt-6 space-y-5">
                    <h3 className="text-sm font-black text-brand-black uppercase tracking-wider">Custom Specifications</h3>
                    
                    <div className="grid grid-cols-1 gap-5">
                      {product.options.map((opt) => (
                        <div key={opt.key} className="space-y-2">
                          <label className="text-xs font-black text-brand-black block">
                            {opt.name}
                          </label>

                          {/* Render select fields */}
                          {opt.type === "select" && opt.choices && (
                            <div className="flex flex-wrap gap-2">
                              {opt.choices.map((choice) => {
                                const isSelected = design.options[opt.key] === choice.value;
                                return (
                                  <button
                                    key={choice.value}
                                    onClick={() => design.setOption(opt.key, choice.value)}
                                    className={cn(
                                      "px-4 py-2 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer",
                                      isSelected
                                        ? "bg-brand-black text-white border-brand-black shadow-sm"
                                        : "bg-white text-brand-black border-brand-border hover:border-brand-black hover:bg-brand-surface"
                                    )}
                                  >
                                    {choice.label}
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Render dimensions input (e.g. Banners) */}
                          {opt.type === "dimensions" && (
                            <div className="grid grid-cols-2 gap-4 bg-brand-surface/40 p-4 rounded-xl border border-brand-border">
                              <div>
                                <label className="text-[10px] font-black text-zinc-500 mb-1 block uppercase">Width (feet)</label>
                                <input
                                  type="number"
                                  min={1}
                                  max={50}
                                  value={design.options[opt.key]?.width || 6}
                                  onChange={(e) => {
                                    const currentDims = design.options[opt.key] || { width: 6, height: 4 };
                                    design.setOption(opt.key, { ...currentDims, width: Math.max(1, Number(e.target.value)) });
                                  }}
                                  className="w-full h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black font-semibold bg-white"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-black text-zinc-500 mb-1 block uppercase">Height (feet)</label>
                                <input
                                  type="number"
                                  min={1}
                                  max={50}
                                  value={design.options[opt.key]?.height || 4}
                                  onChange={(e) => {
                                    const currentDims = design.options[opt.key] || { width: 6, height: 4 };
                                    design.setOption(opt.key, { ...currentDims, height: Math.max(1, Number(e.target.value)) });
                                  }}
                                  className="w-full h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black font-semibold bg-white"
                                />
                              </div>
                              <div className="col-span-2 text-center text-xs text-brand-muted font-bold uppercase tracking-wider pt-2 border-t border-brand-border/60">
                                Calculated Area: {(design.options[opt.key]?.width || 6) * (design.options[opt.key]?.height || 4)} sqft
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Render apparel sizes and colorway if it's the custom apparel product */}
                {product?.id === "custom-apparel" && (
                  <div className="space-y-5 pt-4">
                    <div>
                      <p className="text-xs font-black text-brand-black uppercase tracking-wider mb-2">Size Selection</p>
                      <div className="flex flex-wrap gap-2">
                        {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={cn(
                              "h-10 min-w-10 px-3 rounded-lg border text-xs font-black transition-all duration-200 cursor-pointer",
                              selectedSize === s
                                ? "bg-brand-black text-white border-brand-black"
                                : "bg-white text-brand-black border-brand-border hover:border-brand-black"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-black text-brand-black uppercase tracking-wider mb-2">
                        Colorway: <span className="font-normal text-brand-muted">{selectedColor}</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries({ White: "#FFFFFF", Black: "#0A0A0A", Navy: "#1A237E", Grey: "#9E9E9E", Red: "#E53935" }).map(([name, hex]) => (
                          <button
                            key={name}
                            onClick={() => setSelectedColor(name)}
                            aria-label={`Select ${name}`}
                            className={cn(
                              "h-9 w-9 rounded-full border-2 transition-all duration-200 cursor-pointer",
                              selectedColor === name ? "border-brand-black scale-110" : "border-transparent hover:scale-105",
                              name === "White" && "shadow-sm border-zinc-200",
                            )}
                            style={{ background: hex }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 2: Customize Canvas Elements */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="grid md:grid-cols-12 gap-6 items-start">
                  
                  {/* Canvas Live Preview */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <p className="text-xs font-black text-brand-black mb-3 uppercase tracking-wider self-start">Live Interactive Preview</p>
                    <div className="w-full flex items-center justify-center p-6 bg-brand-white rounded-2xl border border-brand-border shadow-inner min-h-[300px]">
                      <div
                        className={cn(
                          "w-full border-2 border-dashed border-zinc-300 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-md",
                          !isBanner && previewStyles.aspect,
                          previewStyles.rounded
                        )}
                        style={{
                          background: baseColor,
                          aspectRatio: isBanner ? bannerAspect : undefined
                        }}
                      >
                        {/* Safe Placement zone boundary */}
                        <div className="absolute inset-4 border border-dashed border-brand-border/40 rounded flex items-center justify-center">
                          {text ? (
                            <p
                              style={{
                                fontFamily,
                                fontSize: `${fontSize * 0.8}px`,
                                color: textColor,
                                fontWeight: bold ? "bold" : "normal",
                                fontStyle: italic ? "italic" : "normal",
                                textAlign: "center",
                                wordBreak: "break-word",
                                padding: "6px",
                              }}
                            >
                              {text}
                            </p>
                          ) : (
                            <p className="text-[10px] font-bold text-zinc-400 text-center uppercase tracking-wide px-4">
                              Custom Logo & Print Zone
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Placement zone tagger */}
                    <div className="w-full mt-3">
                      <p className="text-[10px] font-black text-zinc-500 mb-2 uppercase">Placement Surface</p>
                      <div className="flex flex-wrap gap-1.5">
                        {PLACEMENTS.map((p) => (
                          <button
                            key={p}
                            onClick={() => setPlacement(p)}
                            className={cn(
                              "px-3 py-1 rounded-full text-xs font-bold border transition-all duration-200 cursor-pointer",
                              placement === p
                                ? "bg-brand-black text-white border-brand-black shadow-sm"
                                : "bg-white text-brand-muted border-brand-border hover:border-brand-black",
                            )}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Design & Typography controls */}
                  <div className="md:col-span-7 space-y-4">
                    {/* Monogram input */}
                    <div className="bg-white rounded-xl p-4 border border-brand-border shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Type size={14} className="text-brand-black" />
                        <p className="text-xs font-black text-brand-black uppercase tracking-wider">Add Custom Monogram/Text</p>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter text to display…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black mb-3 font-semibold bg-white"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <p className="text-[10px] font-black text-zinc-500 mb-1 uppercase">Font Family</p>
                          <select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className="w-full h-8 px-2 rounded-lg border border-brand-border text-xs focus:outline-none focus:ring-1 focus:ring-brand-black bg-white cursor-pointer font-bold"
                          >
                            {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-zinc-500 mb-1 uppercase">Font Size: {fontSize}px</p>
                          <input
                            type="range"
                            min={12}
                            max={60}
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-[10px] font-black text-zinc-500 mb-1 uppercase">Text Color</p>
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="h-8 w-12 rounded cursor-pointer border border-brand-border p-0.5 bg-white"
                            aria-label="Text color"
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-4">
                          <button
                            onClick={() => setBold(!bold)}
                            className={cn("h-8 w-8 rounded font-black text-sm border transition-all duration-200 cursor-pointer", bold ? "bg-brand-black text-white border-brand-black" : "border-brand-border hover:border-brand-black")}
                          >B</button>
                          <button
                            onClick={() => setItalic(!italic)}
                            className={cn("h-8 w-8 rounded italic font-black text-sm border transition-all duration-200 cursor-pointer", italic ? "bg-brand-black text-white border-brand-black" : "border-brand-border hover:border-brand-black")}
                          >I</button>
                        </div>
                      </div>
                    </div>

                    {/* Vector/Art upload */}
                    <div className="bg-white rounded-xl p-4 border border-brand-border shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <ImagePlus size={14} className="text-brand-black" />
                        <p className="text-xs font-black text-brand-black uppercase tracking-wider">Upload Custom Vector Art/Logo</p>
                      </div>
                      <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-brand-border rounded-xl cursor-pointer hover:border-black transition-colors duration-200 bg-brand-surface/10 hover:bg-brand-surface/20">
                        <input type="file" className="sr-only" accept="image/*" aria-label="Upload logo file" />
                        <ImagePlus size={20} className="text-brand-muted mb-1 animate-pulse" />
                        <p className="text-[10px] font-bold text-zinc-500">JPG, PNG, SVG · Max 10MB</p>
                      </label>
                    </div>

                    {/* Canvas background coloring */}
                    <div className="bg-white rounded-xl p-4 border border-brand-border shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Palette size={14} className="text-brand-black" />
                        <p className="text-xs font-black text-brand-black uppercase tracking-wider">Canvas Base Fill</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {BASE_COLORS.map((c) => (
                          <button
                            key={c}
                            onClick={() => setBaseColor(c)}
                            aria-label={`Set base color to ${c}`}
                            className={cn(
                              "h-7 w-7 rounded-full border-2 transition-all duration-200 cursor-pointer",
                              baseColor === c ? "border-brand-black scale-110" : "border-transparent hover:scale-105",
                              c === "#FFFFFF" && "shadow-sm border-zinc-200",
                            )}
                            style={{ background: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Design Summary & Specifications Review */}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-bold text-brand-black mb-4 font-serif text-center">Confirm Your Technical Specifications</h3>

                <div className="grid md:grid-cols-2 gap-6 items-center max-w-2xl mx-auto">
                  {/* Aspect-perfect static render */}
                  <div className="flex flex-col items-center justify-center p-6 bg-brand-white rounded-2xl border border-brand-border shadow-sm min-h-[260px]">
                    <div
                      className={cn(
                        "w-full max-w-[200px] border border-brand-border flex items-center justify-center relative shadow-lg transition-all duration-300",
                        !isBanner && previewStyles.aspect,
                        previewStyles.rounded
                      )}
                      style={{
                        background: baseColor,
                        aspectRatio: isBanner ? bannerAspect : undefined
                      }}
                    >
                      <div className="absolute inset-3 border border-dashed border-brand-border/40 rounded flex items-center justify-center">
                        {text ? (
                          <p
                            style={{
                              fontFamily,
                              fontSize: `${fontSize * 0.6}px`,
                              color: textColor,
                              fontWeight: bold ? "bold" : "normal",
                              fontStyle: italic ? "italic" : "normal",
                              textAlign: "center",
                              padding: "4px",
                            }}
                          >
                            {text}
                          </p>
                        ) : (
                          <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-wider">No design text</p>
                        )}
                      </div>
                      <div className="absolute bottom-1 right-2 text-[8px] font-black text-brand-muted/75 uppercase tracking-wide">
                        {placement}
                      </div>
                    </div>
                  </div>

                  {/* Summary key-values */}
                  <div className="bg-white rounded-xl border border-brand-border p-5 space-y-3 text-sm shadow-sm">
                    <div className="flex justify-between border-b border-brand-surface pb-2">
                      <span className="text-brand-muted font-semibold">Product Name</span>
                      <span className="font-bold text-brand-black text-right max-w-[150px] truncate">{productName}</span>
                    </div>

                    {subproduct && (
                      <div className="flex justify-between border-b border-brand-surface pb-2">
                        <span className="text-brand-muted font-semibold">Material / Type</span>
                        <span className="font-bold text-brand-black text-right">{subproduct.name}</span>
                      </div>
                    )}

                    {product?.id === "custom-apparel" && (
                      <>
                        <div className="flex justify-between border-b border-brand-surface pb-2">
                          <span className="text-brand-muted font-semibold">Apparel Size</span>
                          <span className="font-bold text-brand-black">{selectedSize}</span>
                        </div>
                        <div className="flex justify-between border-b border-brand-surface pb-2">
                          <span className="text-brand-muted font-semibold">Colorway</span>
                          <span className="font-bold text-brand-black">{selectedColor}</span>
                        </div>
                      </>
                    )}

                    {Object.entries(design.options).map(([key, val]) => {
                      if (key === "bannerDimensions") {
                        return (
                          <div key={key} className="flex justify-between border-b border-brand-surface pb-2">
                            <span className="text-brand-muted font-semibold">Dimensions</span>
                            <span className="font-bold text-brand-black">{val.width}ft &times; {val.height}ft</span>
                          </div>
                        );
                      }
                      const optDef = product?.options?.find(o => o.key === key);
                      const choiceLabel = optDef?.choices?.find(c => c.value === val)?.label || val;
                      return (
                        <div key={key} className="flex justify-between border-b border-brand-surface pb-2">
                          <span className="text-brand-muted font-semibold">{optDef?.name || key}</span>
                          <span className="font-bold text-brand-black text-right">{choiceLabel}</span>
                        </div>
                      );
                    })}

                    <div className="flex justify-between border-b border-brand-surface pb-2">
                      <span className="text-brand-muted font-semibold">Placement Surface</span>
                      <span className="font-bold text-brand-black">{placement}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Batch Quantity & Precise Wholesaler Tiers Calculation */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-bold text-brand-black mb-4 font-serif">Configure Project Quantities</h3>

                <div className="grid md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Tiers Catalogue list */}
                  <div className="md:col-span-6 space-y-4">
                    <p className="text-xs font-black text-brand-black uppercase tracking-wider">Dynamic Wholesaler Volume Catalog</p>
                    
                    <div className="max-h-[220px] overflow-y-auto pr-2 space-y-2">
                      {/* Special layout for the high complexity 20mm polyester lanyard matrix */}
                      {productId === "id-lanyards" && design.variantId === "polyester-lanyard-20mm" ? (
                        <>
                          {[
                            { min: 10, max: 99, prices: { china: 55, overlock: 58, "double-china": 58, "safety-breakaway": 60 } },
                            { min: 100, max: 149, prices: { china: 48, overlock: 51, "double-china": 51, "safety-breakaway": 50 } },
                            { min: 150, max: 199, prices: { china: 44, overlock: 47, "double-china": 47, "safety-breakaway": 46 } },
                            { min: 200, max: 249, prices: { china: 40, overlock: 43, "double-china": 43, "safety-breakaway": 42 } },
                            { min: 250, max: 299, prices: { china: 36, overlock: 39, "double-china": 39, "safety-breakaway": 38 } },
                            { min: 300, max: 399, prices: { china: 32, overlock: 35, "double-china": 35, "safety-breakaway": 34 } },
                            { min: 400, max: 499, prices: { china: 28, overlock: 31, "double-china": 31, "safety-breakaway": 30 } },
                            { min: 500, max: 500, prices: { china: 25, overlock: 28, "double-china": 28, "safety-breakaway": 27 } }
                          ].map((t) => {
                            const isLanyardActive = quantity >= t.min && quantity <= t.max;
                            const hookType = design.options.lanyardHook || "china";
                            const hookPrice = t.prices[hookType as keyof typeof t.prices] || t.prices.china;

                            return (
                              <div
                                key={t.min}
                                className={cn(
                                  "p-3 rounded-xl border text-sm flex justify-between items-center transition-all duration-200",
                                  isLanyardActive ? "border-brand-black bg-brand-surface shadow-md scale-[1.01]" : "border-brand-border bg-white"
                                )}
                              >
                                <span className={cn("font-bold", isLanyardActive ? "text-brand-black" : "text-brand-muted")}>
                                  {t.min}–{t.max} units
                                </span>
                                <span className={cn("font-serif font-black", isLanyardActive ? "text-brand-black" : "text-zinc-600")}>
                                  ₹{hookPrice}/unit
                                </span>
                              </div>
                            );
                          })}
                          <div className="p-3 rounded-xl border border-dashed border-emerald-500 bg-emerald-50/20 text-xs text-emerald-700 font-semibold">
                            Quantities over 500 units will open an email draft for a custom commercial quotation.
                          </div>
                        </>
                      ) : (
                        // Standard tiered rendering
                        (() => {
                          const tiers = subproduct?.priceTiers || product?.priceTiers || [];
                          if (tiers.length === 0) {
                            return (
                              <div className="p-4 rounded-xl border border-dashed border-brand-border text-center text-xs font-semibold text-brand-muted">
                                Pricing is fully custom. Submit details to get a bespoke quote by email.
                              </div>
                            );
                          }
                          return tiers.map((tier) => {
                            const isTierActive = quantity >= tier.min && quantity <= tier.max;
                            return (
                              <div
                                key={tier.min}
                                className={cn(
                                  "p-3 rounded-xl border text-sm flex justify-between items-center transition-all duration-200",
                                  isTierActive ? "border-brand-black bg-brand-surface shadow-md scale-[1.01]" : "border-brand-border bg-white"
                                )}
                              >
                                <span className={cn("font-bold", isTierActive ? "text-brand-black" : "text-brand-muted")}>
                                  {tier.min === tier.max ? `${tier.min}+` : `${tier.min}–${tier.max}`} units
                                </span>
                                <span className={cn("font-serif font-black", isTierActive ? "text-brand-black" : "text-zinc-600")}>
                                  ₹{tier.price}/unit
                                </span>
                              </div>
                            );
                          });
                        })()
                      )}
                    </div>
                  </div>

                  {/* Right Column: Quantity control & estimated totals */}
                  <div className="md:col-span-6 space-y-4">
                    <p className="text-xs font-black text-brand-black uppercase tracking-wider">Set Project Quantity</p>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => design.setQuantity(Math.max(moq, quantity - 1))}
                        disabled={quantity <= moq}
                        className={cn(
                          "h-10 w-10 rounded-lg border flex items-center justify-center font-bold text-xl transition-all cursor-pointer",
                          quantity <= moq ? "border-brand-border text-zinc-300 bg-zinc-50 cursor-not-allowed" : "border-brand-border hover:border-brand-black bg-white hover:bg-brand-surface"
                        )}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min={moq}
                        max={99999}
                        value={quantity}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          design.setQuantity(isNaN(val) ? moq : Math.max(moq, val));
                        }}
                        className="h-10 w-24 text-center rounded-lg border border-brand-border text-sm font-black focus:outline-none focus:ring-2 focus:ring-brand-black bg-white"
                        aria-label="Quantity"
                      />
                      <button
                        onClick={() => design.setQuantity(quantity + 1)}
                        className="h-10 w-10 rounded-lg border border-brand-border flex items-center justify-center hover:border-brand-black bg-white text-xl font-bold transition-all cursor-pointer hover:bg-brand-surface"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Minimum order quantity badge */}
                    <div className="text-xs font-bold text-brand-muted bg-brand-surface px-3 py-1.5 rounded-lg border border-brand-border w-fit">
                      MOQ Requirement: {moq} units
                    </div>

                    {/* Dynamic Pricing totals card */}
                    <div className="bg-white border-2 border-brand-black rounded-xl p-5 text-brand-black shadow-lg relative overflow-hidden">
                      {priceResult.isEmailEnquiry ? (
                        <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase bg-[#22C55E]/10 text-[#16A34A] border border-[#22C55E]/30 px-2 py-0.5 rounded">
                            Email Quote Required
                          </span>
                          <h4 className="font-serif font-black text-xl text-brand-black pt-1">Bespoke Enterprise Order</h4>
                          <p className="text-xs text-brand-muted font-medium">
                            {priceResult.message || "Bulk quantity and/or complex setup requires a direct professional quote."}
                          </p>
                          <div className="pt-2 border-t border-brand-border mt-3 flex justify-between items-center">
                            <span className="text-xs font-bold text-brand-muted">Commercial Pricing</span>
                            <span className="text-md font-serif font-black text-[#16A34A] animate-pulse">Request by Email</span>
                          </div>
                        </div>
                      ) : (
                        <div>
                          {/* Rich Price adjustments details */}
                          {priceResult.breakdown && priceResult.breakdown.adjustments.length > 0 && (
                            <div className="space-y-1 mb-3 pb-3 border-b border-brand-border/60 text-xs font-semibold text-zinc-500">
                              <div className="flex justify-between">
                                <span>Base Batch Rate</span>
                                <span className="font-serif font-bold">₹{priceResult.breakdown.baseRate.toFixed(2)}</span>
                              </div>
                              {priceResult.breakdown.adjustments.map((adj, idx) => (
                                <div key={idx} className="flex justify-between text-brand-accent">
                                  <span>{adj.name}</span>
                                  <span className="font-serif font-bold">{adj.amount >= 0 ? "+" : ""}₹{adj.amount.toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex justify-between items-baseline mb-2">
                            <span className="text-xs font-bold text-brand-muted">Calculated Unit Price</span>
                            <span className="text-lg font-serif font-bold text-brand-black">₹{unitPrice.toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between items-baseline border-t border-brand-border pt-3">
                            <span className="text-xs font-bold text-brand-muted">Estimated Batch Total</span>
                            <div className="text-right">
                              <span className="text-2xl font-serif font-black text-brand-black">₹{totalPrice.toLocaleString("en-IN")}</span>
                              <p className="text-[8px] font-black text-zinc-400 uppercase tracking-wider block mt-0.5">
                                + 18% GST & EXPRESS PAN-INDIA SHIPPING
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-brand-border bg-white">
          <Button
            variant="ghost"
            size="md"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : handleClose()}
            className="cursor-pointer"
          >
            <ChevronLeft size={16} />
            {currentStep > 1 ? "Back" : "Cancel"}
          </Button>

          {currentStep < STEPS.length ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="cursor-pointer bg-brand-black text-white hover:bg-brand-black/90"
            >
              Continue <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              variant={priceResult.isEmailEnquiry ? "accent" : "accent"}
              size="md"
              onClick={handleAddToCart}
              className={cn(
                "cursor-pointer text-white font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all",
                priceResult.isEmailEnquiry
                  ? "bg-[#22C55E] hover:bg-[#16A34A] border-none flex items-center gap-2"
                  : "bg-brand-black hover:bg-brand-black/90"
              )}
            >
              {priceResult.isEmailEnquiry ? (
                <>
                  <Mail size={16} />
                  Enquire by Email
                </>
              ) : (
                <>
                  <Check size={16} /> Add to Cart
                </>
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
