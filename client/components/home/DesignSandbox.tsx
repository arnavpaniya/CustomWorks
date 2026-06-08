"use client";

import { useState } from "react";
import { ArrowRight, Check, Sparkles, Shirt, Paintbrush, Layers, Type, Sliders, Coffee, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDesignStore } from "@/store/design.store";
import QuoteSubmissionForm from "@/components/customizer/QuoteSubmissionForm";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  { id: "tshirt", name: "Premium T-Shirt", icon: Shirt, description: "100% organic combed cotton, robust seams." },
  { id: "mug", name: "Ceramic Mug", icon: Coffee, description: "High-gloss minimal ceramic, microwave safe." },
  { id: "card", name: "Luxury Metal Card", icon: CreditCard, description: "Matte finish premium stainless steel, laser engraved." },
];

const COLORS = [
  { name: "Ivory Cream", hex: "#F4F3EF", textColor: "text-zinc-900", isDark: false },
  { name: "Midnight Onyx", hex: "#121213", textColor: "text-white", isDark: true },
  { name: "Sage Olive", hex: "#4E564E", textColor: "text-emerald-50", isDark: true },
  { name: "Clay Terracotta", hex: "#D66249", textColor: "text-orange-50", isDark: true },
];

const STAMPS = [
  { id: "none", name: "Clean Blank", element: null },
  { 
    id: "laurel", 
    name: "Royal Laurel", 
    element: (
      <svg viewBox="0 0 100 100" className="w-14 h-14 opacity-75">
        <path 
          d="M 50 10 C 20 20, 20 80, 50 90 C 80 80, 80 20, 50 10 Z" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeDasharray="4 2"
        />
        <path d="M 35 40 Q 50 45 65 40 M 35 55 Q 50 60 65 55 M 35 70 Q 50 75 65 70" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="28" r="4" fill="currentColor" />
      </svg>
    ) 
  },
  { 
    id: "starburst", 
    name: "Sunburst Spark", 
    element: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 opacity-75">
        <path d="M 50 15 L 50 85 M 15 50 L 85 50 M 25 25 L 75 75 M 25 75 L 75 25" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    ) 
  },
  { 
    id: "rose", 
    name: "Vintage Rose", 
    element: (
      <svg viewBox="0 0 100 100" className="w-12 h-12 opacity-75">
        <circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 50 10 L 50 34 M 50 66 L 50 90 M 10 50 L 34 50 M 66 50 L 90 50" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ) 
  }
];
const CONTACT_EMAIL = "orders.customworks@gmail.com";

export default function DesignSandbox() {
  const design = useDesignStore();
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [customText, setCustomText] = useState("CW");
  const [fontStyle, setFontStyle] = useState("serif"); // "serif" | "sans"
  const [textColor, setTextColor] = useState("#C5A880"); // Gold by default
  const [selectedStamp, setSelectedStamp] = useState(STAMPS[1]); // Laurel by default
  const [ordered, setOrdered] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      // Create message for email custom inquiry
      const message = `Hi! I created a customized design on the CustomWorks landing page playground:\n- Product: ${selectedProduct.name}\n- Color: ${selectedColor.name}\n- Initials: ${customText}\n- Font: ${fontStyle === "serif" ? "Elegant Serif" : "Modern Sans"}\n- Stamp: ${selectedStamp.name}`;
      const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Custom design inquiry")}&body=${encodeURIComponent(message)}`;
      window.location.href = url;
      setOrdered(false);
    }, 1200);
  };

  const handleOpenAdvanced = () => {
    // Populate store design elements from sandbox configurations
    design.setProduct(selectedProduct.id);
    design.setText(customText);
    design.setFontFamily(fontStyle === "serif" ? "Georgia" : "Inter");
    design.setTextColor(textColor);
    design.setSelectedColor(selectedColor.name === "Ivory Cream" ? "White" : selectedColor.name === "Midnight Onyx" ? "Black" : "Grey");
    design.setBaseColor(selectedColor.hex);
    design.setStep(2); // Jump straight to customize step
    setShowWizard(true);
  };

  return (
    <section className="py-24 bg-zinc-50 border-t border-brand-border/40 relative overflow-hidden" aria-labelledby="sandbox-heading">
      <div className="absolute inset-0 bg-radial-to-t from-zinc-100 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 bg-brand-orange/5 border border-brand-orange/10 px-3.5 py-1.5 rounded-full select-none">
            <Sparkles size={13} className="text-brand-orange animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-orange">
              Live Customizer Sandbox
            </span>
          </div>
          <h2 id="sandbox-heading" className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-brand-black mb-6 tracking-tight">
            Design Your Own <span className="italic font-normal">Masterpiece</span>
          </h2>
          <p className="text-brand-muted text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
            Interact with our premium mock sandbox below. Choose your product type, pick your custom colorway, personalize with your monogram initials, and preview high-fidelity mockups.
          </p>
        </div>

        {/* Split Grid Sandbox */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* Column 1: Live Mockup Preview Canvas */}
          <div className="lg:col-span-7 bg-white border border-brand-border/60 rounded-3xl p-6 sm:p-12 flex flex-col items-center justify-center relative shadow-sm overflow-hidden min-h-[460px] md:min-h-[500px]">
            {/* Top Tag badge overlay */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 text-[10px] font-black text-brand-muted uppercase bg-zinc-100 border border-zinc-200/60 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Live Interactive Preview
            </div>

            {/* High-Fidelity Vector Custom Canvas Product Shape */}
            <div className="relative w-full max-w-[280px] md:max-w-[340px] flex items-center justify-center transition-all duration-550 ease-out transform hover:scale-[1.02]">
              {selectedProduct.id === "tshirt" && (
                <svg 
                  viewBox="0 0 400 450" 
                  className="w-full h-full drop-shadow-2xl transition-colors duration-550 ease-out"
                  style={{ fill: selectedColor.hex }}
                >
                  {/* SVG Crewneck T-Shirt Silhouette */}
                  <path 
                    d="M 80 50 
                       L 130 30 
                       Q 160 55, 200 55
                       Q 240 55, 270 30
                       L 320 50 
                       L 380 140 
                       L 325 175 
                       L 305 160 
                       L 305 425 
                       C 305 435, 95 435, 95 425 
                       L 95 160 
                       L 75 175 
                       L 20 140 Z" 
                    stroke="#E4E4E7"
                    strokeWidth="0.5"
                  />
                  
                  {/* Crewneck fold collar detail */}
                  <path 
                    d="M 130 30 Q 160 55, 200 55 Q 240 55, 270 30 Q 200 65, 130 30" 
                    fill="#000000" 
                    opacity="0.06" 
                  />

                  {/* Left & Right inner sleeves hem line details */}
                  <path d="M 75 175 L 20 140" stroke="#000000" opacity="0.05" strokeWidth="2" />
                  <path d="M 325 175 L 380 140" stroke="#000000" opacity="0.05" strokeWidth="2" />

                  {/* Soft natural fabric gradient shadow overlay for realistic folding */}
                  <path 
                    d="M 95 160 L 95 425 L 305 425 L 305 160 Z" 
                    fill="url(#fabric-shadow)" 
                    style={{ mixBlendMode: "multiply" }}
                  />

                  <defs>
                    <linearGradient id="fabric-shadow" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="40%" stopColor="#000000" stopOpacity="0.015" />
                      <stop offset="70%" stopColor="#000000" stopOpacity="0.03" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.06" />
                    </linearGradient>
                  </defs>
                </svg>
              )}

              {selectedProduct.id === "mug" && (
                <svg 
                  viewBox="0 0 400 450" 
                  className="w-full h-full drop-shadow-2xl transition-colors duration-550 ease-out"
                  style={{ fill: selectedColor.hex }}
                >
                  {/* Mug Handle */}
                  <path 
                    d="M 285 130 C 375 130, 375 320, 285 320" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="28" 
                    strokeLinecap="round" 
                    className="text-zinc-200/50"
                  />
                  <path 
                    d="M 285 130 C 375 130, 375 320, 285 320" 
                    fill="none" 
                    stroke={selectedColor.hex} 
                    strokeWidth="20" 
                    strokeLinecap="round" 
                  />

                  {/* Main Mug Body */}
                  <rect 
                    x="100" 
                    y="70" 
                    width="190" 
                    height="290" 
                    rx="24" 
                    stroke="#E4E4E7"
                    strokeWidth="0.5"
                  />

                  {/* Rim Shadow Highlight */}
                  <ellipse cx="195" cy="70" rx="95" ry="18" fill="#000000" opacity="0.08" />

                  {/* Gradient shadow for realistic cylindrical curvature */}
                  <rect 
                    x="100" 
                    y="70" 
                    width="190" 
                    height="290" 
                    rx="24" 
                    fill="url(#cylindrical-shading)" 
                    style={{ mixBlendMode: "multiply" }}
                  />

                  <defs>
                    <linearGradient id="cylindrical-shading" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#000000" stopOpacity="0.3" />
                      <stop offset="25%" stopColor="#ffffff" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="75%" stopColor="#000000" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
                    </linearGradient>
                  </defs>
                </svg>
              )}

              {selectedProduct.id === "card" && (
                <svg 
                  viewBox="0 0 400 450" 
                  className="w-full h-full drop-shadow-2xl transition-colors duration-550 ease-out"
                  style={{ fill: selectedColor.hex }}
                >
                  {/* Outer Sleek Rounded Card Rect */}
                  <rect 
                    x="20" 
                    y="100" 
                    width="360" 
                    height="250" 
                    rx="20" 
                    stroke="#E4E4E7"
                    strokeWidth="0.5"
                  />

                  {/* Minimalistic border inset */}
                  <rect 
                    x="36" 
                    y="116" 
                    width="328" 
                    height="218" 
                    rx="14" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    opacity="0.15"
                  />

                  {/* Metallic Gloss Shading overlay */}
                  <rect 
                    x="20" 
                    y="100" 
                    width="360" 
                    height="250" 
                    rx="20" 
                    fill="url(#card-metallic)" 
                    style={{ mixBlendMode: "overlay" }}
                  />

                  <defs>
                    <linearGradient id="card-metallic" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                      <stop offset="35%" stopColor="#ffffff" stopOpacity="0" />
                      <stop offset="65%" stopColor="#000000" stopOpacity="0" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              )}

              {/* LIVE CUSTOM PRINT CONTAINER (Overlay on T-Shirt Chest or Card/Mug Center) */}
              <div 
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10",
                  selectedProduct.id === "tshirt" && "mt-[-15px]",
                  selectedProduct.id === "mug" && "mt-[20px] ml-[-5px]",
                  selectedProduct.id === "card" && "mt-[10px]"
                )}
                style={{ 
                  color: textColor,
                }}
              >
                {/* Chosen Stamp Element */}
                {selectedStamp.element && (
                  <div className="mb-2 transition-transform duration-350 scale-100">
                    {selectedStamp.element}
                  </div>
                )}

                {/* Custom Monogram Text */}
                {customText && (
                  <div 
                    className={`transition-all duration-350 tracking-widest text-center select-none font-bold uppercase ${
                      fontStyle === "serif" 
                        ? "font-serif text-xl sm:text-2xl italic tracking-wider" 
                        : "font-sans text-lg sm:text-xl tracking-widest"
                    }`}
                  >
                    {customText}
                  </div>
                )}
              </div>
            </div>
            
            {/* Live mockup product description tag */}
            <p className="mt-8 text-brand-muted text-xs font-semibold flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/50 px-4 py-1.5 rounded-full shadow-2xs">
              <span>Selected Base: {selectedProduct.name}</span>
            </p>
          </div>

          {/* Column 2: Sandbox Customizer Control Deck */}
          <div className="lg:col-span-5 bg-white border border-brand-border/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            
            <div className="space-y-6">
              {/* Header inside control deck */}
              <div className="border-b border-brand-border/40 pb-4">
                <span className="text-brand-muted text-[10px] font-black uppercase tracking-wider block mb-1">Interactive Sandbox Deck</span>
                <h3 className="font-serif text-lg font-light text-brand-black">Configure Your Masterpiece</h3>
              </div>

              {/* 0. Picker: Product Type */}
              <div>
                <label className="text-brand-black text-xs font-black uppercase tracking-widest mb-3.5 flex items-center gap-2">
                  <Sparkles size={14} className="text-brand-orange" />
                  1. Product Canvas
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRODUCTS.map((prod) => {
                    const isSelected = selectedProduct.id === prod.id;
                    const Icon = prod.icon;
                    return (
                      <button
                        key={prod.id}
                        onClick={() => setSelectedProduct(prod)}
                        className={cn(
                          "px-2 py-3 rounded-2xl border text-xs font-bold transition-all duration-200 text-center flex flex-col items-center gap-2 cursor-pointer shadow-3xs",
                          isSelected 
                            ? "border-brand-orange bg-brand-orange/5 text-brand-black" 
                            : "border-brand-border bg-white text-zinc-600 hover:border-zinc-400"
                        )}
                      >
                        <Icon size={16} className={isSelected ? "text-brand-orange" : "text-zinc-400"} />
                        <span className="text-[10px] truncate w-full">{prod.name}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-brand-muted mt-2 font-medium leading-normal italic">
                  {selectedProduct.description}
                </p>
              </div>

              {/* 1. Picker: Fabric / Core Colorway */}
              <div>
                <label className="text-brand-black text-xs font-black uppercase tracking-widest mb-3.5 flex items-center gap-2">
                  <Shirt size={14} className="text-brand-orange" />
                  2. Dynamic Colorway
                </label>
                <div className="relative">
                  <select
                    value={selectedColor.name}
                    onChange={(e) => {
                      const color = COLORS.find(c => c.name === e.target.value);
                      if (color) setSelectedColor(color);
                    }}
                    className="w-full appearance-none px-4 py-3 pr-10 bg-zinc-50 border border-brand-border rounded-xl text-brand-black text-sm font-semibold focus:outline-hidden focus:border-brand-orange shadow-2xs cursor-pointer"
                  >
                    {COLORS.map((color) => (
                      <option key={color.name} value={color.name}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <div 
                      className="w-5 h-5 rounded-full border border-zinc-300 shadow-xs"
                      style={{ backgroundColor: selectedColor.hex }}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Picker: Custom Branding Monogram Text */}
              <div>
                <label className="text-brand-black text-xs font-black uppercase tracking-widest mb-3.5 flex items-center gap-2">
                  <Type size={14} className="text-brand-orange" />
                  3. Personalized Monogram
                </label>
                <div className="flex gap-2.5">
                  <input
                    type="text"
                    maxLength={10}
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter initials..."
                    className="flex-1 px-4 py-2.5 bg-zinc-50 border border-brand-border rounded-xl text-brand-black placeholder-zinc-400 focus:outline-hidden focus:border-brand-orange text-sm font-semibold transition-all shadow-2xs"
                  />
                  
                  {/* Font Style Select Button toggle */}
                  <button
                    onClick={() => setFontStyle(f => f === "serif" ? "sans" : "serif")}
                    aria-label="Toggle font typography style"
                    className="px-4 py-2.5 border border-brand-border/80 hover:border-brand-black rounded-xl text-brand-black text-xs font-black tracking-widest uppercase transition-all duration-300 shadow-2xs bg-white cursor-pointer"
                  >
                    {fontStyle === "serif" ? "Elegant Serif" : "Modern Sans"}
                  </button>
                </div>
              </div>

              {/* 3. Picker: Monogram Thread Color */}
              <div>
                <label className="text-brand-black text-xs font-black uppercase tracking-widest mb-3.5 flex items-center gap-2">
                  <Paintbrush size={14} className="text-brand-orange" />
                  4. Design Thread / Laser Fill
                </label>
                <div className="relative">
                  <select
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-full appearance-none px-4 py-3 pr-10 bg-zinc-50 border border-brand-border rounded-xl text-brand-black text-sm font-semibold focus:outline-hidden focus:border-brand-orange shadow-2xs cursor-pointer"
                  >
                    {[
                      { name: "Luxury Gold", hex: "#C5A880" },
                      { name: "Onyx Black", hex: "#18181B" },
                      { name: "White Satin", hex: "#FFFFFF" },
                      { name: "Crimson Red", hex: "#DC2626" },
                    ].map((thread) => (
                      <option key={thread.hex} value={thread.hex}>
                        {thread.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <div 
                      className="w-5 h-5 rounded-full border border-zinc-300 shadow-xs"
                      style={{ backgroundColor: textColor }}
                    />
                  </div>
                </div>
              </div>

              {/* 4. Picker: Design Emblem Stamps */}
              <div>
                <label className="text-brand-black text-xs font-black uppercase tracking-widest mb-3.5 flex items-center gap-2">
                  <Layers size={14} className="text-brand-orange" />
                  5. Design Emblem Stamp
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {STAMPS.map((stamp) => {
                    const isSelected = selectedStamp.id === stamp.id;
                    return (
                      <button
                        key={stamp.id}
                        onClick={() => setSelectedStamp(stamp)}
                        className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all duration-300 text-left cursor-pointer flex items-center justify-between shadow-2xs ${
                          isSelected 
                            ? "border-brand-orange bg-brand-orange/5 text-brand-black" 
                            : "border-brand-border bg-white text-zinc-600 hover:border-zinc-400"
                        }`}
                      >
                        <span>{stamp.name}</span>
                        {isSelected && <Check size={12} className="text-brand-orange stroke-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA Order Button Action Container */}
            <div className="mt-8 pt-6 border-t border-brand-border/40 space-y-3">
              <Button
                onClick={handleOpenAdvanced}
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center gap-2 font-black tracking-widest uppercase transition-all duration-300 group shadow-md"
              >
                <Sliders size={16} className="group-hover:rotate-12 transition-transform" />
                Customize in Advanced Wizard
              </Button>

              <Button 
                onClick={handleOrder}
                disabled={ordered}
                variant="accent" 
                size="lg" 
                className="w-full flex items-center justify-center gap-2 font-black tracking-widest uppercase transition-all duration-300 group"
              >
                {ordered ? (
                  <>
                    <Check size={16} className="animate-bounce" />
                    Customizing Order Proposal...
                  </>
                ) : (
                  <>
                    Order My Custom Piece
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              <p className="text-[10px] text-brand-muted text-center leading-relaxed font-semibold">
                Pre-order connects you to our custom merch specialists to confirm sizes and engraving/embroidery details.
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Advanced Customizer modal render */}
      {showWizard && (
        <QuoteSubmissionForm
          productId={selectedProduct.id}
          productName={`Premium Customized ${selectedProduct.name}`}
          onClose={() => setShowWizard(false)}
        />
      )}
    </section>
  );
}
