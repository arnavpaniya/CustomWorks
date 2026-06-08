import type { Metadata } from "next";
import {
  Clock,
  Truck,
  MapPin,
  PackageSearch,
  AlertTriangle,
  Globe,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Policy | CustomWorks",
  description:
    "Learn about CustomWorks' shipping methods, processing times, order tracking, and delivery policies.",
};

const sections = [
  {
    icon: Clock,
    title: "1. Processing Time",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li>
            All orders are processed within <strong>1–2 business days</strong>. Orders are not shipped or delivered on weekends or government holidays.
          </li>
          <li>
            If we experience a high volume of orders, processing times may be delayed by a few days. We&apos;ll keep you updated if there are any significant delays.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Truck,
    title: "2. Shipping Methods and Rates",
    content: (
      <>
        <p>
          At CustomWorks, we utilize reputable third-party carriers such as <strong>India Post, DTDC, Blue Dart</strong>, and others to handle our deliveries. As we do not operate an in-house delivery service, we rely on these trusted partners to ensure your orders are delivered efficiently and securely.
        </p>
        <p className="mt-3">
          Shipping rates are calculated at checkout based on your location and the shipping method selected. Offers or bulk order discounts may be applicable.
        </p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li><strong>Standard Shipping:</strong> 5–7 business days</li>
          <li><strong>Express Shipping:</strong> 2–4 business days</li>
        </ul>
        <p className="mt-3">
          Please be aware that delays may arise due to unforeseen circumstances beyond our control. While we strive to maintain timely delivery, unexpected factors may impact the shipping process. Estimated delivery times are provided as a general indication and should not be considered as exact deadlines. Simply surpassing the designated delivery timeframe does not mean you are eligible for any compensation.
        </p>
      </>
    ),
  },
  {
    icon: MapPin,
    title: "3. Shipping Restrictions",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li>
            We currently ship <strong>across Bengaluru</strong>. If your region is not listed, please contact us to inquire about shipping options.
          </li>
          <li>
            We do not ship to P.O. Boxes or parcel lockers. Please provide a valid street address for all orders.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: PackageSearch,
    title: "4. Order Tracking",
    content: (
      <>
        <p>
          Once your order has shipped, you will receive a confirmation email with a tracking number. You can track your order using the link provided in the email. The order can also be tracked on our website.
        </p>
        <p className="mt-3">
          <a href="/orders" className="text-brand-orange hover:underline font-medium">
            Track your orders here →
          </a>
        </p>
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: "5. Shipping Issues",
    content: (
      <>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong>Lost or Stolen Packages:</strong> We are not responsible for lost or stolen packages once they have been marked as delivered by the carrier. If you believe your package is lost or stolen, please contact the carrier directly for assistance.
          </li>
          <li>
            <strong>Address Errors:</strong> Please ensure that your shipping address is accurate and complete before finalizing your order. We are not liable for any issues or delays resulting from orders shipped to incorrect or incomplete addresses provided by customers. It is your responsibility to verify the address details at checkout to avoid any complications with delivery.
          </li>
          <li>
            <strong>Damaged Packages:</strong> We make every effort to ensure hassle-free deliveries and to prevent any damage to your items. However, in the rare event that damage occurs due to factors beyond our direct control by our delivery partners, we sincerely apologize for the inconvenience. Please be assured that we are committed to addressing such issues to the best of our ability.
          </li>
          <li>
            <strong>Lost Packages:</strong> Should a product be lost during the delivery process, we will ensure that the customer receives a full refund of the amount paid. We take such situations very seriously and will work promptly to resolve the issue and compensate for any inconvenience caused. Please contact our customer service team for assistance in processing your refund.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Globe,
    title: "6. International Shipping",
    content: (
      <>
        <p>
          Currently, we do not offer international shipping. If you have specific needs or require exceptions, please reach out to our customer service team at{" "}
          <a href="mailto:orders.customworks@gmail.com" className="text-brand-orange hover:underline font-medium">
            orders.customworks@gmail.com
          </a>
          . We will review your request and explore possible solutions to accommodate your shipping requirements.
        </p>
      </>
    ),
  },
  {
    icon: Phone,
    title: "7. Contact Us",
    content: (
      <>
        <p>For any shipping-related questions or concerns, please reach out to our customer service team:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:orders.customworks@gmail.com" className="text-brand-orange hover:underline font-medium">
              orders.customworks@gmail.com
            </a>
          </li>
          <li><strong>Hours:</strong> Monday – Saturday, 10:00 AM – 7:00 PM IST</li>
          <li>
            <strong>Contact Page:</strong>{" "}
            <a href="/contact" className="text-brand-orange hover:underline font-medium">
              customworks.in/contact
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Shipping Policy
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-4">
          Shipping Policy
        </h1>
        <p className="text-brand-muted text-sm">Last updated: May 2026</p>
        <p className="text-brand-muted text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Thank you for shopping with CustomWorks! We&apos;re excited to get your order to you. Here&apos;s everything you need to know about how we handle shipping.
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
