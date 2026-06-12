"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Package,
  ChevronRight,
  Calendar,
  Filter,
  ShoppingBag,
  X,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/lib/useAuth";

interface MockOrder {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
  products: string;
}

const MOCK_ORDERS: MockOrder[] = [];

const statusConfig: Record<string, { label: string; variant: "default" | "success" | "warning" | "error" | "muted" }> = {
  DESIGNING: { label: "Designing", variant: "muted" },
  PROCESSING: { label: "Processing", variant: "warning" },
  READY_TO_SHIP: { label: "Ready to Ship", variant: "warning" },
  DISPATCHED: { label: "Dispatched", variant: "success" },
  DELIVERED: { label: "Delivered", variant: "success" },
  CANCELLED: { label: "Cancelled", variant: "error" },
};

const STATUS_OPTIONS = [
  { value: "all", label: "All Statuses" },
  { value: "DESIGNING", label: "Designing" },
  { value: "PROCESSING", label: "Processing" },
  { value: "READY_TO_SHIP", label: "Ready to Ship" },
  { value: "DISPATCHED", label: "Dispatched" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  const filtered = useMemo(() => {
    return MOCK_ORDERS.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.products.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-brand-muted" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-brand-black">My Orders</h1>
          <p className="text-sm text-brand-muted mt-1">
            {MOCK_ORDERS.length} orders placed
          </p>
        </div>
        <Link href="/products">
          <Button variant="accent" size="sm" className="gap-1.5">
            <ShoppingBag size={14} /> Continue Shopping
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-brand-border p-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A]"
            />
            <input
              type="search"
              placeholder="Search by order ID or product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-brand-border text-sm text-brand-black placeholder:text-[#9A9A9A] focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent bg-white transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-brand-black"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status filter */}
          <div className="relative">
            <Filter
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] pointer-events-none"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 pl-9 pr-8 rounded-xl border border-brand-border text-sm text-brand-black bg-white focus:outline-none focus:ring-2 focus:ring-brand-black appearance-none cursor-pointer"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders list */}
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div className="space-y-3" layout>
            {filtered.map((order, i) => {
              const status = statusConfig[order.status] ?? statusConfig.DESIGNING;
              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <Link
                    href={`/orders/${order.id}`}
                    className="flex items-center justify-between p-4 sm:p-5 bg-white rounded-2xl border border-brand-border hover:shadow-lg hover:border-brand-black/10 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {/* Icon */}
                      <div className="h-11 w-11 rounded-xl bg-brand-surface flex items-center justify-center shrink-0 group-hover:bg-brand-black/5 transition-colors">
                        <Package
                          size={18}
                          className="text-brand-muted group-hover:text-brand-black transition-colors"
                        />
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-bold text-brand-black">
                            #{order.id}
                          </p>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>
                        <p className="text-xs text-brand-muted mt-0.5 truncate">
                          {order.products}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-[#9A9A9A] flex items-center gap-1">
                            <Calendar size={11} />
                            {order.date}
                          </span>
                          <span className="text-xs text-[#9A9A9A]">
                            {order.items} {order.items === 1 ? "item" : "items"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Price + arrow */}
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <p className="text-sm font-black text-brand-black">
                        {formatPrice(order.total)}
                      </p>
                      <ChevronRight
                        size={16}
                        className="text-[#C4C4C4] group-hover:text-brand-black group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-brand-border p-12 text-center shadow-sm"
          >
            <div className="h-16 w-16 mx-auto rounded-2xl bg-brand-surface flex items-center justify-center mb-4">
              <Package size={28} className="text-brand-muted" />
            </div>
            <h3 className="font-bold text-brand-black mb-1">No orders found</h3>
            <p className="text-sm text-brand-muted mb-6">
              {search || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "You haven't placed any orders yet."}
            </p>
            {search || statusFilter !== "all" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                }}
              >
                Clear Filters
              </Button>
            ) : (
              <Link href="/products">
                <Button variant="accent" size="md">
                  Start Shopping
                </Button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
