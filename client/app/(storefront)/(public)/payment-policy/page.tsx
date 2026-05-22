import type { Metadata } from "next";
import {
  CreditCard,
  ShieldCheck,
  ReceiptText,
  BadgeDollarSign,
  RotateCcw,
  AlertTriangle,
  Lock,
  Tag,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Payment Policy | CustomWorks",
  description:
    "Learn about CustomWorks' accepted payment methods, payment security, pricing, refunds, and fraud prevention policies.",
};

const sections = [
  {
    icon: CreditCard,
    title: "1. Accepted Payment Methods",
    content: (
      <>
        <p>We accept the following payment methods:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Credit and Debit Cards:</strong> Visa, MasterCard, American Express, and other major credit cards.</li>
          <li><strong>Digital Wallets:</strong> PayPal, Apple Pay, Google Pay.</li>
          <li><strong>Net Banking:</strong> All leading banks.</li>
          <li><strong>Other Methods:</strong> UPI, etc.</li>
        </ul>
        <p className="mt-3">
          Please note that payment options may vary and are subject to availability at the time of purchase. We strive to offer a range of payment methods, but the availability of specific options may depend on factors such as location, current system capabilities, and so on.
        </p>
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "2. Payment Processing",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Authorization:</strong> All transactions are subject to authorization by your payment provider. Your payment will be processed upon order confirmation.
          </li>
          <li>
            <strong>Payment Security:</strong> We use industry-standard encryption technologies to protect your payment information. Our payment gateway complies with PCI-DSS (Payment Card Industry Data Security Standard) requirements to ensure the security of your data.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: ReceiptText,
    title: "3. Order Confirmation",
    content: (
      <>
        <p>
          <strong>Receipt:</strong> After your payment is processed, you will receive an email confirmation with the details of your order. This confirmation serves as proof of purchase and includes a summary of the items ordered, payment details, and estimated delivery date.
        </p>
      </>
    ),
  },
  {
    icon: BadgeDollarSign,
    title: "4. Pricing and Currency",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Prices:</strong> All prices are listed in Indian Rupees. Prices can be subject to change without notice.
          </li>
          <li>
            <strong>Taxes:</strong> Applicable taxes will be added to the order total based on the Indian government&apos;s tax regulations. The final amount will be displayed at checkout.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: RotateCcw,
    title: "5. Refunds and Cancellations",
    content: (
      <>
        <p>
          <strong>Order Cancellations:</strong> Orders can be canceled within 4 hours of placing the order. Please contact our customer service team as soon as possible to request a cancellation.
        </p>
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: "6. Payment Issues",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Declined Transactions:</strong> If your payment is declined, please check with your payment provider or bank for details. If you continue to experience issues, contact our customer service team for assistance.
          </li>
          <li>
            <strong>Currency Conversion Fees:</strong> If you are using a credit or debit card issued outside India, currency conversion fees may apply as per your card issuer&apos;s policies. These fees are not charged by CustomWorks and are the responsibility of the customer.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: "7. Fraud Prevention",
    content: (
      <>
        <p>
          <strong>Security Measures:</strong> To prevent fraudulent transactions, we may perform additional checks or request further information for verification. We reserve the right to cancel any order that we suspect may be fraudulent.
        </p>
      </>
    ),
  },
  {
    icon: Tag,
    title: "8. Offers and Promotions",
    content: (
      <>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Gift cards and coupon codes:</strong> If you encounter any issues with coupon codes or gift codes, please contact our customer care team at{" "}
            <a href="mailto:orders@customworks.in" className="text-brand-orange hover:underline font-medium">
              orders@customworks.in
            </a>
            .
          </li>
          <li>
            <strong>Bank offers:</strong> If you experience any issues with bank offers, please contact us for an explanation. For additional resolution, we recommend reaching out directly to the bank.
          </li>
        </ul>
      </>
    ),
  },
  {
    icon: Phone,
    title: "9. Contact Us",
    content: (
      <>
        <p>For any questions or concerns regarding payments, please contact our customer service team:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:orders@customworks.in" className="text-brand-orange hover:underline font-medium">
              orders@customworks.in
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919632022529" className="text-brand-orange hover:underline font-medium">
              +91 96320 22529
            </a>
          </li>
          <li><strong>Hours:</strong> Monday – Saturday, 5:00 PM – 8:00 PM IST</li>
          <li>
            <strong>Contact Page:</strong>{" "}
            <a href="/contact" className="text-brand-orange hover:underline font-medium">
              customworks.in/contact
            </a>
          </li>
        </ul>
        <p className="mt-3">We appreciate your purchase and look forward to providing you with a seamless shopping experience!</p>
      </>
    ),
  },
];

export default function PaymentPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-block mb-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-black bg-brand-black/5 px-2.5 py-0.5 rounded-full border border-brand-black/10">
            Payment Policy
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-brand-black mb-4">
          Payment Policy
        </h1>
        <p className="text-brand-muted text-sm">Last updated: May 2026</p>
        <p className="text-brand-muted text-base leading-relaxed max-w-2xl mx-auto mt-4">
          Thank you for choosing CustomWorks! To ensure a smooth and secure transaction process, please review our payment policy outlined below.
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
