import type { Metadata } from "next";
import {
  FileText,
  UserCheck,
  Palette,
  CreditCard,
  Copyright,
  Truck,
  Shield,
  Scale,
  Bell,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions governing the use of CustomWorks products and services.",
};

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing and using <strong>customworks.in</strong> (the
          &ldquo;Platform&rdquo;), you agree to be bound by these Terms of
          Service. If you do not agree with any part of these terms, please
          discontinue use of the Platform immediately.
        </p>
        <p className="mt-2">
          These terms apply to all users, including browsers, customers,
          merchants, and content contributors.
        </p>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: "2. Account Registration",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>Users must provide <strong>accurate and complete information</strong> during registration.</li>
          <li>You are responsible for maintaining the <strong>confidentiality of your account</strong> credentials.</li>
          <li>One account per individual or business entity. Duplicate accounts may be suspended.</li>
          <li>CustomWorks reserves the right to <strong>suspend or terminate</strong> accounts that violate these terms or engage in fraudulent activity.</li>
          <li>You must be at least <strong>18 years of age</strong> to create an account and place orders.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Palette,
    title: "3. Products & Customization",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>All products on CustomWorks are <strong>made-to-order</strong>. Each item is custom-manufactured based on your design specifications.</li>
          <li>Colours may vary slightly between <strong>screen display and final print</strong> due to differences in monitors, printers, and substrates.</li>
          <li>Customers are responsible for reviewing the <strong>design preview/mockup</strong> before placing an order. Once approved, the design is considered final.</li>
          <li>CustomWorks is <strong>not responsible for errors</strong> in customer-uploaded designs (typos, wrong logos, incorrect colour codes) once the design has been approved through the customiser.</li>
        </ul>
      </>
    ),
  },
  {
    icon: CreditCard,
    title: "4. Pricing & Payment",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>All prices are displayed in <strong>Indian Rupees (₹/INR)</strong> and are inclusive of GST where applicable.</li>
          <li>Prices are subject to change without prior notice. The price at the time of order placement applies.</li>
          <li>Payments are processed securely through <strong>Razorpay</strong> supporting UPI, credit/debit cards, net banking, and wallets.</li>
          <li><strong>Cash on Delivery (COD)</strong> is available for select products and pin codes.</li>
          <li>Full payment is required before production begins for all online payment orders.</li>
          <li>Bulk/corporate orders may have <strong>custom pricing tiers</strong> based on quantity.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Copyright,
    title: "5. Intellectual Property",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>Customers must have the <strong>legal right to use</strong> any designs, logos, images, or text they upload for customization.</li>
          <li>CustomWorks is <strong>not liable for copyright or trademark infringement</strong> arising from customer-uploaded content.</li>
          <li>The CustomWorks brand name, logo, website design, and all original content are <strong>proprietary and protected</strong> under applicable intellectual property laws.</li>
          <li>We reserve the right to refuse production of designs that contain <strong>offensive, illegal, or infringing content</strong>.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Truck,
    title: "6. Order Fulfilment & Shipping",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>Estimated delivery is <strong>5–10 business days</strong> from order confirmation, depending on product type and destination.</li>
          <li>Delivery timelines may extend during <strong>peak seasons, festivals, or high-demand periods</strong>.</li>
          <li>Shipping charges are calculated and displayed at checkout based on weight, dimensions, and destination.</li>
          <li><strong>Free shipping</strong> is available on orders above ₹999 within Bengaluru.</li>
          <li>CustomWorks is not liable for delays caused by the shipping carrier, weather conditions, or customs clearance.</li>
          <li>A valid contact number and complete address are required for successful delivery.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Shield,
    title: "7. Limitation of Liability",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>CustomWorks shall not be liable for any <strong>indirect, incidental, special, or consequential damages</strong> arising from the use of our products or services.</li>
          <li>Our maximum liability in any claim is limited to the <strong>total amount paid by you</strong> for the specific order in question.</li>
          <li>We are not responsible for damages caused by <strong>force majeure events</strong> including natural disasters, pandemics, government restrictions, or supply chain disruptions.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Scale,
    title: "8. Governing Law & Disputes",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>These Terms are governed by and construed in accordance with the <strong>laws of India</strong>.</li>
          <li>Any disputes arising from these terms or the use of CustomWorks shall be subject to the <strong>exclusive jurisdiction of the courts in Bengaluru, Karnataka</strong>.</li>
          <li>We encourage resolving disputes amicably through direct communication before pursuing legal remedies.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Bell,
    title: "9. Changes to Terms",
    content: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>CustomWorks reserves the right to <strong>update or modify</strong> these Terms of Service at any time.</li>
          <li>Continued use of the Platform after changes constitutes <strong>acceptance of the revised terms</strong>.</li>
          <li>Significant changes will be communicated via email or an on-site notification.</li>
          <li>It is the user&apos;s responsibility to review these terms periodically.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Mail,
    title: "10. Contact",
    content: (
      <>
        <p>For questions about these Terms of Service, contact us:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li><strong>Email:</strong> orders.customworks@gmail.com</li>
          <li><strong>Contact Page:</strong> <a href="/contact" className="text-brand-orange hover:underline font-medium">customworks.in/contact</a></li>
        </ul>
      </>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Terms of Service
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-4">
          Terms of Service
        </h1>
        <p className="text-brand-muted text-sm">Last updated: May 2026</p>
        <p className="text-brand-muted text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Please read these terms carefully before using CustomWorks. By
          accessing our platform, you agree to comply with and be bound by the
          following terms and conditions.
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
