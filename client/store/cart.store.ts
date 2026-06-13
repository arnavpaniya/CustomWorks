import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
  customSummary?: string;
  designPreviewUrl?: string;
}

interface CartState {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
  shippingCharge: number | null;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  setShippingCharge: (charge: number | null) => void;
  getShippingCharge: () => number;
  subtotal: () => number;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: "",
      couponDiscount: 0,
      shippingCharge: null,

      addItem: (item) => {
        const id = `${item.productId}-${item.variantId ?? "default"}-${Date.now()}`;
        set((s) => ({ items: [...s.items, { ...item, id }] }));
      },

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((s) => ({
          items:
            quantity < 1
              ? s.items.filter((i) => i.id !== id)
              : s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),

      clearCart: () => set({ items: [], couponCode: "", couponDiscount: 0, shippingCharge: null }),

      applyCoupon: (code, discount) =>
        set({ couponCode: code, couponDiscount: discount }),

      removeCoupon: () => set({ couponCode: "", couponDiscount: 0 }),

      setShippingCharge: (charge) => set({ shippingCharge: charge }),

      getShippingCharge: () => {
        const s = get();
        if (s.shippingCharge !== null) {
          return s.shippingCharge;
        }
        const sub = s.subtotal();
        return sub >= 999 ? 0 : 99;
      },

      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      total: () => {
        const s = get();
        const sub = s.subtotal();
        const gst = sub * 0.18;
        const shipping = s.getShippingCharge();
        return sub + gst + shipping - s.couponDiscount;
      },

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "cw-cart" },
  ),
);
