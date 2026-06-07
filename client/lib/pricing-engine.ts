import { ProductCatalogItem, PriceTier } from "./products-catalog";

export interface PricingResult {
  unitPrice: number;
  totalPrice: number;
  isEmailEnquiry: boolean;
  message?: string;
  breakdown?: {
    baseRate: number;
    adjustments: { name: string; amount: number }[];
    area?: number;
    quantity: number;
  };
}

export function lookupTierPrice(tiers: PriceTier[], qty: number): number {
  if (!tiers || tiers.length === 0) return 0;
  
  // Find the exact matching tier
  const exactTier = tiers.find(t => qty >= t.min && qty <= t.max);
  if (exactTier) return exactTier.price;

  // Fallback: If quantity is below the minimum tier, use the first tier price
  const firstTier = tiers[0];
  if (qty < firstTier.min) return firstTier.price;

  // Fallback: If quantity is above the maximum tier, use the last tier price
  const lastTier = tiers[tiers.length - 1];
  if (qty > lastTier.max) return lastTier.price;

  return 0;
}

export function calculatePricing(
  product: ProductCatalogItem,
  subproductId: string | undefined,
  quantity: number,
  options: Record<string, any> = {}
): PricingResult {
  const result: PricingResult = {
    unitPrice: 0,
    totalPrice: 0,
    isEmailEnquiry: false,
    breakdown: {
      baseRate: 0,
      adjustments: [],
      quantity
    }
  };

  // 1. Email-quote Categories (Custom Apparel & Embroidery)
  if (product.customizerType === "email-quote-only" || product.id === "custom-apparel") {
    result.isEmailEnquiry = true;
    result.unitPrice = 0;
    result.totalPrice = 0;
    result.message = "Enquiry via Email";
    return result;
  }

  // 2. Specific Subproduct Email Enquiry triggers
  if (product.id === "bulk-flyers") {
    result.isEmailEnquiry = true;
    result.unitPrice = 0;
    result.totalPrice = 0;
    result.message = "Bulk offset flyer pricing is strictly by email quotation.";
    return result;
  }

  // 3. Business Cards Calculation
  if (product.customizerType === "business-cards") {
    const tiersToUse = product.priceTiers || [];
    if (tiersToUse.length === 0) {
      return result;
    }
    const baseRateFromTiers = lookupTierPrice(tiersToUse, quantity);
    
    // Single side = Price ÷ 2
    const printSides = options.printSides || "double-sided";
    const isSingleSided = printSides === "single-sided";
    let baseRate = isSingleSided ? baseRateFromTiers / 2 : baseRateFromTiers;
    
    if (result.breakdown) {
      result.breakdown.baseRate = baseRateFromTiers;
      if (isSingleSided) {
        result.breakdown.adjustments.push({
          name: "Single Sided discount (50% off base)",
          amount: -(baseRateFromTiers / 2)
        });
      }
    }

    // Rounded edges = +₹0.95/card
    const corners = options.corners || "sharp";
    const isRounded = corners === "rounded";
    const cornersAdj = isRounded ? 0.95 : 0;
    if (isRounded && result.breakdown) {
      result.breakdown.adjustments.push({
        name: "Rounded Edges premium",
        amount: 0.95
      });
    }

    const unitPrice = baseRate + cornersAdj;
    result.unitPrice = Number(unitPrice.toFixed(2));
    result.totalPrice = Number((result.unitPrice * quantity).toFixed(2));
    return result;
  }

  // 4. Banners Calculation
  if (product.customizerType === "banners") {
    const tiersToUse = product.priceTiers || [];
    if (tiersToUse.length === 0 && product.id !== "starflex-steel-frame") {
      return result;
    }
    const dimensions = options.bannerDimensions || { width: 6, height: 4 };
    const width = Number(dimensions.width) || 6;
    const height = Number(dimensions.height) || 4;
    const area = width * height;

    let sqftPrice = 0;

    // Custom tier logic based on Banner Area, not quantity!
    if (product.id === "starflex-steel-frame") {
      sqftPrice = 95; // Flat rate
    } else {
      sqftPrice = lookupTierPrice(product.priceTiers || [], area);
    }

    result.unitPrice = sqftPrice; // Price per sqft
    result.totalPrice = Number((sqftPrice * area * quantity).toFixed(2));
    
    if (result.breakdown) {
      result.breakdown.baseRate = sqftPrice;
      result.breakdown.area = area;
      result.breakdown.adjustments.push({
        name: `Banner Area (${width}ft x ${height}ft = ${area} sqft)`,
        amount: 0
      });
    }
    return result;
  }

  // 5. Lanyards Special Multi-Column Matrix Calculation
  if (product.customizerType === "lanyards" && product.id === "polyester-lanyard-20mm") {
    // Over 500 lanyards requires Email Enquiry
    if (quantity > 500) {
      result.isEmailEnquiry = true;
      result.unitPrice = 0;
      result.totalPrice = 0;
      result.message = "Order quantities above 500 units require a custom email quotation.";
      return result;
    }

    // Custom matrix logic
    const lanyardHook = options.lanyardHook || "china";
    let unitPrice = 0;

    // Define tiers
    const lanyardTiers = [
      { min: 10, max: 99, prices: { china: 55, overlock: 58, "double-china": 58, "safety-breakaway": 60 } },
      { min: 100, max: 149, prices: { china: 48, overlock: 51, "double-china": 51, "safety-breakaway": 50 } },
      { min: 150, max: 199, prices: { china: 44, overlock: 47, "double-china": 47, "safety-breakaway": 46 } },
      { min: 200, max: 249, prices: { china: 40, overlock: 43, "double-china": 43, "safety-breakaway": 42 } },
      { min: 250, max: 299, prices: { china: 36, overlock: 39, "double-china": 39, "safety-breakaway": 38 } },
      { min: 300, max: 399, prices: { china: 32, overlock: 35, "double-china": 35, "safety-breakaway": 34 } },
      { min: 400, max: 499, prices: { china: 28, overlock: 31, "double-china": 31, "safety-breakaway": 30 } },
      { min: 500, max: 500, prices: { china: 25, overlock: 28, "double-china": 28, "safety-breakaway": 27 } }
    ];

    // Find the active tier
    let activeTier = lanyardTiers.find(t => quantity >= t.min && quantity <= t.max);
    if (!activeTier) {
      if (quantity < 10) {
        activeTier = lanyardTiers[0];
      } else {
        activeTier = lanyardTiers[lanyardTiers.length - 1];
      }
    }

    const pricesObj = activeTier.prices as Record<string, number>;
    unitPrice = pricesObj[lanyardHook] || pricesObj["china"];

    result.unitPrice = unitPrice;
    result.totalPrice = Number((unitPrice * quantity).toFixed(2));

    if (result.breakdown) {
      result.breakdown.baseRate = pricesObj["china"];
      if (lanyardHook !== "china") {
        result.breakdown.adjustments.push({
          name: `Attachment Hook Upgrade (${lanyardHook})`,
          amount: unitPrice - pricesObj["china"]
        });
      }
    }
    return result;
  }

  // 6. Generic Keychain Lanyards or other Enquiry items with > 500 check
  if (product.customizerType === "lanyards" && product.id === "keychain-lanyard") {
    if (quantity > 500) {
      result.isEmailEnquiry = true;
      result.unitPrice = 0;
      result.totalPrice = 0;
      result.message = "Order quantities above 500 units require a custom email quotation.";
      return result;
    }
  }

  // 7. Standard Tier Lookup (Envelopes, Calendars, Diaries, Brochures, Promotional Cards, etc.)
  let tiersToUse: PriceTier[] = product.priceTiers || [];

  const unitPrice = lookupTierPrice(tiersToUse, quantity);
  result.unitPrice = unitPrice;
  result.totalPrice = Number((unitPrice * quantity).toFixed(2));
  
  if (result.breakdown) {
    result.breakdown.baseRate = unitPrice;
  }

  return result;
}
