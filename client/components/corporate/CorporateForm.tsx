"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACT_EMAIL = "orders.customworks@gmail.com";

export default function CorporateForm() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailBody = [
      "I'd like to get a quote for a bulk / corporate order. Here are my inquiry details:",
      "",
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Quantity: ${quantity} pieces`,
      `Requirements: ${requirements || "No specific requirements mentioned."}`,
    ].join("\n");

    setTimeout(() => {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Bulk / corporate order quote request")}&body=${encodeURIComponent(emailBody)}`;
      setIsSubmitting(false);
      setSubmitted(true);
      // Reset form
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setQuantity("");
      setRequirements("");
    }, 600);
  };

  return (
    <div className="bg-[#FAF6F0] rounded-[2rem] border border-zinc-200/40 p-8 sm:p-10 shadow-md relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-narrative-clay/5 blur-2xl pointer-events-none" />
      
      <div className="mb-6 relative z-10">
        <h2 className="text-2xl font-bold font-serif text-narrative-forest">Request a Bulk Quote</h2>
        <p className="text-xs text-narrative-forest/60 font-light mt-1">Get custom pricing, digital samples, and dedicated support for your brand.</p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white border border-zinc-200/40 rounded-2xl p-8 text-center shadow-sm relative z-10"
          >
            <div className="h-14 w-14 mx-auto bg-narrative-sage/10 text-narrative-sage border border-narrative-sage/20 rounded-full flex items-center justify-center mb-4">
              <Send size={20} />
            </div>
            <h3 className="text-lg font-bold text-narrative-forest mb-1">Quote Details Generated</h3>
            <p className="text-narrative-forest/70 text-xs mb-6 max-w-xs mx-auto font-light leading-relaxed">
              We have opened your email app with your inquiry details. Send the email to start your request at <span className="font-mono font-semibold">{CONTACT_EMAIL}</span>.
            </p>
            <Button
              variant="outline"
              onClick={() => setSubmitted(false)}
              className="rounded-full border-zinc-300 hover:bg-zinc-50 text-xs"
            >
              Submit Another Request
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-narrative-forest" htmlFor="corp-name">Full Name *</label>
                <input
                  id="corp-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Mohith Kumar"
                  className="h-10 px-3.5 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-narrative-forest" htmlFor="corp-company">Company / Organization *</label>
                <input
                  id="corp-company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="CustomWorks Inc."
                  className="h-10 px-3.5 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-narrative-forest" htmlFor="corp-email">Work Email *</label>
                <input
                  id="corp-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="h-10 px-3.5 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-narrative-forest" htmlFor="corp-phone">Phone Number *</label>
                <input
                  id="corp-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 96320 22529"
                  className="h-10 px-3.5 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-narrative-forest" htmlFor="corp-qty">Estimated Quantity (Min. 10) *</label>
              <input
                id="corp-qty"
                type="number"
                min={10}
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="50"
                className="h-10 px-3.5 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-narrative-forest" htmlFor="corp-requirements">Products & Requirements</label>
              <textarea
                id="corp-requirements"
                rows={4}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Please share what products you are looking for, colors, sizing, printing needs, and your target delivery date..."
                className="px-3.5 py-2.5 rounded-xl border border-zinc-200/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-narrative-clay/20 focus:border-narrative-clay transition-all resize-none"
              />
            </div>

            <Button 
              className="w-full h-11 rounded-full bg-narrative-forest hover:bg-narrative-clay text-white font-bold text-sm tracking-wide shadow-md transition-all duration-300 mt-2" 
              type="submit"
              loading={isSubmitting}
            >
              <Mail size={16} className="mr-2" />
              Request Bulk Quote via Email
            </Button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
