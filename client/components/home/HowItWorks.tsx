"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MousePointerClick, Palette, Package, Check, Hammer } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="relative bg-[#FAF6F0] overflow-hidden" aria-labelledby="story-heading">
      
      {/* Header Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center select-none z-10 relative">
        <span className="text-[10px] font-black uppercase tracking-widest text-narrative-clay bg-narrative-clay/5 border border-narrative-clay/20 px-3.5 py-1.5 rounded-full">
          The Lifecycle of an Object
        </span>
        <h2 id="story-heading" className="text-4xl sm:text-5xl font-serif font-light text-narrative-forest mt-6 tracking-tight">
          How We Bring Ideas to <span className="italic font-normal text-narrative-clay">Life</span>
        </h2>
        <p className="text-sm text-narrative-forest/70 mt-3 max-w-md mx-auto leading-relaxed font-medium">
          From digital design to factory fabrication to doorstep arrival—here is the step-by-step story of your customized items.
        </p>
      </div>

      {/* Storyline Vertical Stages */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 z-10 relative flex flex-col gap-12">
        
        {/* Stage 1: Design Studio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 bg-narrative-sage/10 border border-narrative-sage/20 rounded-[2.5rem] overflow-hidden"
        >
          {/* Left Block: Narrative */}
          <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-[9px] font-mono font-bold text-narrative-sage uppercase tracking-wider block mb-4">
                [ STAGE 01 / CANVAS ]
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-narrative-forest mb-4">
                Configure & <span className="italic font-normal text-narrative-sage">Customize</span>
              </h3>
              <p className="text-sm text-narrative-forest/80 leading-relaxed font-medium">
                Browse our extensive catalog of blank items—from hoodies to visiting cards to branded standees. Upload your artwork, set exact dimensions, and adjust live options inside our sandbox customizer.
              </p>
            </div>
            
            {/* Features checkmarks */}
            <div className="flex flex-col gap-2 mt-8">
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Check size={14} className="text-narrative-sage stroke-[3]" />
                <span>Live browser-based design studio</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Check size={14} className="text-narrative-sage stroke-[3]" />
                <span>Precise layout boundaries & guides</span>
              </div>
            </div>
          </div>

          {/* Right Block: Visual Mock Workstation */}
          <div className="lg:col-span-6 bg-[#E9EFEF]/60 border-t lg:border-t-0 lg:border-l border-narrative-sage/20 p-8 flex items-center justify-center min-h-[300px]">
            <div className="w-full max-w-sm border border-narrative-sage/20 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg relative overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-narrative-sage/10 pb-3 mb-4 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[9px] font-mono text-narrative-sage font-bold tracking-wider">CANVAS_STUDIO_V2</span>
              </div>
              
              {/* Workspace Area */}
              <div className="h-36 relative overflow-hidden rounded-xl border border-narrative-sage/25 shadow-sm bg-zinc-50 group">
                <Image
                  src="/images/design_workspace.jpg"
                  alt="Design studio workspace"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  sizes="350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-3.5">
                  <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">
                    Active Canvas
                  </span>
                  <span className="text-[8px] font-mono text-zinc-300 mt-0.5">
                    LIVE DESIGN SANDBOX
                  </span>
                </div>
              </div>

              {/* Design Controls Overlay/Footer */}
              <div className="mt-4 pt-3 border-t border-narrative-sage/10 flex items-center justify-between text-[9px] font-mono text-narrative-forest/70">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Connected</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>Zoom: 100%</span>
                  <span>Grid: On</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stage 2: Industrial Press */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 bg-narrative-clay/10 border border-narrative-clay/20 rounded-[2.5rem] overflow-hidden"
        >
          {/* Right Block: Visual Factory Console (placed left on layout for alternating style) */}
          <div className="lg:col-span-6 bg-[#F6ECE9]/60 border-b lg:border-b-0 lg:border-r border-narrative-clay/20 p-8 flex items-center justify-center min-h-[300px] order-2 lg:order-1">
            <div className="w-full max-w-sm border border-narrative-clay/20 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg relative overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-narrative-clay/10 pb-3 mb-4 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[9px] font-mono text-narrative-clay font-bold tracking-wider">FACTORY_LINE_A</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-narrative-forest/80 border-b border-narrative-clay/10 pb-2">
                  <span>Manufacturing Queue</span>
                  <span className="font-bold text-narrative-forest">ID_#9231</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-narrative-forest/80 border-b border-narrative-clay/10 pb-2">
                  <span>Embroidery Speed</span>
                  <span className="font-bold text-narrative-forest">850 SPM</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-narrative-forest/80 pb-1">
                  <span>Calibration Status</span>
                  <span className="text-narrative-clay font-bold uppercase tracking-wider">FABRICATING (78%)</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 bg-narrative-clay/10 rounded-full overflow-hidden">
                  <div className="h-full bg-narrative-clay rounded-full w-[78%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Left Block: Narrative */}
          <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between min-h-[300px] order-1 lg:order-2">
            <div>
              <span className="text-[9px] font-mono font-bold text-narrative-clay uppercase tracking-wider block mb-4">
                [ STAGE 02 / FACTORY ]
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-narrative-forest mb-4">
                Fabrication & <span className="italic font-normal text-narrative-clay">Quality Check</span>
              </h3>
              <p className="text-sm text-narrative-forest/80 leading-relaxed font-medium">
                Your layout templates are sent directly to our fabrication lines. We employ automated embroidery stitching, digital print presses, and high-impact laser cutting to craft every hoodie, card, and standee to precise tolerances.
              </p>
            </div>
            
            {/* Features checkmarks */}
            <div className="flex flex-col gap-2 mt-8">
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Hammer size={14} className="text-narrative-clay" />
                <span>High-density industrial stitching</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Hammer size={14} className="text-narrative-clay" />
                <span>Pre-shipping manual quality control</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stage 3: Doorstep Arrival */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 bg-narrative-ochre/10 border border-narrative-ochre/20 rounded-[2.5rem] overflow-hidden"
        >
          {/* Left Block: Narrative */}
          <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="text-[9px] font-mono font-bold text-narrative-ochre uppercase tracking-wider block mb-4">
                [ STAGE 03 / DELIVERY ]
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-narrative-forest mb-4">
                Bespoke Packaging & <span className="italic font-normal text-narrative-ochre">Arrival</span>
              </h3>
              <p className="text-sm text-narrative-forest/80 leading-relaxed font-medium">
                Items are boxed with protective custom packaging overlays. We coordinate with carbon-neutral shipping networks to deliver your items straight from our factory floor to your team's doorstep, fully tracked.
              </p>
            </div>
            
            {/* Features checkmarks */}
            <div className="flex flex-col gap-2 mt-8">
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Check size={14} className="text-narrative-ochre stroke-[3]" />
                <span>Custom protective brand boxing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Check size={14} className="text-narrative-ochre stroke-[3]" />
                <span>100% carbon-neutral direct routing</span>
              </div>
            </div>
          </div>

          {/* Right Block: Delivery Status */}
          <div className="lg:col-span-6 bg-[#F5F1E5]/60 border-t lg:border-t-0 lg:border-l border-narrative-ochre/20 p-8 flex items-center justify-center min-h-[300px]">
            <div className="w-full max-w-sm border border-narrative-ochre/20 bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-lg relative overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-narrative-ochre/10 pb-3 mb-4 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
                  <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[9px] font-mono text-narrative-ochre font-bold tracking-wider">ROUTE_DISPATCHED</span>
              </div>
              
              <div className="h-36 relative overflow-hidden rounded-xl border border-narrative-ochre/25 shadow-sm bg-zinc-50 group">
                <Image
                  src="/images/premium_packaging.jpg"
                  alt="Premium custom packaging"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                  sizes="350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-3.5">
                  <span className="text-[10px] font-mono font-bold text-white tracking-widest uppercase">
                    Direct Shipment
                  </span>
                  <span className="text-[8px] font-mono text-zinc-300 mt-0.5">
                    EST. ARRIVAL: 3-5 DAYS
                  </span>
                </div>
              </div>

              {/* Delivery Steps */}
              <div className="mt-4 pt-3 border-t border-narrative-ochre/10 flex items-center justify-between text-[9px] font-mono text-narrative-forest/70">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>On Transit</span>
                </div>
                <div>
                  <span>Carbon-Neutral Route</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
