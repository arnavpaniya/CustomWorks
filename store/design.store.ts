import { create } from "zustand";

export interface DesignElement {
  type: "text" | "image";
  id: string;
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
}

export interface PriceTier {
  min: number;
  max: number;
  price: number;
}

interface DesignState {
  step: number;
  productId: string;
  variantId: string;
  placement: string;
  elements: DesignElement[];
  baseColor: string;
  quantity: number;
  previewUrl: string;

  // Rich customizer fields (consolidated from wizard local state)
  text: string;
  textColor: string;
  fontSize: number;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  selectedSize: string;
  selectedColor: string;

  // Wholesale tiered pricing catalog
  priceTiers: PriceTier[];

  // Setters & Actions
  setStep: (step: number) => void;
  setProduct: (productId: string) => void;
  setVariant: (variantId: string) => void;
  setPlacement: (placement: string) => void;
  addElement: (el: Omit<DesignElement, "id">) => void;
  updateElement: (id: string, updates: Partial<DesignElement>) => void;
  removeElement: (id: string) => void;
  setBaseColor: (color: string) => void;
  setQuantity: (qty: number) => void;
  setPreviewUrl: (url: string) => void;
  
  // Customizer state setters
  setText: (text: string) => void;
  setTextColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (family: string) => void;
  setBold: (b: boolean) => void;
  setItalic: (i: boolean) => void;
  setSelectedSize: (size: string) => void;
  setSelectedColor: (color: string) => void;

  // High-leverage Pricing Engine Methods
  getUnitPrice: () => number;
  getTotalPrice: () => number;
  
  reset: () => void;
}

const defaultState = {
  step: 1,
  productId: "",
  variantId: "",
  placement: "Front",
  elements: [],
  baseColor: "#FFFFFF",
  quantity: 1,
  previewUrl: "",

  // Defaults for text monogram elements
  text: "",
  textColor: "#0A0A0A",
  fontSize: 24,
  fontFamily: "Inter",
  bold: false,
  italic: false,
  selectedSize: "M",
  selectedColor: "White",

  // Curated pricing tiers
  priceTiers: [
    { min: 1, max: 4, price: 499 },
    { min: 5, max: 9, price: 449 },
    { min: 10, max: 49, price: 399 },
    { min: 50, max: 999, price: 349 },
  ],
};

export const useDesignStore = create<DesignState>((set, get) => ({
  ...defaultState,
  
  setStep: (step) => set({ step }),
  setProduct: (productId) => set({ productId }),
  setVariant: (variantId) => set({ variantId }),
  setPlacement: (placement) => set({ placement }),
  addElement: (el) =>
    set((s) => ({
      elements: [...s.elements, { ...el, id: `el-${Date.now()}` }],
    })),
  updateElement: (id, updates) =>
    set((s) => ({
      elements: s.elements.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),
  removeElement: (id) =>
    set((s) => ({ elements: s.elements.filter((e) => e.id !== id) })),
  setBaseColor: (baseColor) => set({ baseColor }),
  setQuantity: (quantity) => set({ quantity }),
  setPreviewUrl: (previewUrl) => set({ previewUrl }),

  setText: (text) => set({ text }),
  setTextColor: (textColor) => set({ textColor }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  setBold: (bold) => set({ bold }),
  setItalic: (italic) => set({ italic }),
  setSelectedSize: (selectedSize) => set({ selectedSize }),
  setSelectedColor: (selectedColor) => set({ selectedColor }),

  // High-leverage Pricing logic
  getUnitPrice: () => {
    const s = get();
    const tier = s.priceTiers.find(
      (t) => s.quantity >= t.min && s.quantity <= t.max
    );
    return tier ? tier.price : 499;
  },

  getTotalPrice: () => {
    const s = get();
    return s.getUnitPrice() * s.quantity;
  },

  reset: () => set(defaultState),
}));
