"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquareShare } from "lucide-react";

interface CorporateFormProps {
  whatsappNumber: string;
}

export default function CorporateForm({ whatsappNumber }: CorporateFormProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [requirements, setRequirements] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedMessage = `Hello CustomWorks! 👋 👔

I'd like to get a quote for a bulk / corporate order. Here are my inquiry details:

👤 Name: ${name}
🏢 Company: ${company}
✉️ Email: ${email}
📞 Phone: ${phone}
📦 Quantity: ${quantity} pieces
📝 Requirements: ${requirements || "No specific requirements mentioned."}

Looking forward to hearing from you!`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
      // Reset form
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setQuantity("");
      setRequirements("");
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-border p-8 space-y-4 relative overflow-hidden">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-10 flex flex-col items-center justify-center gap-3 transition-opacity">
          <div className="w-8 h-8 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
          <p className="text-xs font-black uppercase tracking-wider text-brand-black">Opening WhatsApp...</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-black" htmlFor="corp-name">Your Name *</label>
          <input
            id="corp-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Arnav Paniya"
            className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black placeholder:text-brand-muted/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-black" htmlFor="corp-company">Company *</label>
          <input
            id="corp-company"
            type="text"
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="CustomWorks Inc."
            className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black placeholder:text-brand-muted/50"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-black" htmlFor="corp-email">Email *</label>
          <input
            id="corp-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black placeholder:text-brand-muted/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-brand-black" htmlFor="corp-phone">Phone *</label>
          <input
            id="corp-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 96320 22529"
            className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black placeholder:text-brand-muted/50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-brand-black" htmlFor="corp-qty">Estimated Quantity *</label>
        <input
          id="corp-qty"
          type="number"
          min={10}
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="50"
          className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black placeholder:text-brand-muted/50"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-brand-black" htmlFor="corp-requirements">Requirements</label>
        <textarea
          id="corp-requirements"
          rows={4}
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="Describe your product requirements, occasion, preferred products, timeline, etc."
          className="px-3 py-2 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black resize-none placeholder:text-brand-muted/50"
        />
      </div>

      <Button variant="accent" size="lg" className="w-full flex items-center justify-center gap-2" type="submit">
        <MessageSquareShare size={16} />
        Submit Quote Request via WhatsApp
      </Button>
    </form>
  );
}
