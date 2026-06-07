import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Download, MessageSquare, Package, Truck, CheckCircle, Clock, Factory } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Order Details" };

const ORDER_STATUSES = [
  { key: "DESIGNING", label: "Design Review", icon: Clock, desc: "Admin reviewing your design" },
  { key: "PROCESSING", label: "Processing", icon: Factory, desc: "In production" },
  { key: "READY_TO_SHIP", label: "Ready to Ship", icon: Package, desc: "Packaged & ready" },
  { key: "DISPATCHED", label: "Dispatched", icon: Truck, desc: "Out for delivery" },
  { key: "DELIVERED", label: "Delivered", icon: CheckCircle, desc: "Order delivered" },
];

const MOCK_ORDER = {
  id: "CW-20240315",
  date: "15 March 2025",
  total: 2197,
  status: "DISPATCHED",
  items: [
    { name: "Custom Printed T-Shirt", variant: "L / White", qty: 3, price: 499, custom: 'Front text: "Team Alpha"' },
    { name: "Custom Ceramic Mug", variant: "Standard", qty: 2, price: 299, custom: "Logo uploaded" },
  ],
  address: "Arnav Paniya, 123 MG Road, Andheri West, Mumbai, Maharashtra – 400053",
  customerPhone: "919999999999",
};
const CONTACT_EMAIL = "orders.customworks@gmail.com";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = { ...MOCK_ORDER, id };
  const currentStatusIndex = ORDER_STATUSES.findIndex((s) => s.key === order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-brand-muted mb-6" aria-label="Breadcrumb">
        <Link href="/account/dashboard" className="hover:text-brand-black">Account</Link>
        <ChevronRight size={12} />
        <Link href="/account/orders" className="hover:text-brand-black">Orders</Link>
        <ChevronRight size={12} />
        <span className="text-brand-black font-medium">#{order.id}</span>
      </nav>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Order #{order.id}</h1>
          <p className="text-sm text-brand-muted">Placed on {order.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Download size={14} /> Invoice
          </Button>
          <Link
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Modify request for Order #${order.id}`)}&body=${encodeURIComponent(`Hi CustomWorks,\n\nI need to modify Order #${order.id}.`)}`}
          >
            <Button variant="primary" size="sm" className="gap-1.5">
              <MessageSquare size={14} /> Modify Request
            </Button>
          </Link>
        </div>
      </div>

      {/* Status tracker */}
      <div className="bg-white rounded-2xl border border-brand-border p-6 mb-6">
        <h2 className="font-bold text-brand-black mb-6">Order Status</h2>
        <div className="flex items-start gap-0">
          {ORDER_STATUSES.map((status, i) => {
            const completed = i <= currentStatusIndex;
            const active = i === currentStatusIndex;
            const Icon = status.icon;
            return (
              <div key={status.key} className="flex-1 flex flex-col items-center relative">
                {i < ORDER_STATUSES.length - 1 && (
                  <div className={`absolute top-4 left-1/2 right-0 h-0.5 -translate-y-1/2 ${completed && i < currentStatusIndex ? "bg-[#22C55E]" : "bg-brand-border"}`} />
                )}
                <div className={`relative h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                  completed ? (active ? "bg-brand-black" : "bg-[#22C55E]") : "bg-brand-border"
                }`}>
                  <Icon size={14} className={completed ? "text-white" : "text-[#9A9A9A]"} />
                </div>
                <div className="text-center mt-2 px-1">
                  <p className={`text-xs font-semibold ${active ? "text-brand-black font-extrabold" : completed ? "text-[#22C55E]" : "text-[#9A9A9A]"}`}>
                    {status.label}
                  </p>
                  <p className="text-[10px] text-[#9A9A9A] hidden sm:block">{status.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Items */}
        <div className="bg-white rounded-2xl border border-brand-border p-6">
          <h2 className="font-bold text-brand-black mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-14 h-14 rounded-xl bg-brand-surface shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-brand-black">{item.name}</p>
                  <p className="text-xs text-brand-muted">{item.variant} · Qty: {item.qty}</p>
                  <p className="text-xs text-[#9A9A9A] line-clamp-1">{item.custom}</p>
                </div>
                <p className="text-sm font-bold shrink-0">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-border mt-4 pt-4 flex justify-between font-bold text-sm">
            <span>Total</span>
            <span>₹{order.total.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* Delivery info */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-brand-border p-6">
            <h2 className="font-bold text-brand-black mb-3">Delivery Address</h2>
            <p className="text-sm text-brand-muted leading-relaxed">{order.address}</p>
          </div>
          <div className="bg-white rounded-2xl border border-brand-border p-6">
            <h2 className="font-bold text-brand-black mb-3">Need Help?</h2>
            <Link href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Help with Order #${order.id}`)}&body=${encodeURIComponent(`Hi CustomWorks,\n\nI need help with Order #${order.id}.`)}`}>
              <Button variant="outline" size="md" className="w-full gap-2">
                <MessageSquare size={14} className="text-brand-orange" />
                Email Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
