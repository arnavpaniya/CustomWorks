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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 z-10 relative flex flex-col gap-16">
        
        {/* Stage 1: Design Studio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="sticky top-24 grid grid-cols-1 lg:grid-cols-12 bg-[#E9EFEF] border border-narrative-sage/30 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                Browse our extensive catalog of blank items—from custom boxes to visiting cards to premium desk accessories. Upload your artwork, set exact dimensions, and adjust live options inside our sandbox customizer.
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

          {/* Right Block: Full-Bleed Studio Visual */}
          <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-[400px] w-full border-t lg:border-t-0 lg:border-l border-narrative-sage/20">
            <Image
              src="/images/lifecycle_design.png"
              alt="Design studio workspace showing custom box packaging layouts"
              fill
              className="object-cover hover:scale-[1.01] transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-narrative-forest/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Stage 2: Industrial Press */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="sticky top-32 grid grid-cols-1 lg:grid-cols-12 bg-[#F6ECE9] border border-narrative-clay/30 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Left Block: Full-Bleed Factory Visual */}
          <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-[400px] w-full border-b lg:border-b-0 lg:border-r border-narrative-clay/20 order-2 lg:order-1">
            <Image
              src="/images/lifecycle_fabrication.png"
              alt="Precision Industrial Laser Engraving on Kraft Box Board"
              fill
              className="object-cover hover:scale-[1.01] transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-narrative-forest/20 to-transparent pointer-events-none" />
          </div>

          {/* Right Block: Narrative */}
          <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between min-h-[300px] order-1 lg:order-2">
            <div>
              <span className="text-[9px] font-mono font-bold text-narrative-clay uppercase tracking-wider block mb-4">
                [ STAGE 02 / FACTORY ]
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-narrative-forest mb-4">
                Fabrication & <span className="italic font-normal text-narrative-clay">Quality Check</span>
              </h3>
              <p className="text-sm text-narrative-forest/80 leading-relaxed font-medium">
                Your layout templates are sent directly to our fabrication lines. We employ precision laser cutting, digital print presses, and high-impact custom stamping to craft every card, box, and accessory to exact tolerances.
              </p>
            </div>
            
            {/* Features checkmarks */}
            <div className="flex flex-col gap-2 mt-8">
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Hammer size={14} className="text-narrative-clay" />
                <span>Precision laser engraving and die cutting</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Hammer size={14} className="text-narrative-clay" />
                <span>Pre-shipping manual quality control check</span>
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
          className="sticky top-40 grid grid-cols-1 lg:grid-cols-12 bg-[#F5F1E5] border border-narrative-ochre/30 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                <span>Custom protective brand packaging</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-narrative-forest/80">
                <Check size={14} className="text-narrative-ochre stroke-[3]" />
                <span>100% carbon-neutral direct routing</span>
              </div>
            </div>
          </div>

          {/* Right Block: Full-Bleed Delivery Visual */}
          <div className="lg:col-span-6 relative min-h-[350px] lg:min-h-[400px] w-full border-t lg:border-t-0 lg:border-l border-narrative-ochre/20">
            <Image
              src="/images/lifecycle_delivery.png"
              alt="Premium custom cardboard packaging and boxes stacked ready for delivery"
              fill
              className="object-cover hover:scale-[1.01] transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-narrative-forest/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
