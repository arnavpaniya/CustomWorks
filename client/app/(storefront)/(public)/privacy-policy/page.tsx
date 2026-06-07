import type { Metadata } from "next";
import {
  Shield,
  Lock,
  Eye,
  Cookie,
  UserCheck,
  Scale,
  Mail,
  Database,
  Users,
  AlertTriangle,
  FileText,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | CustomWorks",
  description:
    "Learn how CustomWorks collects, uses, and protects your personal information.",
};

const sections = [
  {
    icon: Info,
    title: "1. Introduction",
    content: (
      <>
        <p>
          We respect your privacy and are committed to safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect your data when you interact with our website CustomWorks.in (the &ldquo;Site&rdquo;). By using our Site, you consent to the practices described herein.
        </p>
        <p className="mt-3">
          If you have any questions or concerns regarding this policy, please contact us at{" "}
          <a href="mailto:orders.customworks@gmail.com" className="text-brand-orange hover:underline font-medium">
            orders.customworks@gmail.com
          </a>{" "}
          or call{" "}
          <a href="tel:+919632022529" className="text-brand-orange hover:underline font-medium">
            +91 96320 22529
          </a>
          .
        </p>
      </>
    ),
  },
  {
    icon: UserCheck,
    title: "2. Information Collection",
    content: (
      <>
        <p className="font-semibold text-brand-black">2.1 Personal Information</p>
        <p className="mt-1">When you make a purchase or create an account on our Site, we may collect various types of personal information, including but not limited to:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Name:</strong> To identify and address you in communications.</li>
          <li><strong>Email Address:</strong> To send order confirmations, updates, and promotional content if you opt-in.</li>
          <li><strong>Shipping Address:</strong> To process and deliver your orders accurately.</li>
          <li><strong>Phone Number:</strong> For order confirmations, shipping updates, and customer support.</li>
          <li><strong>Payment Details:</strong> Such as credit card information, processed by secure third-party payment processors.</li>
          <li><strong>Order History:</strong> To track and manage your purchases and improve our services.</li>
        </ul>
        <p className="font-semibold text-brand-black mt-4">2.2 Non-Personal Information</p>
        <p className="mt-1">We also collect non-personal information such as:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>IP Address:</strong> To monitor and analyze site usage and improve our Site.</li>
          <li><strong>Browser Type:</strong> To optimize the Site&apos;s compatibility with different browsers.</li>
          <li><strong>Usage Patterns:</strong> To analyze how users interact with our Site and enhance user experience.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Eye,
    title: "3. Use of Data",
    content: (
      <>
        <p className="font-semibold text-brand-black">3.1 Order Processing</p>
        <p className="mt-1">The personal information collected is used primarily to:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Process Orders:</strong> To fulfill your purchase requests and deliver your products.</li>
          <li><strong>Enhance Services:</strong> To provide a personalized shopping experience and improve our offerings.</li>
          <li><strong>Maintain Communication:</strong> To send order confirmations, updates, and respond to inquiries.</li>
          <li><strong>Offer Customer Support:</strong> To assist with any issues related to your orders or account.</li>
        </ul>
        <p className="font-semibold text-brand-black mt-4">3.2 Account Management</p>
        <p className="mt-1">When you create an account, we retain:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Username and Password:</strong> To facilitate secure access to your account and streamline your shopping experience.</li>
          <li><strong>Profile Information:</strong> To remember your preferences and order history for future visits.</li>
        </ul>
      </>
    ),
  },
  {
    icon: Lock,
    title: "4. Payment Security",
    content: (
      <>
        <p className="font-semibold text-brand-black">4.1 Third-Party Processors</p>
        <p className="mt-1">
          We use secure third-party payment processors to handle your payment information. We do not store your credit card details on our servers. These processors comply with industry-standard security protocols to ensure your payment data is protected.
        </p>
        <p className="font-semibold text-brand-black mt-4">4.2 Data Protection</p>
        <p className="mt-1">
          We apply rigorous security measures to protect your payment information from unauthorized access, disclosure, or misuse. While we strive to ensure the security of your data, please be aware that no system can guarantee absolute protection.
        </p>
      </>
    ),
  },
  {
    icon: Cookie,
    title: "5. Cookies and Tracking Technologies",
    content: (
      <>
        <p className="font-semibold text-brand-black">5.1 Cookies</p>
        <p className="mt-1">Our Site uses cookies and similar technologies to:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Enhance User Experience:</strong> By remembering your preferences and login information.</li>
          <li><strong>Analyze Site Traffic:</strong> To understand how users interact with our Site and improve functionality.</li>
        </ul>
        <p className="font-semibold text-brand-black mt-4">5.2 Managing Cookies</p>
        <p className="mt-1">
          You can manage or remove cookies through your browser settings. Please note that disabling cookies may affect your ability to access certain features or services on our Site.
        </p>
        <p className="font-semibold text-brand-black mt-4">5.3 Analytics</p>
        <p className="mt-1">
          We use analytics tools to collect data on site traffic and usage patterns. This information helps us optimize our Site and tailor our services to better meet your needs.
        </p>
      </>
    ),
  },
  {
    icon: Users,
    title: "6. Third-Party Services",
    content: (
      <>
        <p className="font-semibold text-brand-black">6.1 Service Providers</p>
        <p className="mt-1">We may disclose your data to trusted third-party service providers for specific functions such as:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li><strong>Payment Processing:</strong> To handle transactions securely.</li>
          <li><strong>Shipping:</strong> To deliver your orders.</li>
          <li><strong>Email Marketing:</strong> To send promotional content (with your consent).</li>
          <li><strong>Analytics:</strong> To analyze site usage and improve services.</li>
        </ul>
        <p className="mt-3">
          These third parties are contractually obligated to use your data solely for the purposes for which it was provided and to maintain its confidentiality.
        </p>
        <p className="font-semibold text-brand-black mt-4">6.2 Social Media</p>
        <p className="mt-1">
          If you engage with us through social media platforms, please be aware that your interactions are governed by the privacy policies of those platforms. We encourage you to review their policies to understand how your data is managed.
        </p>
        <p className="font-semibold text-brand-black mt-4">6.3 External Links</p>
        <p className="mt-1">
          Our Site may contain links to external websites. We are not responsible for the privacy practices or content of these third-party sites. We recommend reviewing the privacy policies of any external sites you visit.
        </p>
      </>
    ),
  },
  {
    icon: Database,
    title: "7. Data Retention",
    content: (
      <>
        <p>
          We retain your personal information for the duration necessary to fulfill the purposes for which it was collected or as required by applicable laws. Once your data is no longer needed, we will securely delete or anonymize it in accordance with our data retention policies.
        </p>
      </>
    ),
  },
  {
    icon: Scale,
    title: "8. Your Rights",
    content: (
      <>
        <p className="font-semibold text-brand-black">8.1 Access and Correction</p>
        <p className="mt-1">
          You have the right to access, update, or correct your personal information held by us. You can manage your information through your account settings or by contacting us directly.
        </p>
        <p className="font-semibold text-brand-black mt-4">8.2 Deletion</p>
        <p className="mt-1">
          You may request the deletion of your personal information. We will honor such requests, subject to any legal or contractual obligations that may require us to retain certain data.
        </p>
        <p className="font-semibold text-brand-black mt-4">8.3 Marketing Opt-Out</p>
        <p className="mt-1">
          If you wish to stop receiving marketing communications from us, you may opt out at any time by clicking the unsubscribe link in our emails or contacting us directly.
        </p>
      </>
    ),
  },
  {
    icon: Shield,
    title: "9. Children's Privacy",
    content: (
      <>
        <p>
          Our Site is not intended for individuals under the age of 13. We do not knowingly collect or solicit personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
        </p>
      </>
    ),
  },
  {
    icon: FileText,
    title: "10. Policy Updates",
    content: (
      <>
        <p className="font-semibold text-brand-black">10.1 Revisions</p>
        <p className="mt-1">
          We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Any significant changes will be communicated by posting the updated policy on our Site.
        </p>
        <p className="font-semibold text-brand-black mt-4">10.2 Effective Date</p>
        <p className="mt-1">
          The revised Privacy Policy will become effective as of the date of posting. Your continued use of our Site after the changes signifies your acceptance of the updated policy.
        </p>
      </>
    ),
  },
  {
    icon: AlertTriangle,
    title: "11. Data Breach Notification",
    content: (
      <>
        <p>
          In the event of a data breach that compromises your personal information, we will promptly notify affected users and take appropriate measures to secure our systems and prevent further breaches.
        </p>
      </>
    ),
  },
  {
    icon: Mail,
    title: "12. Contact Information",
    content: (
      <>
        <p className="font-semibold text-brand-black">12.1 Inquiries and Concerns</p>
        <p className="mt-1">For questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:</p>
        <ul className="list-disc list-inside space-y-1 mt-3">
          <li>
            <strong>Email:</strong>{" "}
            <a href="mailto:orders.customworks@gmail.com" className="text-brand-orange hover:underline font-medium">
              orders.customworks@gmail.com
            </a>
          </li>
          <li>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919632022529" className="text-brand-orange hover:underline font-medium">
              +91 96320 22529
            </a>
          </li>
          <li>
            <strong>Contact Page:</strong>{" "}
            <a href="/contact" className="text-brand-orange hover:underline font-medium">
              customworks.in/contact
            </a>
          </li>
        </ul>
        <p className="font-semibold text-brand-black mt-4">12.2 Customer Support</p>
        <p className="mt-1">
          Our customer service team is available to assist with any inquiries or issues related to your personal data or our privacy practices. We aim to address your concerns promptly and effectively.
        </p>
      </>
    ),
  },
  {
    icon: Info,
    title: "13. Miscellaneous",
    content: (
      <>
        <p className="font-semibold text-brand-black">13.1 Severability</p>
        <p className="mt-1">
          If any provision of this Privacy Policy is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect. The invalid or unenforceable provision will be modified or deleted to the minimum extent necessary to make it valid and enforceable.
        </p>
        <p className="font-semibold text-brand-black mt-4">13.2 Waiver</p>
        <p className="mt-1">
          No waiver of any term or condition of this Privacy Policy will be deemed a further or continuing waiver of such term or condition or any other term or condition. Our failure to enforce any right or provision will not constitute a waiver of such right or provision.
        </p>
        <p className="font-semibold text-brand-black mt-4">13.3 Entire Agreement</p>
        <p className="mt-1">
          This Privacy Policy, along with any other policies referenced herein, constitutes the entire agreement between you and us regarding your personal data and supersedes all prior agreements and understandings.
        </p>
        <p className="font-semibold text-brand-black mt-4">13.4 Assignment</p>
        <p className="mt-1">
          We may assign our rights and obligations under this Privacy Policy to any third party without notice to you. You may not assign your rights or obligations under this policy without our prior written consent.
        </p>
        <p className="font-semibold text-brand-black mt-4">13.5 Headings</p>
        <p className="mt-1">
          The headings used in this Privacy Policy are for convenience only and have no legal or contractual effect.
        </p>
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
          At CustomWorks, we respect your privacy and are committed to protecting
          the personal information you share with us. This policy explains what we
          collect, how we use it, and your rights.
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

      {/* Acceptance Banner */}
      <div className="mt-8 bg-brand-surface border border-brand-border rounded-3xl p-8 sm:p-10">
        <h2 className="text-xl font-bold text-brand-black mb-3">Acceptance of Privacy Policy</h2>
        <div className="text-sm text-brand-muted leading-relaxed space-y-4">
          <p>
            This Privacy Policy is designed to inform you about our practices regarding the collection, use, and protection of your personal data. It outlines how we manage your information and what rights you have in relation to your personal data. By accessing and using our website, you acknowledge that you have read, understood, and agree to the terms and conditions set forth in this policy.
          </p>
          <p>
            <strong className="text-brand-black">Consent to Terms:</strong> Your continued use of our website constitutes your acceptance of this Privacy Policy and your consent to our practices described herein. If you do not agree to the terms of this Privacy Policy, we advise you to discontinue use of our website and refrain from providing any personal data.
          </p>
          <p>
            <strong className="text-brand-black">Modification and Updates:</strong> We reserve the right to modify or update this Privacy Policy at any time. Any significant changes to this policy will be communicated by posting the updated version on our website. It is your responsibility to review this Privacy Policy periodically to stay informed of any changes. Your continued use of the website following the posting of changes constitutes your acceptance of those changes.
          </p>
        </div>
      </div>
    </div>
  );
}
