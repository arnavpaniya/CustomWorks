import type { Metadata } from "next";
import {
  RotateCcw,
  PackageX,
  MessageCircle,
  Clock,
  RefreshCw,
  XCircle,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Returns Policy",
  description:
    "CustomWorks refund, return, exchange, and cancellation policies for custom-printed products.",
};

const sections = [
  {
    icon: RotateCcw,
    title: "1. Return Eligibility",
    content: (
      <>
        <p>We accept returns under the following conditions:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Return requests must be raised within <strong>7 days of delivery</strong>.</li>
          <li>Items must be unused, unworn, and in their original packaging.</li>
          <li><strong>Design defects</strong> — If the printed design does not match the approved mockup, the item is eligible for return.</li>
          <li><strong>Shipping damage</strong> — Items damaged during transit are eligible. Please retain the packaging and share photos.</li>
          <li><strong>Quality issues</strong> — Faded prints, incorrect colours, or material defects reported within the return window.</li>
        </ul>
      </>
    ),
  },
  {
    icon: PackageX,
    title: "2. Non-Returnable Items",
    content: (
      <>
        <p>The following items are <strong>not eligible</strong> for returns:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Custom-designed products where the <strong>approved design was accurately printed</strong> as per the customer&apos;s approval in the design mockup stage.</li>
          <li><strong>Bulk corporate orders</strong> exceeding 50 units, unless a manufacturing defect is identified.</li>
          <li>Items that have been <strong>used, washed, altered, or damaged by the customer</strong> after delivery.</li>
          <li>Products with <strong>minor colour variations</strong> due to screen-to-print differences (slight shade variations are inherent in printing).</li>
        </ul>
      </>
    ),
  },
  {
    icon: MessageCircle,
    title: "3. How to Initiate a Return",
    content: (
      <>
        <p>To start a return, follow these steps:</p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
          <li>Contact us via <strong>WhatsApp (+91 96320 22529)</strong> or email <strong>orders@customworks.in</strong>.</li>
          <li>Provide your <strong>Order Number</strong> (e.g., CW-20260501).</li>
          <li>Share <strong>clear photos</strong> of the issue (defect, damage, etc.).</li>
          <li>Describe the <strong>reason for return</strong> briefly.</li>
        </ol>
        <p className="mt-3">Our team will review your request and respond within <strong>24–48 hours</strong> with next steps.</p>
      </>
    ),
  },
  {
    icon: Clock,
    title: "4. Refund Process",
    content: (
      <>
        <p>Once a return is approved:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Online payments</strong> — Refund credited to the original payment method (UPI, card, net banking) within <strong>5–7 business days</strong>.</li>
          <li><strong>COD orders</strong> — Refund issued via bank transfer. We&apos;ll request your bank account details securely.</li>
          <li><strong>Partial refunds</strong> — Applicable when only part of the order is affected (e.g., 2 of 5 items damaged).</li>
          <li>Refund amount excludes any shipping charges unless the issue is due to a CustomWorks error.</li>
        </ul>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "5. Exchange Policy",
    content: (
      <>
        <p>We offer exchanges for select products:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Apparel size/colour exchanges</strong> — Available within 7 days of delivery for T-shirts, polo shirts, and hoodies.</li>
          <li>Exchanges are subject to <strong>stock availability</strong>. If your requested variant is unavailable, a full refund will be processed instead.</li>
          <li>Customer is responsible for <strong>return shipping costs</strong> for exchanges, unless the exchange is due to our error.</li>
          <li>Exchange items will be shipped within <strong>3–5 business days</strong> after we receive the original item.</li>
        </ul>
      </>
    ),
  },
  {
    icon: XCircle,
    title: "6. Cancellation Policy",
    content: (
      <>
        <p>Order cancellations depend on production status:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Before production</strong> (status: &ldquo;Designing&rdquo;) — Full cancellation and refund available.</li>
          <li><strong>In production</strong> (status: &ldquo;Processing&rdquo; or later) — Cancellation is <strong>not possible</strong> as materials have been prepared and printing has begun.</li>
          <li><strong>Auto-processing</strong> — Orders move to production typically within 24 hours of payment confirmation. Cancel early if needed.</li>
        </ul>
        <p className="mt-3">To request a cancellation, contact us immediately via WhatsApp or email.</p>
      </>
    ),
  },
  {
    icon: Phone,
    title: "7. Contact for Returns",
    content: (
      <>
        <p>Our customer support team is here to help:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li><strong>WhatsApp:</strong> +91 96320 22529</li>
          <li><strong>Email:</strong> orders@customworks.in</li>
          <li><strong>Hours:</strong> Monday – Saturday, 10:00 AM – 7:00 PM IST</li>
          <li><strong>Contact Page:</strong> <a href="/contact" className="text-brand-orange hover:underline font-medium">customworks.in/contact</a></li>
        </ul>
      </>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Refund Policy
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-4">
          Refund & Returns Policy
        </h1>
        <p className="text-brand-muted text-sm">Last updated: May 2026</p>
        <p className="text-brand-muted text-base leading-relaxed max-w-2xl mx-auto mt-4">
          We want you to love every product you receive from CustomWorks. If
          something isn&apos;t right, here&apos;s how we make it right.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {sections.map(({ icon: Icon, title, content }) => (
          <div
            key={title}
            className="bg-white border border-brand-border rounded-3xl p-8 sm:p-10 shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-brand-surface flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={18} className="text-brand-muted" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-brand-black mb-3">
                  {title}
                </h2>
                <div className="text-sm text-brand-muted leading-relaxed space-y-2">
                  {content}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
