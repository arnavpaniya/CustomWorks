import { create } from "zustand";
import { PRODUCTS_CATALOG, ProductCatalogItem, PriceTier } from "@/lib/products-catalog";
import { calculatePricing, PricingResult } from "@/lib/pricing-engine";

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

  // Key-value store for product-specific custom choices (sides, corners, bannerDimensions, lanyardHook, finish, texture, foil)
  options: Record<string, any>;

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
  setOption: (key: string, value: any) => void;

  // Deep pricing calculations
  getPricingResult: () => PricingResult;
  getUnitPrice: () => number;
  getTotalPrice: () => number;
  
  reset: () => void;
}

const defaultState = {
  step: 1,
  productId: "business-cards",
  variantId: "300gsm-standard",
  placement: "Front",
  elements: [],
  baseColor: "#FFFFFF",
  quantity: 200, // set default qty to MOQ threshold
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

  // Key-value store for product options
  options: {},
};

export const useDesignStore = create<DesignState>((set, get) => ({
  ...defaultState,
  
  setStep: (step) => set({ step }),
  setProduct: (productId) => {
    const product = PRODUCTS_CATALOG.find(p => p.id === productId || p.slug === productId);
    const defaultVariant = product?.subproducts?.[0]?.id || "";
    const defaultMoq = product?.moq || 10;
    
    // Set some defaults based on options schema
    const initialOptions: Record<string, any> = {};
    product?.options?.forEach(opt => {
      initialOptions[opt.key] = opt.defaultValue;
    });

    set({ 
      productId: product?.id || productId, 
      variantId: defaultVariant,
      quantity: defaultMoq,
      options: initialOptions
    });
  },
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
  setOption: (key, value) => set((s) => ({
    options: { ...s.options, [key]: value }
  })),

  // Deep pricing calculations
  getPricingResult: () => {
    const s = get();
    const product = PRODUCTS_CATALOG.find(p => p.id === s.productId);
    if (!product) {
      return {
        unitPrice: 0,
        totalPrice: 0,
        isEmailEnquiry: false
      };
    }
    return calculatePricing(product, s.variantId, s.quantity, s.options);
  },

  getUnitPrice: () => {
    return get().getPricingResult().unitPrice;
  },

  getTotalPrice: () => {
    return get().getPricingResult().totalPrice;
  },

  reset: () => set(defaultState),
}));
