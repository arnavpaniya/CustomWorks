"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const CONTACT_EMAIL = "orders.customworks@gmail.com";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailSubject = subject || "General Inquiry";
    const emailBody = [
      "I have filled out the contact form on your website. Here are my inquiry details:",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");
    
    // Smooth micro-interaction fallback and redirect
    setTimeout(() => {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      setIsSubmitting(false);
      // Reset form fields
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-brand-border p-8 space-y-4 relative overflow-hidden">
      {isSubmitting && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-10 flex flex-col items-center justify-center gap-3 transition-opacity">
          <div className="w-8 h-8 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
          <p className="text-xs font-black uppercase tracking-wider text-brand-black">Opening Email...</p>
        </div>
      )}
      
      <h2 className="font-bold text-lg text-brand-black mb-2">Send a Message</h2>
      
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black placeholder:text-brand-muted/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black placeholder:text-brand-muted/50"
          />
        </div>
      </div>
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="contact-subject">Subject</label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Bulk Pricing / Order Inquiry"
          className="h-10 px-3 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black placeholder:text-brand-muted/50"
        />
      </div>
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          rows={5}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us about what you want to customize..."
          className="px-3 py-2 rounded-lg border border-brand-border text-sm focus:outline-none focus:ring-2 focus:ring-brand-black resize-none placeholder:text-brand-muted/50"
        />
      </div>
      
      <Button variant="accent" size="lg" type="submit" className="w-full flex items-center justify-center gap-2">
        <Mail size={16} />
        Send via Email
      </Button>
    </form>
  );
}
