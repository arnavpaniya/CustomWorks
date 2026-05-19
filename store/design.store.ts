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

interface DesignState {
  step: number;
  productId: string;
  variantId: string;
  placement: string;
  elements: DesignElement[];
  baseColor: string;
  quantity: number;
  previewUrl: string;

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
  reset: () => void;
}

const defaultState = {
  step: 1,
  productId: "",
  variantId: "",
  placement: "front",
  elements: [],
  baseColor: "#FFFFFF",
  quantity: 1,
  previewUrl: "",
};

export const useDesignStore = create<DesignState>((set) => ({
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
  reset: () => set(defaultState),
}));
