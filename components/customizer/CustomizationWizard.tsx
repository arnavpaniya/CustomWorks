"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Type, ImagePlus, Palette, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDesignStore } from "@/store/design.store";
import { useCartStore } from "@/store/cart.store";

interface Props {
  productId: string;
  productName: string;
  onClose: () => void;
}

const STEPS = [
  { id: 1, label: "Choose Variant" },
  { id: 2, label: "Customize" },
  { id: 3, label: "Preview" },
  { id: 4, label: "Quantity" },
];

const PLACEMENTS = ["Front", "Back", "Left Sleeve", "Right Sleeve"];
const BASE_COLORS = ["#FFFFFF", "#0A0A0A", "#1A237E", "#E53935", "#2E7D32", "#F57C00"];
const FONTS = ["Inter", "Georgia", "Courier New", "Arial Black", "Trebuchet MS"];

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

  const priceTiers = design.priceTiers;
  const unitPrice = design.getUnitPrice();
  const totalPrice = design.getTotalPrice();

  const handleAddToCart = () => {
    cart.addItem({
      productId,
      name: productName,
      image: "/images/placeholder-product.jpg",
      price: unitPrice,
      quantity,
      variant: `${selectedSize} / ${selectedColor}`,
      customSummary: `Placement: ${placement}${text ? `, Text: "${text}"` : ""}`,
    });
    // Reset customize configuration after checkout creation
    design.reset();
    onClose();
  };

  const handleClose = () => {
    design.reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in-50 duration-200"
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
            className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-brand-surface transition-colors"
            aria-label="Close wizard"
          >
            <X size={18} />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 py-3 border-b border-brand-border">
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
                  "text-xs font-medium hidden sm:block",
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
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Choose Variant */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-bold text-brand-black mb-4 font-serif">Choose Size & Color</h3>

                <div className="mb-6">
                  <p className="text-sm font-semibold text-brand-black mb-2">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={cn(
                          "h-10 min-w-10 px-3 rounded-lg border text-sm font-medium transition-all duration-200",
                          selectedSize === s
                            ? "bg-brand-black text-white border-brand-black"
                            : "bg-white text-brand-black border-brand-border hover:border-brand-black",
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-brand-black mb-2">
                    Color: <span className="font-normal text-brand-muted">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries({ White: "#FFFFFF", Black: "#0A0A0A", Navy: "#1A237E", Grey: "#9E9E9E", Red: "#E53935" }).map(([name, hex]) => (
                      <button
                        key={name}
                        onClick={() => setSelectedColor(name)}
                        aria-label={`Select ${name}`}
                        className={cn(
                          "h-9 w-9 rounded-full border-2 transition-all duration-200",
                          selectedColor === name ? "border-brand-black scale-110" : "border-transparent hover:scale-105",
                          name === "White" && "shadow-sm border-zinc-200",
                        )}
                        style={{ background: hex }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Customize */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Canvas preview area */}
                  <div>
                    <p className="text-sm font-semibold text-brand-black mb-3">Live Preview</p>
                    <div
                      className="aspect-square rounded-xl border-2 border-dashed border-brand-border flex items-center justify-center relative overflow-hidden transition-all duration-300"
                      style={{ background: baseColor }}
                    >
                      {/* Placement zone indicator */}
                      <div className="absolute inset-8 border border-dashed border-brand-border/50 rounded-lg flex items-center justify-center">
                        {text ? (
                          <p
                            style={{
                              fontFamily,
                              fontSize: `${fontSize}px`,
                              color: textColor,
                              fontWeight: bold ? "bold" : "normal",
                              fontStyle: italic ? "italic" : "normal",
                              textAlign: "center",
                              wordBreak: "break-word",
                              padding: "8px",
                            }}
                          >
                            {text}
                          </p>
                        ) : (
                          <p className="text-xs text-brand-muted/70 text-center">
                            Your design appears here
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Placement selector */}
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-brand-black mb-2">Placement Zone</p>
                      <div className="flex flex-wrap gap-1.5">
                        {PLACEMENTS.map((p) => (
                          <button
                            key={p}
                            onClick={() => setPlacement(p)}
                            className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-200",
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

                  {/* Design tools */}
                  <div className="space-y-4">
                    {/* Add Text */}
                    <div className="bg-brand-white rounded-xl p-4 border border-brand-border shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Type size={14} className="text-brand-black" />
                        <p className="text-sm font-semibold text-brand-black">Add Monogram/Text</p>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your monogram…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black mb-3"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <p className="text-xs text-brand-muted mb-1">Font Family</p>
                          <select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className="w-full h-8 px-2 rounded-lg border border-brand-border text-xs focus:outline-none focus:ring-1 focus:ring-brand-black bg-white cursor-pointer font-semibold"
                          >
                            {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="text-xs text-brand-muted mb-1">Font Size: {fontSize}px</p>
                          <input
                            type="range"
                            min={12}
                            max={72}
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full accent-black cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-xs text-brand-muted mb-1">Text Color</p>
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="h-8 w-12 rounded cursor-pointer border border-brand-border p-0.5 bg-white"
                            aria-label="Text color"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setBold(!bold)}
                            className={cn("h-8 w-8 rounded font-bold text-sm border transition-all duration-200", bold ? "bg-brand-black text-white border-brand-black" : "border-brand-border hover:border-brand-black")}
                          >B</button>
                          <button
                            onClick={() => setItalic(!italic)}
                            className={cn("h-8 w-8 rounded italic text-sm border transition-all duration-200", italic ? "bg-brand-black text-white border-brand-black" : "border-brand-border hover:border-brand-black")}
                          >I</button>
                        </div>
                      </div>
                    </div>

                    {/* Upload Image */}
                    <div className="bg-brand-white rounded-xl p-4 border border-brand-border shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <ImagePlus size={14} className="text-brand-black" />
                        <p className="text-sm font-semibold text-brand-black">Upload Vector Art/Logo</p>
                      </div>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-brand-border rounded-xl cursor-pointer hover:border-black transition-colors duration-200">
                        <input type="file" className="sr-only" accept="image/*" aria-label="Upload image" />
                        <ImagePlus size={20} className="text-brand-muted/70 mb-1 animate-pulse" />
                        <p className="text-xs text-brand-muted/70">JPG, PNG, SVG · Max 10MB</p>
                      </label>
                    </div>

                    {/* Base Color */}
                    <div className="bg-brand-white rounded-xl p-4 border border-brand-border shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Palette size={14} className="text-brand-black" />
                        <p className="text-sm font-semibold text-brand-black">Base Canvas Fill</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {BASE_COLORS.map((c) => (
                          <button
                            key={c}
                            onClick={() => setBaseColor(c)}
                            aria-label={`Set base color to ${c}`}
                            className={cn(
                              "h-7 w-7 rounded-full border-2 transition-all duration-200",
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

            {/* Step 3: Preview */}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-bold text-brand-black mb-4 font-serif">Confirm Your Design Specifications</h3>

                <div className="flex flex-col items-center">
                  <div
                    className="w-64 h-64 rounded-2xl border border-brand-border flex items-center justify-center mb-6 relative shadow-md transition-all duration-300"
                    style={{ background: baseColor }}
                  >
                    <div className="absolute inset-6 border border-dashed border-brand-border/50 rounded-lg flex items-center justify-center">
                      {text ? (
                        <p
                          style={{
                            fontFamily,
                            fontSize: `${fontSize * 0.7}px`,
                            color: textColor,
                            fontWeight: bold ? "bold" : "normal",
                            fontStyle: italic ? "italic" : "normal",
                            textAlign: "center",
                            padding: "8px",
                          }}
                        >
                          {text}
                        </p>
                      ) : (
                        <p className="text-xs text-brand-muted/70 font-semibold">No design added</p>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-3 text-[10px] font-bold tracking-wider text-brand-muted/75 uppercase">
                      {placement}
                    </div>
                  </div>

                  {/* Design summary */}
                  <div className="w-full max-w-sm bg-brand-white rounded-xl border border-brand-border p-4 space-y-2 text-sm shadow-sm font-semibold">
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Apparel Size</span>
                      <span className="font-bold text-brand-black">{selectedSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Colorway</span>
                      <span className="font-bold text-brand-black">{selectedColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Placement Zone</span>
                      <span className="font-bold text-brand-black">{placement}</span>
                    </div>
                    {text && (
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Custom Monogram</span>
                        <span className="font-bold text-brand-black truncate max-w-[150px]">&ldquo;{text}&rdquo;</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Quantity & Tiered Pricing */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-bold text-brand-black mb-4 font-serif">Enter Project Batch Quantity</h3>

                {/* Quantity input */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-lg border border-brand-border flex items-center justify-center hover:border-brand-black text-xl font-bold transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(999, Number(e.target.value))))}
                    className="h-10 w-20 text-center rounded-lg border border-brand-border text-sm font-black focus:outline-none focus:ring-2 focus:ring-brand-black"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(999, quantity + 1))}
                    className="h-10 w-10 rounded-lg border border-brand-border flex items-center justify-center hover:border-brand-black text-xl font-bold transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Bulk pricing table */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-brand-black mb-3">Wholesale Tiers Catalog</p>
                  <div className="grid grid-cols-2 gap-2">
                    {priceTiers.map((tier) => {
                      const active = quantity >= tier.min && quantity <= tier.max;
                      return (
                        <div
                          key={tier.min}
                          className={cn(
                            "p-3 rounded-xl border text-sm transition-all duration-200",
                            active ? "border-brand-black bg-brand-surface shadow-md" : "border-brand-border bg-white",
                          )}
                        >
                          <p className={cn("font-bold", active ? "text-brand-black" : "text-brand-muted")}>
                            {tier.min === tier.max ? `${tier.min}+` : `${tier.min}–${tier.max}`} items
                          </p>
                          <p className="text-xs text-brand-muted">₹{tier.price}/unit</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-white border border-brand-border rounded-xl p-5 text-brand-black shadow-lg">
                  <div className="flex justify-between text-sm mb-1 font-semibold">
                    <span className="text-brand-muted">{quantity} units &times; ₹{unitPrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold text-brand-muted">Estimated Batch Total</span>
                    <span className="text-3xl font-black text-brand-black">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">+ 18% GST & PAN-India Express Shipping</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer nav */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-brand-border">
          <Button
            variant="ghost"
            size="md"
            onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : handleClose()}
          >
            <ChevronLeft size={16} />
            {currentStep > 1 ? "Back" : "Cancel"}
          </Button>

          {currentStep < STEPS.length ? (
            <Button variant="primary" size="md" onClick={() => setCurrentStep(currentStep + 1)}>
              Continue <ChevronRight size={16} />
            </Button>
          ) : (
            <Button variant="accent" size="md" onClick={handleAddToCart}>
              <Check size={16} /> Add to Cart
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
