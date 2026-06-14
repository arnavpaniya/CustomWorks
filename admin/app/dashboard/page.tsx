"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  ShoppingBag,
  Clock,
  CreditCard,
  FileText,
  TrendingUp,
  Users,
  RefreshCw,
  Package,
  LogOut,
  Calendar,
  ChevronRight,
  X,
  Check,
  Truck,
  Sliders,
  FileDown,
  Search,
  Plus,
  Trash2,
  AlertCircle,
  Filter,
  ArrowUpRight,
  Lock,
} from "lucide-react";
import { Chart, registerables } from "chart.js";
import { toast, Toaster } from "sonner";

Chart.register(...registerables);

// Define type structures
interface CustomerSnapshot {
  name: string;
  email: string;
  phone: string;
}

interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

interface Customization {
  text?: string;
  placement: string;
  textColor?: string;
  fontStyle: string;
  uploadedImageUrl?: string;
  additionalNotes?: string;
}

interface OrderItem {
  itemId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  variant: {
    size: string;
    color: string;
  };
  customization: Customization;
  designStatus: string;
}

interface StatusHistory {
  status: string;
  changedAt: string;
  changedBy: string;
  note?: string;
}

interface AdminNote {
  note: string;
  addedAt: string;
  addedBy: string;
}

interface Order {
  id: string;
  date: string;
  customerSnapshot: CustomerSnapshot;
  shippingAddress: ShippingAddress;
  pricing: {
    subtotal: number;
    discountAmount: number;
    discountCode?: string;
    gst: number;
    shippingCharge: number;
    totalAmount: number;
  };
  payment: {
    status: "paid" | "partial" | "pending" | "cod";
    amountPaid: number;
  };
  status: "designing" | "processing" | "ready_to_ship" | "dispatched" | "delivered" | "returned";
  items: OrderItem[];
  statusHistory: StatusHistory[];
  adminNotes: AdminNote[];
  invoiceUrl?: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  variants: string;
  status: "Active" | "Draft" | "Archived";
}

interface PendingDesign {
  orderId: string;
  itemId: string;
  productName: string;
  customerName: string;
  quantity: number;
  customization: Customization;
}

interface ReturnClaim {
  id: string;
  orderId: string;
  customer: string;
  product: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

interface AnalyticsData {
  summary?: {
    totalRevenue: number;
    totalOrders: number;
    pendingDesignApprovals: number;
    returnRequests: number;
  };
  customizations?: {
    placements?: Array<{ name: string; count: number }>;
    colors?: Array<{ name: string; count: number }>;
    coupons?: Array<{ code: string; count: number }>;
  };
  bestsellers?: Array<{
    product: string;
    orders: number;
    quantity: number;
    revenue: number;
  }>;
  revenueHistory?: Array<{
    date: string;
    amount: number;
  }>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://customworks.onrender.com/api";
const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AdminDashboard() {
  const router = useRouter();
  
  // Navigation & Auth States
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [operatorName, setOperatorName] = useState("Mohit Malhotra");
  const [activeTab, setActiveTab] = useState("overview");
  
  // Core Data States
  const [orders, setOrders] = useState<Order[]>([]);
  const [designs, setDesigns] = useState<PendingDesign[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({});
  const [returns, setReturns] = useState<ReturnClaim[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Interactive UI States
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  
  // Inspected Order Drawer State
  const [inspectedOrderId, setInspectedOrderId] = useState<string | null>(null);
  const [inspectedOrder, setInspectedOrder] = useState<Order | null>(null);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [newNote, setNewNote] = useState("");

  // Revision Request Modal State
  const [revisionTarget, setRevisionTarget] = useState<{ orderId: string; itemId: string } | null>(null);
  const [revisionReason, setRevisionReason] = useState("");
  
  // Product CRUD Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [prodForm, setProdForm] = useState({
    name: "",
    price: "",
    stock: "",
    variants: "",
    status: "Active" as "Active" | "Draft" | "Archived",
  });

  // Chart References
  const overviewChartRef = useRef<HTMLCanvasElement | null>(null);
  const insightsChartRef = useRef<HTMLCanvasElement | null>(null);
  const overviewChartInstance = useRef<Chart | null>(null);
  const insightsChartInstance = useRef<Chart | null>(null);

  // Authenticate Admin and Poll Data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      const user = localStorage.getItem("adminUser");
      if (!token) {
        toast.error("Access Denied: Admin session missing");
        router.push("/");
      } else {
        setAdminToken(token);
        if (user) setOperatorName(user);
      }
    }
  }, [router]);

  const fetchData = async (tokenOverride?: string) => {
    const token = tokenOverride || adminToken;
    if (!token) return;

    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };

      // Parallel data fetching for instant response
      const [ordersRes, designsRes, analyticsRes, returnsRes, productsRes] = await Promise.all([
        fetch(`${API_URL}/orders`, { headers }),
        fetch(`${API_URL}/designs/pending`, { headers }),
        fetch(`${API_URL}/analytics/summary`, { headers }),
        fetch(`${API_URL}/returns`, { headers }),
        fetch(`${API_URL}/products`, { headers }),
      ]);

      const [ordersPayload, designsPayload, analyticsPayload, returnsPayload, productsPayload] =
        await Promise.all([
          ordersRes.json(),
          designsRes.json(),
          analyticsRes.json(),
          returnsRes.json(),
          productsRes.json(),
        ]);

      setOrders(ordersPayload.orders || []);
      setDesigns(designsPayload.pending || []);
      setAnalytics(analyticsPayload || {});
      setReturns(returnsPayload.returns || []);
      setProducts(productsPayload.products || []);
      
      toast.success("Operational metrics synchronized!");
    } catch (err) {
      console.error("Sync Ledger Connection failure:", err);
      toast.error("Sync ledger connection error. Verify server is online.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminToken) {
      fetchData();
    }
  }, [adminToken]);

  // Fetch inspected order details when drawer is opened
  useEffect(() => {
    if (inspectedOrderId && adminToken) {
      const fetchOrderDetails = async () => {
        try {
          setDrawerLoading(true);
          const response = await fetch(`${API_URL}/orders/${inspectedOrderId}`, {
            headers: { Authorization: `Bearer ${adminToken}` },
          });
          if (!response.ok) throw new Error("Order details fetch failed");
          const orderData = await response.json();
          setInspectedOrder(orderData);
        } catch (err) {
          console.error(err);
          toast.error("Failed to inspect order detail registry.");
        } finally {
          setDrawerLoading(false);
        }
      };
      fetchOrderDetails();
    } else {
      setInspectedOrder(null);
    }
  }, [inspectedOrderId, adminToken]);

  // Weekly Revenue Growth Chart Mount
  useEffect(() => {
    if (activeTab === "overview" && analytics.revenueHistory && overviewChartRef.current) {
      if (overviewChartInstance.current) {
        overviewChartInstance.current.destroy();
      }

      const hist = analytics.revenueHistory || [];
      const labels = hist.map((h) => h.date);
      const values = hist.map((h) => h.amount);

      const ctx = overviewChartRef.current.getContext("2d");
      if (ctx) {
        overviewChartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Gross collections (INR)",
                data: values,
                borderColor: "#6366f1",
                backgroundColor: "rgba(99, 102, 241, 0.04)",
                borderWidth: 3,
                pointBackgroundColor: "#6366f1",
                pointBorderColor: "#030712",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.35,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
            },
            scales: {
              y: {
                grid: { color: "rgba(255, 255, 255, 0.05)" },
                ticks: { color: "#9ca3af", font: { size: 10, family: "JetBrains Mono" } },
              },
              x: {
                grid: { display: false },
                ticks: { color: "#9ca3af", font: { size: 10, family: "JetBrains Mono" } },
              },
            },
          },
        });
      }
    }

    return () => {
      if (overviewChartInstance.current) {
        overviewChartInstance.current.destroy();
        overviewChartInstance.current = null;
      }
    };
  }, [activeTab, analytics]);

  // Placements Doughnut Chart Mount
  useEffect(() => {
    if (activeTab === "analytics" && analytics.customizations?.placements && insightsChartRef.current) {
      if (insightsChartInstance.current) {
        insightsChartInstance.current.destroy();
      }

      const pl = analytics.customizations.placements || [];
      const labels = pl.map((p) => p.name);
      const values = pl.map((p) => p.count);

      const ctx = insightsChartRef.current.getContext("2d");
      if (ctx) {
        insightsChartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  "rgba(99, 102, 241, 0.85)",
                  "rgba(129, 140, 248, 0.85)",
                  "rgba(165, 180, 252, 0.85)",
                  "rgba(31, 41, 55, 0.85)",
                ],
                borderColor: "#1f2937",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "right",
                labels: {
                  color: "#9ca3af",
                  font: { size: 11, family: "JetBrains Mono", weight: 600 },
                },
              },
            },
            cutout: "65%",
          },
        });
      }
    }

    return () => {
      if (insightsChartInstance.current) {
        insightsChartInstance.current.destroy();
        insightsChartInstance.current = null;
      }
    };
  }, [activeTab, analytics]);

  // Session Termination handler
  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      toast.success("Administrator session securely terminated");
      router.push("/");
    }
  };

  // Status progression workflow trigger
  const handleAdvanceStatus = async (orderId: string, currentStatus: string) => {
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status: currentStatus }),
      });

      if (!response.ok) throw new Error("Fulfillment advancement failed");
      toast.success("Fulfillment advanced successfully!");
      
      // Update local state instantly and reload inspected order details
      setInspectedOrderId(null);
      setTimeout(() => setInspectedOrderId(orderId), 50);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Order fulfillment status transition failure.");
    }
  };

  // Manual payment settlement trigger
  const handleRecordSettlement = async (orderId: string) => {
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) throw new Error("Payment collection failed");
      toast.success("Order outstanding manual balance reconciled!");
      
      if (inspectedOrderId === orderId) {
        setInspectedOrderId(null);
        setTimeout(() => setInspectedOrderId(orderId), 50);
      }
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Outstanding collection ledger clearance failed.");
    }
  };

  // Compile PDF Invoice Trigger
  const handleCompileInvoice = async (orderId: string) => {
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_URL}/invoices/${orderId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) throw new Error("Bill generation failed");
      toast.success("Bill generated via Swipe and saved!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Invoice compilation failure.");
    }
  };

  // CRM Note Submission handler
  const handleAddNote = async (orderId: string) => {
    if (!newNote.trim() || !adminToken) return;
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ note: newNote }),
      });

      if (!response.ok) throw new Error("Note logging failure");
      toast.success("Operator internal note logged!");
      setNewNote("");
      
      // Reload order details
      setInspectedOrderId(null);
      setTimeout(() => setInspectedOrderId(orderId), 50);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Note database transaction failed.");
    }
  };

  // Design Approvals handlers
  const handleApproveDesign = async (orderId: string, itemId: string) => {
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_URL}/designs/${orderId}/${itemId}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) throw new Error("Approval processing failure");
      toast.success("Design layout marked as approved!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Design approval transaction failure.");
    }
  };

  const handleSubmitRevision = async () => {
    if (!revisionTarget || !revisionReason.trim() || !adminToken) return;
    try {
      const response = await fetch(`${API_URL}/designs/${revisionTarget.orderId}/${revisionTarget.itemId}/reject`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ reason: revisionReason }),
      });

      if (!response.ok) throw new Error("Revision parameters save failure");
      toast.success("Revision coordinates dispatched to customer!");
      setRevisionTarget(null);
      setRevisionReason("");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Revision request transaction failure.");
    }
  };

  // Returns Resolving handler
  const handleResolveReturn = async (returnId: string, status: "approved" | "rejected") => {
    if (!adminToken) return;
    try {
      const response = await fetch(`${API_URL}/returns/${returnId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ status, note: `Reconciled by operations admin ${operatorName}.` }),
      });

      if (!response.ok) throw new Error("Return claims reconciliation failure");
      toast.success(`Claim successfully marked as ${status.toUpperCase()}!`);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Return claim ledger update failure.");
    }
  };

  // Products Registry CRUD handlers
  const handleOpenProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProdForm({
        name: product.name,
        price: product.price.toString(),
        stock: product.stock.toString(),
        variants: product.variants,
        status: product.status,
      });
    } else {
      setEditingProduct(null);
      setProdForm({
        name: "",
        price: "",
        stock: "",
        variants: "",
        status: "Active",
      });
    }
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;

    const payload = {
      name: prodForm.name.trim(),
      price: Number(prodForm.price),
      stock: Number(prodForm.stock),
      variants: prodForm.variants.trim(),
      status: prodForm.status,
    };

    const method = editingProduct ? "PUT" : "POST";
    const url = editingProduct ? `${API_URL}/products/${editingProduct.id}` : `${API_URL}/products`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Product registry operation failed");
      toast.success(editingProduct ? "Product profile updated!" : "New product cataloged!");
      setProductModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Product catalog saving transaction failed.");
    }
  };

  const handleDeleteProduct = async (prodId: string) => {
    if (!adminToken) return;
    if (!confirm(`Are you absolutely sure you want to remove product ${prodId} from the customizer catalogue?`)) return;

    try {
      const response = await fetch(`${API_URL}/products/${prodId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (!response.ok) throw new Error("Product deletion failed");
      toast.success("Product deleted from system catalogue!");
      fetchData();
    } catch (err) {
      console.error(err);
      toast.error("Product deletion transaction failed.");
    }
  };

  // Helper formatting INR Currency
  const formatINR = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  // Search & Filter dispatcher
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerSnapshot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerSnapshot.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || o.payment.status === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Unique Customer Map building for CRM tab
  const customerCRMList = (() => {
    const map: Record<string, { name: string; phone: string; ordersCount: number; totalSpend: number }> = {};
    orders.forEach((o) => {
      const email = o.customerSnapshot.email;
      if (!map[email]) {
        map[email] = {
          name: o.customerSnapshot.name,
          phone: o.customerSnapshot.phone,
          ordersCount: 0,
          totalSpend: 0,
        };
      }
      map[email].ordersCount++;
      map[email].totalSpend += o.pricing.totalAmount;
    });

    return Object.entries(map).map(([email, data]) => ({ email, ...data }));
  })();

  return (
    <div className="flex h-screen w-screen bg-[#030712] text-gray-100 font-sans relative overflow-hidden select-none">
      <Toaster position="top-right" theme="dark" />
      
      {/* Background ambient radial glows */}
      <div className="absolute top-[-250px] left-[-250px] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,rgba(0,0,0,0)_75%)] rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-[-250px] right-[-250px] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,rgba(0,0,0,0)_75%)] rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Screen Initializing Loader */}
      <AnimatePresence>
        {loading && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#030712] z-[100] flex flex-col items-center justify-center gap-5"
          >
            <h1 className="text-3xl font-black tracking-tighter uppercase inline-flex items-center gap-2">
              Custom<span className="text-[#6366f1]">Works</span>
            </h1>
            <div className="h-1.5 w-40 bg-gray-800 rounded-full overflow-hidden relative">
              <div className="absolute h-full w-2/3 bg-[#6366f1] rounded-full animate-[pulse_1.5s_infinite] left-1/3"></div>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold font-mono">
              Synchronizing Command Ledger...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation Panel */}
      <aside className="w-72 bg-[#070b13]/60 backdrop-blur-xl border-r border-white/5 flex flex-col justify-between shrink-0 select-none relative z-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[#6366f1]/5 blur-[45px] pointer-events-none"></div>

        <div className="flex flex-col pt-6 flex-1 overflow-hidden">
          {/* Brand Logo */}
          <div className="px-6 mb-6 flex items-center justify-between gap-3">
            <div className="relative w-36 h-10 select-none">
              <Image
                src="/images/logo-v2.png"
                alt="CustomWorks Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
            <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded font-mono">
              COMMAND
            </span>
          </div>

          {/* Active Operator Details */}
          <div className="px-4 mb-6">
            <div className="bg-[#111827]/40 border border-white/5 rounded-2xl p-3 flex items-center gap-3">
              <div className="relative">
                <div className="h-9 w-9 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 font-bold flex items-center justify-center text-sm">
                  {operatorName.charAt(0)}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#030712]"></div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-200 leading-tight">{operatorName}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5 font-mono">Operator</p>
              </div>
            </div>
          </div>

          {/* Scrollable Navigation Items */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
            {[
              { id: "overview", label: "Overview Console", icon: Activity, badge: 0 },
              { id: "orders", label: "Orders Ledger", icon: ShoppingBag, badge: orders.length },
              { id: "designs", label: "Design Approvals", icon: Clock, badge: designs.length, highlight: true },
              { id: "payments", label: "Payments Hub", icon: CreditCard, badge: 0 },
              { id: "invoices", label: "Invoice Desk", icon: FileText, badge: 0 },
              { id: "analytics", label: "Insights & Charts", icon: TrendingUp, badge: 0 },
              { id: "customers", label: "Customer CRM", icon: Users, badge: 0 },
              { id: "returns", label: "Returns Board", icon: RefreshCw, badge: returns.filter((r) => r.status === "pending").length, highlight: true },
              { id: "products", label: "Products Registry", icon: Package, badge: 0 },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-left transition-all duration-200 group relative border border-transparent ${
                    isActive
                      ? "text-white bg-white/[0.04] border-white/5 shadow-md font-bold"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-center gap-3 z-10">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? "text-[#6366f1]" : "text-gray-500 group-hover:text-gray-300"
                      }`}
                    />
                    <span className="text-xs font-semibold tracking-wide">{tab.label}</span>
                  </div>
                  {tab.badge > 0 && (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full z-10 font-mono ${
                        tab.highlight
                          ? "bg-indigo-500 text-white animate-pulse"
                          : "bg-white/10 text-gray-300"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-indicator"
                      className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#6366f1] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Terminate Session Panel */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleSignOut}
            className="w-full bg-[#111827]/40 hover:bg-rose-500/10 hover:text-rose-400 border border-white/5 hover:border-rose-500/20 text-[10px] font-bold uppercase tracking-widest py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-[#030712]">
        {/* Header Console Topbar */}
        <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between bg-[#030712]/80 backdrop-blur-md shrink-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold tracking-tight text-white capitalize">
              {activeTab === "overview" ? "System Overview" : activeTab.replace(/_/g, " ")}
            </h2>
            <div className="h-4 w-px bg-white/10"></div>
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchData()}
              disabled={loading}
              className="h-9 w-9 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 rounded-xl flex items-center justify-center transition-all group disabled:opacity-50 cursor-pointer shadow-sm"
              title="Sync Ledger"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-[#6366f1] transition-transform duration-500 ${
                  loading ? "animate-spin" : "group-hover:rotate-180"
                }`}
              />
            </button>
            <div className="h-6 w-px bg-white/10"></div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 font-mono">
              ONLINE
            </span>
          </div>
        </header>

        {/* Tab panels switch board */}
        <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="min-h-full"
            >
              {/* Tab: Overview */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      {
                        title: "Revenue Ledger",
                        value: formatINR(analytics.summary?.totalRevenue || 0),
                        desc: "Gross cumulative collections",
                        icon: CreditCard,
                        color: "text-indigo-400",
                        badge: "glow-badge-indigo"
                      },
                      {
                        title: "Orders Logged",
                        value: analytics.summary?.totalOrders || 0,
                        desc: "Registered orders in store",
                        icon: ShoppingBag,
                        color: "text-blue-400",
                        badge: "glow-badge-blue"
                      },
                      {
                        title: "Pending Customizers",
                        value: analytics.summary?.pendingDesignApprovals || 0,
                        desc: "Custom designs awaiting audit",
                        icon: Clock,
                        color: "text-amber-400",
                        badge: "glow-badge-amber"
                      },
                      {
                        title: "Returns Board",
                        value: analytics.summary?.returnRequests || 0,
                        desc: "Customer claims in queue",
                        icon: RefreshCw,
                        color:
                          (analytics.summary?.returnRequests || 0) > 0 ? "text-rose-400" : "text-gray-500",
                        alert: (analytics.summary?.returnRequests || 0) > 0,
                        badge: (analytics.summary?.returnRequests || 0) > 0 ? "glow-badge-rose" : "glow-badge-zinc"
                      },
                    ].map((metric, i) => {
                      const Icon = metric.icon;
                      return (
                        <div
                          key={i}
                          className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden"
                        >
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1.5 font-mono">
                                {metric.title}
                              </p>
                              <h3 className="text-2xl font-black text-white tracking-tight">{metric.value}</h3>
                              <p className="text-[10px] text-gray-500 font-semibold mt-1">
                                {metric.desc}
                              </p>
                            </div>
                            <div className={`h-10 w-10 rounded-xl border border-white/5 flex items-center justify-center ${metric.badge}`}>
                              <Icon className={`w-4 h-4 ${metric.color}`} />
                            </div>
                          </div>
                          {metric.alert && (
                            <div className="absolute bottom-3 right-3 text-[8px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 animate-pulse font-mono">
                              Attention
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Weekly Graph + Placement progress columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Graph Column */}
                    <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between h-[360px]">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-white">Revenue Collections Trend</h4>
                          <p className="text-[10px] text-gray-400 font-medium">
                            Weekly ledger statement progress curve
                          </p>
                        </div>
                        <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-bold uppercase px-2 py-0.5 rounded tracking-wider font-mono">
                          Gross INR
                        </span>
                      </div>
                      <div className="flex-1 relative">
                        <canvas ref={overviewChartRef} id="revenueChart"></canvas>
                      </div>
                    </div>

                    {/* Placements customization ratios */}
                    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">Design Placements</h4>
                        <p className="text-[10px] text-gray-400 font-medium mb-4">
                          Customizer selection statistics
                        </p>
                      </div>

                      <div className="space-y-4 overflow-y-auto max-h-[250px] pr-1.5 custom-scrollbar">
                        {analytics.customizations?.placements?.map((p, idx) => {
                          const maxCount = Math.max(
                            ...(analytics.customizations?.placements?.map((pl) => pl.count) || [1])
                          );
                          const percentage = Math.round((p.count / maxCount) * 100);
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-300 font-semibold">{p.name}</span>
                                <span className="text-gray-400 font-mono text-[10px]">{p.count} selections</span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#818cf8] rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Products colors matrix + bestsellers */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Bestsellers table */}
                    <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-white">Registry Bestsellers</h4>
                          <p className="text-[10px] text-gray-400 font-medium">
                            Raw products in high customization demand
                          </p>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 text-[9px] text-gray-400 font-bold uppercase tracking-wider font-mono bg-white/[0.01]">
                              <th className="py-2.5 px-3">Base Product</th>
                              <th className="py-2.5 px-3">Orders count</th>
                              <th className="py-2.5 px-3">Custom items</th>
                              <th className="py-2.5 px-3 text-right">Yield Revenue</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-xs font-semibold">
                            {analytics.bestsellers?.map((b, idx) => (
                              <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                                <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                                  <Package className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>{b.product}</span>
                                </td>
                                <td className="py-3 px-3 text-gray-300 font-mono text-[11px]">{b.orders} orders</td>
                                <td className="py-3 px-3 text-gray-400">{b.quantity} pcs</td>
                                <td className="py-3 px-3 text-white font-black text-right font-mono">
                                  {formatINR(b.revenue)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Products Color Matrix */}
                    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">Product Color Matrix</h4>
                        <p className="text-[10px] text-gray-400 font-medium mb-4">
                          Top product colors dispatched
                        </p>
                      </div>

                      <div className="space-y-4 overflow-y-auto max-h-[250px] pr-1.5 custom-scrollbar">
                        {analytics.customizations?.colors?.map((c, idx) => {
                          const maxCount = Math.max(
                            ...(analytics.customizations?.colors?.map((cl) => cl.count) || [1])
                          );
                          const percentage = Math.round((c.count / maxCount) * 100);
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-300 font-semibold">{c.name}</span>
                                <span className="text-gray-400 font-mono text-[10px]">{c.count} items</span>
                              </div>
                              <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#a5b4fc] rounded-full transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Orders Ledger */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  {/* Search and filter toolbar */}
                  <div className="glass-panel rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Search query field */}
                    <div className="w-full md:w-96 relative">
                      <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="Search Client ID, Name, or Email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 font-medium"
                      />
                    </div>

                    {/* Status & payment select widgets */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <div className="flex items-center gap-2">
                        <Filter className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider font-mono">Filters:</span>
                      </div>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="glass-input rounded-xl px-3 py-2 text-[10px] font-bold uppercase text-gray-300 font-mono cursor-pointer"
                      >
                        <option value="all">ALL STATUSES</option>
                        <option value="designing">DESIGNING</option>
                        <option value="processing">PROCESSING</option>
                        <option value="ready_to_ship">READY TO SHIP</option>
                        <option value="dispatched">DISPATCHED</option>
                        <option value="delivered">DELIVERED</option>
                        <option value="returned">RETURNED</option>
                      </select>

                      <select
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="glass-input rounded-xl px-3 py-2 text-[10px] font-bold uppercase text-gray-300 font-mono cursor-pointer"
                      >
                        <option value="all">ALL PAYMENTS</option>
                        <option value="paid">PAID</option>
                        <option value="partial">PARTIAL</option>
                        <option value="pending">PENDING</option>
                      </select>
                    </div>
                  </div>

                  {/* Master orders table ledger */}
                  <div className="glass-panel rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 text-[9px] text-gray-400 font-bold uppercase tracking-wider bg-white/[0.01] font-mono">
                            <th className="py-4 px-6">ID</th>
                            <th className="py-4 px-6">Timestamp</th>
                            <th className="py-4 px-6">Customer Snapshot</th>
                            <th className="py-4 px-6">Amount</th>
                            <th className="py-4 px-6">Billing</th>
                            <th className="py-4 px-6">Fulfillment</th>
                            <th className="py-4 px-6 text-right"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs font-semibold">
                          {filteredOrders.length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-12 text-center text-gray-500 italic">
                                No registered orders match query coordinates.
                              </td>
                            </tr>
                          ) : (
                            filteredOrders.map((o) => {
                              // Status color badges
                              let statusClass = "glow-badge-zinc";
                              if (o.status === "designing")
                                statusClass = "glow-badge-amber";
                              else if (o.status === "processing")
                                statusClass = "glow-badge-blue";
                              else if (o.status === "ready_to_ship")
                                statusClass = "glow-badge-purple";
                              else if (o.status === "dispatched")
                                statusClass = "glow-badge-indigo";
                              else if (o.status === "delivered")
                                statusClass = "glow-badge-emerald";
                              else if (o.status === "returned")
                                statusClass = "glow-badge-rose";

                              // Payment billing state badges
                              let payClass = "glow-badge-zinc";
                              if (o.payment.status === "paid")
                                payClass = "glow-badge-emerald";
                              else if (o.payment.status === "partial")
                                payClass = "glow-badge-amber";
                              else if (o.payment.status === "pending")
                                payClass = "glow-badge-rose";
                              else if (o.payment.status === "cod")
                                payClass = "glow-badge-zinc";

                              const d = new Date(o.date);
                              const dStr = `${d.getDate()} ${monthsShort[d.getMonth()]} ${d
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;

                              return (
                                <tr
                                  key={o.id}
                                  className="hover:bg-white/[0.01] border-b border-white/5 transition-colors"
                                >
                                  <td className="py-4 px-6 font-bold font-mono text-gray-200 text-xs">
                                    {o.id}
                                  </td>
                                  <td className="py-4 px-6 text-gray-400 font-mono font-medium">{dStr}</td>
                                  <td className="py-4 px-6">
                                    <p className="text-xs font-bold text-white">
                                      {o.customerSnapshot.name}
                                    </p>
                                    <p className="text-[10px] text-gray-500 font-semibold font-mono">
                                      {o.customerSnapshot.email}
                                    </p>
                                  </td>
                                  <td className="py-4 px-6 font-bold text-gray-150 font-mono">
                                    {formatINR(o.pricing.totalAmount)}
                                  </td>
                                  <td className="py-4 px-6">
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider font-mono ${payClass}`}>
                                      {o.payment.status}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6">
                                    <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider font-mono ${statusClass}`}>
                                      {o.status.replace(/_/g, " ")}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6 text-right">
                                    <button
                                      onClick={() => setInspectedOrderId(o.id)}
                                      className="glow-button-secondary text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg inline-flex items-center gap-1.5 cursor-pointer font-mono"
                                    >
                                      <span>Inspect</span>
                                      <ChevronRight className="w-3 h-3" />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Design Approvals */}
              {activeTab === "designs" && (
                <div className="space-y-6">
                  {designs.length === 0 ? (
                    <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3">
                      <Check className="w-10 h-10 text-emerald-400 bg-emerald-500/10 p-2.5 rounded-full border border-emerald-500/20" />
                      <h4 className="text-sm font-bold text-white">All Clear!</h4>
                      <p className="text-xs text-gray-400">
                        No customized layout alignments are currently awaiting design approvals audit.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="designApprovalsGrid">
                      {designs.map((d, index) => {
                        const mockImage =
                          d.customization.uploadedImageUrl || "/uploads/designs/design-tee-front.jpg";
                        return (
                          <div
                            key={index}
                            className="glass-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between hover:border-indigo-500/20 transition-all duration-300"
                          >
                            <div className="absolute top-0 left-0 w-full h-[3px] bg-amber-500/50"></div>

                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                              {/* Layout Canvas preview */}
                              <div className="w-full md:w-36 h-36 bg-[#030712] border border-white/5 rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative group shadow-inner">
                                <img
                                  src={mockImage}
                                  alt="Custom design preview"
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=300";
                                  }}
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <span className="text-[9px] font-bold uppercase text-white bg-black/60 px-2 py-1 rounded font-mono">
                                    View Canvas
                                  </span>
                                </div>
                              </div>

                              {/* Product Specifications */}
                              <div className="flex-1 space-y-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">
                                      {d.orderId}
                                    </span>
                                    <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                                    <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider font-mono">
                                      Awaiting approval
                                    </span>
                                  </div>
                                  <h4 className="text-sm font-bold text-white">{d.productName}</h4>
                                  <p className="text-[10px] text-gray-400 font-semibold mt-0.5">
                                    Client: {d.customerName}
                                  </p>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-[10px] bg-black/40 p-2.5 rounded-xl border border-white/5 font-mono">
                                  <div>
                                    <span className="text-gray-500 block">PLACEMENT:</span>
                                    <span className="text-gray-200 font-semibold">{d.customization.placement}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 block">TEXT COLOR:</span>
                                    <span
                                      className="text-gray-200 font-semibold"
                                      style={{ color: d.customization.textColor || "#FFF" }}
                                    >
                                      {d.customization.textColor || "Standard"}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 block">FONT STYLE:</span>
                                    <span className="text-gray-200 font-semibold">
                                      {d.customization.fontStyle}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 block">QUANTITY:</span>
                                    <span className="text-gray-200 font-semibold">{d.quantity} pcs</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Revision Decision triggers */}
                            <div className="space-y-4 pt-4 border-t border-white/5">
                              <div>
                                <span className="text-[9px] font-bold uppercase text-gray-500 block mb-1 font-mono">
                                  Customization Notes:
                                </span>
                                <p className="text-xs text-gray-400 bg-black/20 p-3 rounded-xl border border-white/5 italic">
                                  "{d.customization.additionalNotes || "No special requirements logged."}"
                                </p>
                              </div>

                              <div className="flex gap-3 justify-end">
                                <button
                                  onClick={() => setRevisionTarget({ orderId: d.orderId, itemId: d.itemId })}
                                  className="px-4 py-2 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  <span>Request Revision</span>
                                </button>
                                <button
                                  onClick={() => handleApproveDesign(d.orderId, d.itemId)}
                                  className="glow-button px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Approve design</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: Payments Hub */}
              {activeTab === "payments" && (
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] text-gray-400 font-bold uppercase tracking-wider bg-white/[0.01] font-mono">
                          <th className="py-4 px-6">ID</th>
                          <th className="py-4 px-6">Customer Snapshot</th>
                          <th className="py-4 px-6">Invoice value</th>
                          <th className="py-4 px-6">Reconciled</th>
                          <th className="py-4 px-6">Balance Outstanding</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs font-semibold">
                        {orders.map((o) => {
                          const outstanding =
                            o.payment.status === "paid"
                              ? 0
                              : o.pricing.totalAmount - o.payment.amountPaid;

                          let payClass = "glow-badge-zinc";
                          if (o.payment.status === "paid")
                            payClass = "glow-badge-emerald";
                          else if (o.payment.status === "partial")
                            payClass = "glow-badge-amber";
                          else if (o.payment.status === "pending")
                            payClass = "glow-badge-rose";
                          else if (o.payment.status === "cod")
                            payClass = "glow-badge-zinc";

                          const isPaid = o.payment.status === "paid";

                          return (
                            <tr
                              key={o.id}
                              className="hover:bg-white/[0.01] border-b border-white/5 transition-colors"
                            >
                              <td className="py-4 px-6 font-bold font-mono text-gray-200 text-xs">
                                {o.id}
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-xs font-bold text-white">
                                  {o.customerSnapshot.name}
                                </p>
                                <p className="text-[10px] text-gray-500 font-semibold font-mono">
                                  {o.customerSnapshot.phone}
                                </p>
                              </td>
                              <td className="py-4 px-6 font-bold text-gray-200 font-mono">
                                {formatINR(o.pricing.totalAmount)}
                              </td>
                              <td className="py-4 px-6 font-bold text-gray-400 font-mono">
                                {formatINR(o.payment.amountPaid)}
                              </td>
                              <td
                                className={`py-4 px-6 font-bold font-mono ${
                                  outstanding > 0 ? "text-indigo-400" : "text-gray-500"
                                }`}
                              >
                                {formatINR(outstanding)}
                              </td>
                              <td className="py-4 px-6">
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider font-mono ${payClass}`}>
                                  {o.payment.status}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                {isPaid ? (
                                  <span className="text-[9px] font-bold uppercase text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1.5 rounded-xl inline-flex items-center gap-1 font-mono">
                                    <Check className="w-3 h-3" />
                                    <span>Settled</span>
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleRecordSettlement(o.id)}
                                    className="glow-button text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg inline-flex items-center gap-1.5 cursor-pointer font-mono"
                                  >
                                    <CreditCard className="w-3 h-3" />
                                    <span>Record Settlement</span>
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab: Invoice Desk */}
              {activeTab === "invoices" && (
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] text-gray-400 font-bold uppercase tracking-wider bg-white/[0.01] font-mono">
                          <th className="py-4 px-6">ID</th>
                          <th className="py-4 px-6">Recipient Name</th>
                          <th className="py-4 px-6">Compiled date</th>
                          <th className="py-4 px-6">Order Total</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs font-semibold">
                        {orders.map((o) => {
                          const d = new Date(o.date);
                          const dStr = `${d.getDate()} ${monthsShort[d.getMonth()]} ${d.getFullYear()}`;
                          const hasInvoice = !!o.invoiceUrl;

                          return (
                            <tr
                              key={o.id}
                              className="hover:bg-white/[0.01] border-b border-white/5 transition-colors"
                            >
                              <td className="py-4 px-6 font-bold font-mono text-gray-200 text-xs">
                                {o.id}
                              </td>
                              <td className="py-4 px-6 font-bold text-white">
                                {o.customerSnapshot.name}
                              </td>
                              <td className="py-4 px-6 text-gray-500 font-semibold font-mono">{dStr}</td>
                              <td className="py-4 px-6 font-bold text-gray-200 font-mono">
                                {formatINR(o.pricing.totalAmount)}
                              </td>
                              <td className="py-4 px-6">
                                {hasInvoice ? (
                                  <span className="text-[9px] font-bold uppercase text-emerald-400 bg-emerald-500/5 border border-emerald-500/15 px-2.5 py-0.5 rounded-full tracking-wider font-mono">
                                    Generated
                                  </span>
                                ) : (
                                  <span className="text-[9px] font-bold uppercase text-amber-500 bg-amber-500/5 border border-amber-500/15 px-2.5 py-0.5 rounded-full tracking-wider font-mono animate-pulse">
                                    Awaiting Generation
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-6 text-right">
                                {hasInvoice && (
                                  <a
                                    href={`${API_URL}/invoices/${o.id}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="glow-button-secondary text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all inline-flex items-center gap-1 text-gray-300 hover:text-white mr-2 font-mono"
                                  >
                                    <FileDown className="w-3 h-3 text-[#6366f1]" />
                                    <span>Download Bill</span>
                                  </a>
                                )}
                                <button
                                  onClick={() => handleCompileInvoice(o.id)}
                                  className="glow-button text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg inline-flex items-center gap-1.5 cursor-pointer font-mono"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                  <span>{hasInvoice ? "Re-generate" : "Generate Bill"}</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab: Insights & Charts */}
              {activeTab === "analytics" && (
                <div className="space-y-6">
                  {/* Summary progress metric columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Placements layout distribution doughnut */}
                    <div className="glass-panel rounded-2xl p-6 h-[340px] flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white">Visual Customization Distribution</h4>
                        <p className="text-[10px] text-gray-400 font-medium mb-4">
                          Popular design coordinates and canvas layouts
                        </p>
                      </div>
                      <div className="flex-1 relative">
                        <canvas ref={insightsChartRef} id="placementsPieChart"></canvas>
                      </div>
                    </div>

                    {/* Coupons code utilization progress bars */}
                    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">Coupon Utilization Ratio</h4>
                        <p className="text-[10px] text-gray-400 font-medium mb-4">
                          Promo code conversions analytics
                        </p>
                      </div>

                      <div className="space-y-3.5 overflow-y-auto max-h-[240px] pr-1 custom-scrollbar">
                        {analytics.customizations?.coupons?.map((cp, idx) => (
                          <div
                            key={idx}
                            className="bg-[#111827]/40 border border-white/5 rounded-xl p-3 flex items-center justify-between hover:border-indigo-500/20 transition-all duration-300"
                          >
                            <div>
                              <span className="text-[9px] font-bold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded font-mono">
                                {cp.code}
                              </span>
                              <p className="text-[10px] text-gray-500 font-bold mt-1">
                                PROMO DISCOUNT APPLIED
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs font-black text-white font-mono">
                                {cp.count} conversions
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* General Customization Stats summary */}
                    <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white mb-0.5">Customizer Performance</h4>
                        <p className="text-[10px] text-gray-400 font-medium mb-4">
                          Overall customized options stats
                        </p>
                      </div>

                      <div className="space-y-3.5 font-semibold text-xs text-gray-400">
                        <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                          <span>Awaiting Approvals</span>
                          <span className="text-amber-400 font-bold font-mono">
                            {analytics.summary?.pendingDesignApprovals || 0} layouts
                          </span>
                        </div>
                        <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                          <span>Return claims ratio</span>
                          <span
                            className={`font-bold font-mono ${
                              (analytics.summary?.returnRequests || 0) > 0
                                ? "text-rose-400"
                                : "text-emerald-400"
                            }`}
                          >
                            {analytics.summary?.returnRequests || 0} claims pending
                          </span>
                        </div>
                        <div className="bg-[#111827]/40 border border-white/5 p-4 rounded-xl flex items-center justify-between">
                          <span>Total conversions value</span>
                          <span className="text-white font-black text-sm font-mono">
                            {formatINR(analytics.summary?.totalRevenue || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Customer CRM */}
              {activeTab === "customers" && (
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] text-gray-400 font-bold uppercase tracking-wider bg-white/[0.01] font-mono">
                          <th className="py-4 px-6">Customer profile</th>
                          <th className="py-4 px-6">Contact registry</th>
                          <th className="py-4 px-6">Orders conversions</th>
                          <th className="py-4 px-6">Total spendings</th>
                          <th className="py-4 px-6">Segment classification</th>
                          <th className="py-4 px-6 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs font-semibold">
                        {customerCRMList.map((c, idx) => {
                          let seg = "VIP Client";
                          let segClass = "glow-badge-purple";

                          if (c.totalSpend < 2000) {
                            seg = "Standard Client";
                            segClass = "glow-badge-zinc";
                          } else if (c.totalSpend < 8000) {
                            seg = "High Potential";
                            segClass = "glow-badge-blue";
                          }

                          return (
                            <tr
                              key={idx}
                              className="hover:bg-white/[0.01] border-b border-white/5 transition-colors"
                            >
                              <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                                <div className="h-7 w-7 rounded-full bg-indigo-500/10 text-indigo-400 font-bold text-xs flex items-center justify-center border border-indigo-500/20">
                                  {c.name.charAt(0)}
                                </div>
                                <span>{c.name}</span>
                              </td>
                              <td className="py-4 px-6">
                                <p className="text-xs text-gray-300 font-semibold font-mono">{c.email}</p>
                                <p className="text-[10px] text-gray-500 font-semibold font-mono">{c.phone}</p>
                              </td>
                              <td className="py-4 px-6 font-bold text-gray-400 font-mono">
                                {c.ordersCount} customized orders
                              </td>
                              <td className="py-4 px-6 font-black text-white font-mono">
                                {formatINR(c.totalSpend)}
                              </td>
                              <td className="py-4 px-6">
                                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider font-mono ${segClass}`}>
                                  {seg}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider font-mono">
                                  Active Segment
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab: Returns Board */}
              {activeTab === "returns" && (
                <div className="glass-panel rounded-2xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[9px] text-gray-400 font-bold uppercase tracking-wider bg-white/[0.01] font-mono">
                          <th className="py-4 px-6">ID</th>
                          <th className="py-4 px-6">Order ID</th>
                          <th className="py-4 px-6">Client Name</th>
                          <th className="py-4 px-6">Product details</th>
                          <th className="py-4 px-6">Rejection claim reason</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs font-semibold">
                        {returns.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-gray-500 italic">
                              No customer return claims currently filed in database ledger.
                            </td>
                          </tr>
                        ) : (
                          returns.map((r) => {
                            let statusClass = "glow-badge-zinc";
                            if (r.status === "approved")
                              statusClass = "glow-badge-emerald";
                            else if (r.status === "rejected")
                              statusClass = "glow-badge-rose";
                            else if (r.status === "pending")
                              statusClass = "glow-badge-amber animate-pulse";

                            const isPending = r.status === "pending";

                            return (
                              <tr
                                key={r.id}
                                className="hover:bg-white/[0.01] border-b border-white/5 transition-colors"
                              >
                                <td className="py-4 px-6 font-bold font-mono text-gray-200 text-xs">
                                  {r.id}
                                </td>
                                <td className="py-4 px-6 font-bold text-gray-400 font-mono">
                                  {r.orderId}
                                </td>
                                <td className="py-4 px-6 font-bold text-white">{r.customer}</td>
                                <td className="py-4 px-6 font-semibold text-gray-300">{r.product}</td>
                                <td className="py-4 px-6 text-gray-400 italic">"{r.reason}"</td>
                                <td className="py-4 px-6">
                                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider font-mono ${statusClass}`}>
                                    {r.status}
                                  </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  {isPending ? (
                                    <div className="flex gap-2 justify-end">
                                      <button
                                        onClick={() => handleResolveReturn(r.id, "rejected")}
                                        className="bg-transparent hover:bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all duration-300 cursor-pointer font-mono"
                                      >
                                        Reject
                                      </button>
                                      <button
                                        onClick={() => handleResolveReturn(r.id, "approved")}
                                        className="glow-button text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all duration-300 cursor-pointer font-mono"
                                      >
                                        Approve Refund
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                                      Case Closed
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab: Products Registry */}
              {activeTab === "products" && (
                <div className="space-y-6">
                  {/* Product CRUD Action toolbar */}
                  <div className="glass-panel rounded-2xl p-5 flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold text-white">Registered Products Catalog</h4>
                      <p className="text-[10px] text-gray-400 font-medium">
                        Inventory listing for the storefront customizer
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenProductModal()}
                      className="glow-button font-bold text-xs uppercase tracking-widest py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer font-mono"
                    >
                      <Plus className="w-4 h-4 animate-pulse" />
                      <span>Register Product</span>
                    </button>
                  </div>

                  {/* Registered products grid */}
                  <div className="glass-panel rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 text-[9px] text-gray-400 font-bold uppercase tracking-wider bg-white/[0.01] font-mono">
                            <th className="py-4 px-6">ID</th>
                            <th className="py-4 px-6">Product name</th>
                            <th className="py-4 px-6">Base Unit Price</th>
                            <th className="py-4 px-6">Raw Stock Balance</th>
                            <th className="py-4 px-6">Custom variants</th>
                            <th className="py-4 px-6">Status</th>
                            <th className="py-4 px-6 text-right"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs font-semibold">
                          {products.map((p) => {
                            let statusClass = "glow-badge-zinc";
                            if (p.status === "Active")
                              statusClass = "glow-badge-emerald";
                            else if (p.status === "Draft")
                              statusClass = "glow-badge-amber";
                            else if (p.status === "Archived")
                              statusClass = "glow-badge-zinc";

                            return (
                              <tr
                                key={p.id}
                                className="hover:bg-white/[0.01] border-b border-white/5 transition-colors"
                              >
                                <td className="py-4 px-6 font-bold font-mono text-gray-200 text-xs">
                                  {p.id}
                                </td>
                                <td className="py-4 px-6 font-bold text-white flex items-center gap-2">
                                  <Package className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>{p.name}</span>
                                </td>
                                <td className="py-4 px-6 font-bold text-gray-200 font-mono">
                                  {formatINR(p.price)}
                                </td>
                                <td
                                  className={`py-4 px-6 font-mono font-bold ${
                                    p.stock < 15 ? "text-rose-400 font-black animate-pulse" : "text-gray-300"
                                  }`}
                                >
                                  {p.stock} units raw
                                </td>
                                <td className="py-4 px-6 font-semibold text-gray-400">{p.variants}</td>
                                <td className="py-4 px-6">
                                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full tracking-wider font-mono ${statusClass}`}>
                                    {p.status}
                                  </span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <button
                                    onClick={() => handleOpenProductModal(p)}
                                    className="glow-button-secondary text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg inline-flex items-center gap-1 text-gray-300 mr-2 cursor-pointer font-mono"
                                  >
                                    <Sliders className="w-3 h-3 text-[#6366f1]" />
                                    <span>Adjust</span>
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(p.id)}
                                    className="bg-transparent hover:bg-rose-500/10 hover:text-rose-400 border border-white/5 hover:border-rose-500/20 text-[10px] font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all duration-300 inline-flex items-center gap-1 cursor-pointer font-mono"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>Remove</span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Slide-in Order Details Right Drawer */}
      <AnimatePresence>
        {inspectedOrderId && (
          <>
            {/* Drawer Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInspectedOrderId(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 cursor-pointer"
            />

            {/* Slider Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 210 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-[550px] bg-[#070b13]/90 backdrop-blur-xl border-l border-white/5 shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Top Header */}
              <div className="h-20 px-6 border-b border-white/5 flex items-center justify-between bg-black/20 relative">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                <h3 className="text-xs font-bold uppercase text-white tracking-widest inline-flex items-center gap-2 font-mono">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>Order: #{inspectedOrderId}</span>
                </h3>
                <button
                  onClick={() => setInspectedOrderId(null)}
                  className="h-8 w-8 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 flex items-center justify-center transition-colors cursor-pointer text-gray-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-black/10">
                {drawerLoading ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-500">
                    <RefreshCw className="w-8 h-8 animate-spin text-[#6366f1]" />
                    <p className="text-[10px] uppercase tracking-wider font-bold font-mono">
                      Syncing order detail registry...
                    </p>
                  </div>
                ) : inspectedOrder ? (
                  <>
                    {/* Status Advance Action bar */}
                    <div className="flex gap-3 bg-[#111827]/40 p-4 border border-white/5 rounded-2xl">
                      {(() => {
                        const workflow = ["designing", "processing", "ready_to_ship", "dispatched", "delivered"];
                        const curIdx = workflow.indexOf(inspectedOrder.status);
                        const canAdvance = curIdx !== -1 && curIdx < workflow.length - 1;

                        return canAdvance ? (
                          <button
                            onClick={() => handleAdvanceStatus(inspectedOrder.id, inspectedOrder.status)}
                            className="flex-1 glow-button text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                          >
                            <Truck className="w-4 h-4" />
                            <span>Advance: {workflow[curIdx + 1].toUpperCase().replace(/_/g, " ")}</span>
                          </button>
                        ) : (
                          <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 select-none font-mono">
                            <Check className="w-4 h-4" />
                            <span>Fulfillment Completed</span>
                          </div>
                        );
                      })()}

                      {inspectedOrder.payment.status !== "paid" && (
                        <button
                          onClick={() => handleRecordSettlement(inspectedOrder.id)}
                          className="flex-1 glow-button-secondary text-gray-300 hover:text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                        >
                          <CreditCard className="w-4 h-4 text-indigo-400" />
                          <span>Reconcile balance</span>
                        </button>
                      )}
                    </div>

                    {/* Profile and Destination details */}
                    <div className="grid grid-cols-2 gap-6 bg-[#111827]/20 border border-white/5 p-5 rounded-2xl">
                      <div>
                        <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider block mb-2 font-mono">
                          Customer Profile
                        </span>
                        <p className="text-sm font-bold text-white">{inspectedOrder.customerSnapshot.name}</p>
                        <p className="text-xs text-gray-300 mt-1 font-mono">
                          {inspectedOrder.customerSnapshot.email}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 font-mono">
                          {inspectedOrder.customerSnapshot.phone}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider block mb-2 font-mono">
                          Shipping Destination
                        </span>
                        <p className="text-xs font-bold text-white">{inspectedOrder.shippingAddress.name}</p>
                        <p className="text-xs text-gray-400 leading-relaxed mt-1">
                          {inspectedOrder.shippingAddress.line1}
                          <br />
                          {inspectedOrder.shippingAddress.line2 && (
                            <>
                              {inspectedOrder.shippingAddress.line2}
                              <br />
                            </>
                          )}
                          {inspectedOrder.shippingAddress.city}, {inspectedOrder.shippingAddress.state} —{" "}
                          <span className="font-mono text-gray-300">{inspectedOrder.shippingAddress.pincode}</span>
                        </p>
                      </div>
                    </div>

                    {/* Customized product list */}
                    <div className="space-y-3">
                      <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider block font-mono">
                        Customized Items
                      </span>
                      {inspectedOrder.items.map((item, index) => {
                        const mockImage =
                          item.customization.uploadedImageUrl || "/uploads/designs/design-tee-front.jpg";
                        return (
                          <div
                            key={index}
                            className="bg-[#111827]/40 border border-white/5 rounded-2xl p-4 flex gap-4"
                          >
                            <div className="w-20 h-20 bg-black/60 border border-white/5 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                              <img
                                src={mockImage}
                                alt="thumbnail"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=200";
                                }}
                              />
                            </div>
                            <div className="flex-1 space-y-1.5">
                              <h4 className="text-xs font-bold text-white">{item.productName}</h4>
                              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider font-mono">
                                Qty: {item.quantity} × {formatINR(item.unitPrice)} • size:{" "}
                                {item.variant.size} • color: {item.variant.color}
                              </p>
                              <div className="text-[10px] bg-black/45 p-2.5 rounded-xl border border-white/5 text-gray-300 mt-2 space-y-1 font-mono">
                                <p>
                                  <span className="text-gray-500 font-bold">CUSTOM text:</span> "
                                  {item.customization.text || "N/A"}"
                                </p>
                                <p>
                                  <span className="text-gray-500 font-bold">PLACEMENT:</span>{" "}
                                  {item.customization.placement}
                                </p>
                                <p>
                                  <span className="text-gray-500 font-bold">STYLE:</span>{" "}
                                  {item.customization.fontStyle}
                                </p>
                                <p>
                                  <span className="text-gray-500 font-bold">DESIGN STATUS:</span>{" "}
                                  <span className="text-[#6366f1] uppercase font-bold">
                                    {item.designStatus.replace(/_/g, " ")}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reconcile details calculations pricing */}
                    <div className="bg-[#111827]/40 border border-white/5 p-5 rounded-2xl space-y-3.5 font-mono">
                      <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider block">
                        Ledger Pricing Statement
                      </span>
                      <div className="space-y-2 text-xs font-semibold text-gray-400">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span className="text-white">{formatINR(inspectedOrder.pricing.subtotal)}</span>
                        </div>
                        {inspectedOrder.pricing.discountAmount > 0 && (
                          <div className="flex justify-between text-[#6366f1]">
                            <span>Discount (applied {inspectedOrder.pricing.discountCode})</span>
                            <span>-{formatINR(inspectedOrder.pricing.discountAmount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>GST (18% applied tax)</span>
                          <span className="text-white">{formatINR(inspectedOrder.pricing.gst)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping charges</span>
                          <span className="text-white">
                            {formatINR(inspectedOrder.pricing.shippingCharge)}
                          </span>
                        </div>
                        <div className="h-px bg-white/5 my-2"></div>
                        <div className="flex justify-between text-white font-bold text-sm">
                          <span>Invoice Grand Total</span>
                          <span className="text-[#6366f1] font-black">
                            {formatINR(inspectedOrder.pricing.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status history log timeline */}
                    <div className="space-y-4">
                      <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider block font-mono">
                        Ledger Tracking Timeline Logs
                      </span>
                      <div className="bg-[#111827]/20 border border-white/5 rounded-2xl p-5 space-y-4">
                        {inspectedOrder.statusHistory.map((h, i) => {
                          const d = new Date(h.changedAt);
                          const dStr = `${d.getDate()} ${monthsShort[d.getMonth()]} ${d
                            .getHours()
                            .toString()
                            .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
                          return (
                            <div
                              key={i}
                              className="relative pl-6 pb-4 last:pb-0 border-l border-white/5"
                            >
                              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-[#6366f1]/20 border border-[#6366f1]"></div>
                              <p className="text-xs font-bold text-white capitalize leading-none">
                                {h.status.replace(/_/g, " ")}
                              </p>
                              <p className="text-[10px] text-gray-500 font-semibold mt-1 font-mono">
                                {dStr} — Logged by: {h.changedBy}
                              </p>
                              <p className="text-xs text-gray-400 mt-1.5 italic font-medium">
                                "{h.note || "Status updated."}"
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Notes addition internally */}
                    <div className="space-y-4">
                      <span className="text-[9px] font-bold uppercase text-gray-500 tracking-wider block font-mono">
                        CRM Internal Operator Notes
                      </span>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Log internal operator details..."
                            value={newNote}
                            onChange={(e) => setNewNote(e.target.value)}
                            className="flex-1 glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-gray-650"
                          />
                          <button
                            onClick={() => handleAddNote(inspectedOrder.id)}
                            className="glow-button font-bold text-xs uppercase tracking-widest px-4 rounded-xl cursor-pointer font-mono"
                          >
                            Log
                          </button>
                        </div>
                        <div className="space-y-2.5 max-h-48 overflow-y-auto">
                          {inspectedOrder.adminNotes.length === 0 ? (
                            <p className="text-xs text-gray-500 italic p-3 text-center">
                              No operator details logged yet.
                            </p>
                          ) : (
                            inspectedOrder.adminNotes.map((n, i) => {
                              const d = new Date(n.addedAt);
                              const dStr = `${d.getDate()} ${monthsShort[d.getMonth()]} ${d
                                .getHours()
                                .toString()
                                .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
                              return (
                                <div
                                  key={i}
                                  className="bg-[#111827]/40 border border-white/5 rounded-xl p-3 space-y-1.5"
                                >
                                  <div className="flex justify-between font-mono text-[9px]">
                                    <span className="font-bold text-indigo-400 uppercase">
                                      {n.addedBy}
                                    </span>
                                    <span className="text-gray-500 font-semibold">{dStr}</span>
                                  </div>
                                  <p className="text-xs text-gray-300 font-medium italic">"{n.note}"</p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-center text-gray-500 font-mono">Order not found.</p>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modal: Design Approval Revision Details */}
      <AnimatePresence>
        {revisionTarget && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRevisionTarget(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="glass-panel rounded-2xl w-full max-w-[480px] p-6 shadow-2xl relative overflow-hidden z-10"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-rose-500"></div>

              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white inline-flex items-center gap-2 font-mono">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>Request design revision</span>
                </h4>
                <button
                  onClick={() => setRevisionTarget(null)}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-gray-400 leading-relaxed">
                  Log the specific alignment revision coordinates or textual tweaks required. This instruction set
                  will be dispatched directly to the customer's portal dashboard.
                </p>

                <div>
                  <label className="block text-[9px] font-bold uppercase text-gray-500 tracking-wider mb-2 font-mono">
                    Revision instructions
                  </label>
                  <textarea
                    id="revisionReasonText"
                    required
                    rows={4}
                    value={revisionReason}
                    onChange={(e) => setRevisionReason(e.target.value)}
                    placeholder="e.g. Please align the text centered on the chest block, keeping within raw bounding constraints..."
                    className="w-full glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 font-medium resize-none font-sans"
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setRevisionTarget(null)}
                    className="px-4 py-2 bg-transparent hover:bg-white/[0.04] text-gray-300 border border-white/5 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitRevision}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all duration-300 cursor-pointer font-mono"
                  >
                    Dispatch Request
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Base Product Registry CRUD Form */}
      <AnimatePresence>
        {productModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProductModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Form modal container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="glass-panel rounded-2xl w-full max-w-[500px] p-6 shadow-2xl relative overflow-hidden z-10"
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-[#6366f1]"></div>

              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xs font-bold uppercase tracking-widest text-white inline-flex items-center gap-2 font-mono">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>{editingProduct ? "Adjust Registered Product" : "Register Product"}</span>
                </h4>
                <button
                  onClick={() => setProductModalOpen(false)}
                  className="text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold text-gray-400">
                <div>
                  <label className="block text-[9px] font-bold uppercase text-gray-500 tracking-wider mb-2 font-mono">
                    Product name
                  </label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    placeholder="e.g. Classic Oversized Heavyweight Tee"
                    className="w-full glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 font-sans"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold uppercase text-gray-500 tracking-wider mb-2 font-mono">
                      Base Price (INR)
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                      placeholder="e.g. 1499"
                      className="w-full glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold uppercase text-gray-500 tracking-wider mb-2 font-mono">
                      Raw Stock Inventory
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={prodForm.stock}
                      onChange={(e) => setProdForm({ ...prodForm, stock: e.target.value })}
                      placeholder="e.g. 120"
                      className="w-full glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-gray-600 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase text-gray-500 tracking-wider mb-2 font-mono">
                    Available variants description
                  </label>
                  <input
                    type="text"
                    required
                    value={prodForm.variants}
                    onChange={(e) => setProdForm({ ...prodForm, variants: e.target.value })}
                    placeholder="e.g. S, M, L, XL / Black, White, Charcoal, Beige"
                    className="w-full glass-input rounded-xl px-4 py-3 text-xs text-white placeholder-gray-650 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase text-gray-500 tracking-wider mb-2 font-mono">
                    Status classification
                  </label>
                  <select
                    value={prodForm.status}
                    onChange={(e) =>
                      setProdForm({ ...prodForm, status: e.target.value as "Active" | "Draft" | "Archived" })
                    }
                    className="w-full glass-input rounded-xl px-4 py-3 text-xs text-white font-mono cursor-pointer uppercase font-bold"
                  >
                    <option value="Active">ACTIVE IN CATALOG</option>
                    <option value="Draft">DRAFT / DORMANT</option>
                    <option value="Archived">ARCHIVED / DISCONTINUED</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setProductModalOpen(false)}
                    className="px-4 py-2 bg-transparent hover:bg-white/[0.04] text-gray-300 border border-white/5 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="glow-button px-5 py-2 rounded-xl text-xs font-bold cursor-pointer font-mono"
                  >
                    Save product profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
