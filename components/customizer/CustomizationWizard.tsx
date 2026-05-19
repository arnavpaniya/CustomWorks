"use client";

import { useState } from "react";
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

  const [currentStep, setCurrentStep] = useState(1);
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("#0A0A0A");
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [placement, setPlacement] = useState("Front");
  const [baseColor, setBaseColor] = useState("#FFFFFF");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("White");

  const priceTiers = [
    { min: 1, max: 4, price: 499 },
    { min: 5, max: 9, price: 449 },
    { min: 10, max: 49, price: 399 },
    { min: 50, max: 999, price: 349 },
  ];

  const unitPrice = priceTiers.find((t) => quantity >= t.min && quantity <= t.max)?.price ?? 499;
  const totalPrice = unitPrice * quantity;

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
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Product customization wizard"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
          <div>
            <h2 className="font-black text-lg text-brand-black">Customize {productName}</h2>
            <p className="text-xs text-brand-muted">Step {currentStep} of {STEPS.length}</p>
          </div>
          <button
            onClick={onClose}
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
                <h3 className="font-bold text-brand-black mb-4">Choose Size & Color</h3>

                <div className="mb-6">
                  <p className="text-sm font-medium text-brand-black mb-2">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={cn(
                          "h-10 min-w-10 px-3 rounded-lg border text-sm font-medium transition-all",
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
                  <p className="text-sm font-medium text-brand-black mb-2">
                    Color: <span className="font-normal text-brand-muted">{selectedColor}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries({ White: "#FFFFFF", Black: "#0A0A0A", Navy: "#1A237E", Grey: "#9E9E9E", Red: "#E53935" }).map(([name, hex]) => (
                      <button
                        key={name}
                        onClick={() => setSelectedColor(name)}
                        aria-label={`Select ${name}`}
                        className={cn(
                          "h-9 w-9 rounded-full border-2 transition-all",
                          selectedColor === name ? "border-brand-black scale-110" : "border-transparent hover:scale-105",
                          name === "White" && "shadow-sm",
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
                    <p className="text-sm font-medium text-brand-black mb-3">Live Preview</p>
                    <div
                      className="aspect-square rounded-xl border-2 border-dashed border-brand-border flex items-center justify-center relative overflow-hidden"
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
                      <p className="text-xs font-medium text-brand-black mb-2">Placement Zone</p>
                      <div className="flex flex-wrap gap-1.5">
                        {PLACEMENTS.map((p) => (
                          <button
                            key={p}
                            onClick={() => setPlacement(p)}
                            className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-medium border transition-all",
                              placement === p
                                ? "bg-brand-black text-white border-brand-black"
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
                    <div className="bg-brand-white rounded-xl p-4 border border-brand-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Type size={14} className="text-brand-black" />
                        <p className="text-sm font-semibold text-brand-black">Add Text</p>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your text…"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-9 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black mb-3"
                      />
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <p className="text-xs text-brand-muted mb-1">Font</p>
                          <select
                            value={fontFamily}
                            onChange={(e) => setFontFamily(e.target.value)}
                            className="w-full h-8 px-2 rounded-lg border border-brand-border text-xs focus:outline-none focus:ring-1 focus:ring-brand-black"
                          >
                            {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
                          </select>
                        </div>
                        <div>
                          <p className="text-xs text-brand-muted mb-1">Size: {fontSize}px</p>
                          <input
                            type="range"
                            min={12}
                            max={72}
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            className="w-full accent-black"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="text-xs text-brand-muted mb-1">Color</p>
                          <input
                            type="color"
                            value={textColor}
                            onChange={(e) => setTextColor(e.target.value)}
                            className="h-8 w-12 rounded cursor-pointer border border-brand-border"
                            aria-label="Text color"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setBold(!bold)}
                            className={cn("h-8 w-8 rounded font-bold text-sm border transition-all", bold ? "bg-brand-black text-white border-brand-black" : "border-brand-border hover:border-brand-black")}
                          >B</button>
                          <button
                            onClick={() => setItalic(!italic)}
                            className={cn("h-8 w-8 rounded italic text-sm border transition-all", italic ? "bg-brand-black text-white border-brand-black" : "border-brand-border hover:border-brand-black")}
                          >I</button>
                        </div>
                      </div>
                    </div>

                    {/* Upload Image */}
                    <div className="bg-brand-white rounded-xl p-4 border border-brand-border">
                      <div className="flex items-center gap-2 mb-3">
                        <ImagePlus size={14} className="text-brand-black" />
                        <p className="text-sm font-semibold text-brand-black">Upload Image/Logo</p>
                      </div>
                      <label className="flex flex-col items-center justify-center h-20 border-2 border-dashed border-brand-border rounded-xl cursor-pointer hover:border-black transition-colors">
                        <input type="file" className="sr-only" accept="image/*" aria-label="Upload image" />
                        <ImagePlus size={20} className="text-brand-muted/70 mb-1" />
                        <p className="text-xs text-brand-muted/70">JPG, PNG, SVG · Max 10MB</p>
                      </label>
                    </div>

                    {/* Base Color */}
                    <div className="bg-brand-white rounded-xl p-4 border border-brand-border">
                      <div className="flex items-center gap-2 mb-3">
                        <Palette size={14} className="text-brand-black" />
                        <p className="text-sm font-semibold text-brand-black">Product Color Fill</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {BASE_COLORS.map((c) => (
                          <button
                            key={c}
                            onClick={() => setBaseColor(c)}
                            aria-label={`Set base color to ${c}`}
                            className={cn(
                              "h-7 w-7 rounded-full border-2 transition-all",
                              baseColor === c ? "border-brand-black scale-110" : "border-transparent hover:scale-105",
                              c === "#FFFFFF" && "shadow-sm",
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
                <h3 className="font-bold text-brand-black mb-4">Preview Your Design</h3>

                <div className="flex flex-col items-center">
                  <div
                    className="w-64 h-64 rounded-2xl border border-brand-border flex items-center justify-center mb-6 relative"
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
                        <p className="text-xs text-brand-muted/70">No design added</p>
                      )}
                    </div>
                    <div className="absolute bottom-2 right-2 text-[10px] text-brand-muted/70">
                      {placement}
                    </div>
                  </div>

                  {/* Design summary */}
                  <div className="w-full max-w-sm bg-brand-white rounded-xl border border-brand-border p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Size</span>
                      <span className="font-medium">{selectedSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Color</span>
                      <span className="font-medium">{selectedColor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Placement</span>
                      <span className="font-medium">{placement}</span>
                    </div>
                    {text && (
                      <div className="flex justify-between">
                        <span className="text-brand-muted">Custom text</span>
                        <span className="font-medium truncate max-w-32">&ldquo;{text}&rdquo;</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Quantity & Price */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h3 className="font-bold text-brand-black mb-4">Choose Quantity</h3>

                {/* Quantity input */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
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
                    className="h-10 w-20 text-center rounded-lg border border-brand-border text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-black"
                    aria-label="Quantity"
                  />
                  <button
                    onClick={() => setQuantity((q) => Math.min(999, q + 1))}
                    className="h-10 w-10 rounded-lg border border-brand-border flex items-center justify-center hover:border-brand-black text-xl font-bold transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Bulk pricing table */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-brand-black mb-3">Bulk Pricing</p>
                  <div className="grid grid-cols-2 gap-2">
                    {priceTiers.map((tier) => {
                      const active = quantity >= tier.min && quantity <= tier.max;
                      return (
                        <div
                          key={tier.min}
                          className={cn(
                            "p-3 rounded-xl border text-sm transition-all",
                            active ? "border-black bg-brand-surface shadow-sm" : "border-brand-border bg-white",
                          )}
                        >
                          <p className={cn("font-semibold", active ? "text-black" : "text-brand-black")}>
                            {tier.min === tier.max ? `${tier.min}+` : `${tier.min}–${tier.max}`} pieces
                          </p>
                          <p className="text-brand-muted">₹{tier.price}/piece</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Total */}
                <div className="bg-white border border-brand-border rounded-xl p-5 text-brand-black shadow-md">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-brand-muted">{quantity} × ₹{unitPrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-medium text-brand-muted">Total</span>
                    <span className="text-3xl font-black text-brand-black">₹{totalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  <p className="text-xs text-[#9A9A9A] mt-1">+ 18% GST + Shipping</p>
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
            onClick={() => currentStep > 1 ? setCurrentStep(s => s - 1) : onClose()}
          >
            <ChevronLeft size={16} />
            {currentStep > 1 ? "Back" : "Cancel"}
          </Button>

          {currentStep < STEPS.length ? (
            <Button variant="primary" size="md" onClick={() => setCurrentStep(s => s + 1)}>
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
