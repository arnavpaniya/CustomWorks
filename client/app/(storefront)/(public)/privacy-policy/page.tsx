import type { Metadata } from "next";
import { Shield, Lock, Eye, Cookie, UserCheck, Scale, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how CustomWorks collects, uses, and protects your personal information.",
};

const sections = [
  {
    icon: UserCheck,
    title: "1. Information We Collect",
    content: (
      <>
        <p>We collect the following information when you use CustomWorks:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Personal Information</strong> — Name, email address, phone number, and shipping address provided during registration or checkout.</li>
          <li><strong>Payment Information</strong> — Payment details are processed securely by Razorpay. We do not store your card numbers or UPI IDs on our servers.</li>
          <li><strong>Design Files</strong> — Images, logos, and custom designs you upload for product customization.</li>
          <li><strong>Device Information</strong> — Browser type, operating system, IP address, and device identifiers for security and analytics purposes.</li>
          <li><strong>Order History</strong> — Details of your past orders, including products, quantities, and delivery information.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Eye,
    title: "2. How We Use Your Information",
    content: (
      <>
        <p>Your information is used to:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Fulfil Orders</strong> — Process, manufacture, and deliver your custom products.</li>
          <li><strong>Customer Communication</strong> — Send order updates via email, SMS, and WhatsApp. Share tracking information and delivery notifications.</li>
          <li><strong>Design Processing</strong> — Render and produce your uploaded designs accurately on the chosen products.</li>
          <li><strong>Service Improvement</strong> — Analyse usage patterns to enhance our platform, product offerings, and user experience.</li>
          <li><strong>Marketing</strong> — Send promotional offers and new product updates only with your explicit consent. You can unsubscribe anytime.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Shield,
    title: "3. Information Sharing",
    content: (
      <>
        <p>We share your data only with trusted partners essential to fulfilling your orders:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Payment Gateway</strong> — Razorpay processes all payment transactions securely.</li>
          <li><strong>Shipping Partners</strong> — Delhivery and BlueDart receive your shipping address for order delivery.</li>
          <li><strong>Communication Partners</strong> — Fast2SMS for order notification text messages.</li>
        </ul>
        <p className="mt-3 font-semibold text-brand-black">We never sell, rent, or trade your personal data to third parties for marketing purposes.</p>
      </>
    ),
  },
  {
    icon: Lock,
    title: "4. Data Security",
    content: (
      <>
        <p>We implement industry-standard security measures to protect your data:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>SSL/TLS Encryption</strong> — All data transmitted between your browser and our servers is encrypted.</li>
          <li><strong>Secure Authentication</strong> — JWT-based authentication tokens with session expiration and rotation.</li>
          <li><strong>Access Controls</strong> — Role-based access controls ensure only authorised personnel access sensitive data.</li>
          <li><strong>File Security</strong> — Uploaded design files are stored securely with access restricted to order processing only.</li>
          <li><strong>Rate Limiting & CORS</strong> — API protections to prevent abuse and cross-origin attacks.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Cookie,
    title: "5. Cookies & Tracking",
    content: (
      <>
        <p>We use cookies to enhance your experience:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Essential Cookies</strong> — Required for cart functionality, user sessions, and security. Cannot be disabled.</li>
          <li><strong>Analytics Cookies</strong> — Google Analytics helps us understand how visitors use our site so we can improve it.</li>
          <li><strong>No Ad Trackers</strong> — We do not use third-party advertising trackers or sell browsing data.</li>
        </ul>
        <p className="mt-3">You can manage cookie preferences through your browser settings.</p>
      </>
    ),
  },
  {
    icon: Scale,
    title: "6. Your Rights",
    content: (
      <>
        <p>As a user of CustomWorks, you have the right to:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Access</strong> — Request a copy of your personal data we hold.</li>
          <li><strong>Correction</strong> — Update or correct inaccurate information in your account.</li>
          <li><strong>Deletion</strong> — Request deletion of your account and associated data, subject to legal retention requirements.</li>
          <li><strong>Opt-out</strong> — Unsubscribe from marketing communications at any time.</li>
        </ul>
        <p className="mt-3">To exercise any of these rights, contact us at <strong>orders@customworks.in</strong>.</p>
      </>
    ),
  },
  {
    icon: Mail,
    title: "7. Contact Us",
    content: (
      <>
        <p>If you have questions about this Privacy Policy or your personal data, contact us:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li><strong>Email:</strong> orders@customworks.in</li>
          <li><strong>WhatsApp:</strong> +91 96320 22529</li>
          <li><strong>Contact Page:</strong> <a href="/contact" className="text-brand-orange hover:underline font-medium">customworks.in/contact</a></li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Legal
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-4">
          Privacy Policy
        </h1>
        <p className="text-brand-muted text-sm">Last updated: May 2026</p>
        <p className="text-brand-muted text-base leading-relaxed max-w-2xl mx-auto mt-4">
          At CustomWorks, we respect your privacy and are committed to
          protecting the personal information you share with us. This policy
          explains what we collect, how we use it, and your rights.
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
