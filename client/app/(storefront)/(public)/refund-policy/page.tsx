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
  title: "Return & Refund Policy",
  description:
    "CustomWorks return and refund policies for customized consumer products.",
};

const sections = [
  {
    icon: PackageX,
    title: "1. No Returns or Refunds",
    content: (
      <>
        <p>
          At CustomWorks, every product is custom-made to order according to your unique specifications. Because of this personalization process, <strong>we do not accept returns or offer refunds</strong> for any completed orders.
        </p>
        <p className="mt-2">
          This includes, but is not limited to:
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Change of mind or preference.</li>
          <li>Incorrect size selected by the customer.</li>
          <li>Design layouts, fonts, or colors that match the mockup you approved during the ordering/design stage.</li>
        </ul>
      </>
    ),
  },
  {
    icon: RefreshCw,
    title: "2. Remake and Reshipment Policy",
    content: (
      <>
        <p>
          We stand by the quality of our craftsmanship. If the final products delivered to you <strong>differ in design from the approved mockup</strong>, we will remake and ship the affected products to you free of charge.
        </p>
        <p className="mt-2 font-semibold text-brand-black">
          Important Notice:
        </p>
        <p className="mt-1">
          All remake requests are strictly subject to approval by the CustomWorks team. We will verify the details of your order and production logs to check whether a mistake was actually made during the manufacturing/printing stage compared to your approved mockup.
        </p>
      </>
    ),
  },
  {
    icon: MessageCircle,
    title: "3. How to Request a Remake",
    content: (
      <>
        <p>To submit a remake request, please follow these steps within <strong>7 days of delivery</strong>:</p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
          <li>Contact us via <strong>WhatsApp (+91 96320 22529)</strong> or email <strong>orders.customworks@gmail.com</strong>.</li>
          <li>State your <strong>Order Number</strong> (e.g., CW-20260501).</li>
          <li>Provide <strong>clear photos and/or videos</strong> showing the difference between the approved mockup and the received product.</li>
        </ol>
        <p className="mt-3">Our team will inspect your request and get back to you within <strong>24–48 hours</strong>.</p>
      </>
    ),
  },
  {
    icon: XCircle,
    title: "4. Cancellation Policy",
    content: (
      <>
        <p>Order cancellations depend entirely on the production status of your custom items:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Before production</strong> (status: &ldquo;Designing&rdquo;) — Full cancellation and refund of payment is available.</li>
          <li><strong>In production</strong> (status: &ldquo;Processing&rdquo; or later) — Cancellation is <strong>not possible</strong>, as custom materials have already been prepared, printed, or manufactured.</li>
        </ul>
        <p className="mt-3">If you need to cancel, please notify us immediately via WhatsApp or email to see if production has commenced.</p>
      </>
    ),
  },
  {
    icon: Phone,
    title: "5. Customer Support Contact",
    content: (
      <>
        <p>For any questions regarding your order or remake status, reach out directly:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li><strong>WhatsApp:</strong> +91 96320 22529</li>
          <li><strong>Email:</strong> orders.customworks@gmail.com</li>
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
            Return & Refund Policy
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-4">
          Return and Refund Policy
        </h1>
        <p className="text-brand-muted text-sm">Last updated: June 2026</p>
        <p className="text-brand-muted text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Because our products are customized, we do not accept returns or refunds. However, if there is a manufacturing design difference compared to your approved mockup, we will remake it.
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
