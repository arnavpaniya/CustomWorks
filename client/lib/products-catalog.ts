export interface PriceTier {
  min: number;
  max: number;
  price: number;
}

export interface ProductCatalogItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  moq: number;
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  isNew?: boolean;
  
  // Custom metadata for our pricing engine & UI options
  customizerType: "apparel" | "business-cards" | "envelopes" | "banners" | "lanyards" | "standard-tiers" | "area-tiers" | "email-quote-only" | "upload-only";
  priceTiers?: PriceTier[]; 
  options?: {
    name: string;
    key: string;
    type: "select" | "toggle" | "range" | "text" | "dimensions";
    choices?: { label: string; value: string; priceAdj?: number }[];
    defaultValue?: any;
  }[];
}

export const PRODUCTS_CATALOG: ProductCatalogItem[] = [
  {
    "id": "300gsm-standard",
    "slug": "300gsm-standard",
    "name": "300 GSM Standard (Matte)",
    "category": "Business Cards",
    "basePrice": 1.75,
    "description": "Premium business cards available in standard, matte, heavy-duty, textured, and metallic foil finishes. Double or single-sided print with sharp or rounded edges.",
    "moq": 200,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 342,
    "badge": "Best Seller",
    "customizerType": "business-cards",
    "priceTiers": [
      {
        "min": 200,
        "max": 299,
        "price": 1.75
      },
      {
        "min": 300,
        "max": 399,
        "price": 1.72
      },
      {
        "min": 400,
        "max": 499,
        "price": 1.69
      },
      {
        "min": 500,
        "max": 599,
        "price": 1.66
      },
      {
        "min": 600,
        "max": 699,
        "price": 1.63
      },
      {
        "min": 700,
        "max": 799,
        "price": 1.6
      },
      {
        "min": 800,
        "max": 899,
        "price": 1.57
      },
      {
        "min": 900,
        "max": 999,
        "price": 1.54
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 1.5
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 1.45
      },
      {
        "min": 2000,
        "max": 2999,
        "price": 1.4
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 1.3
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 1.25
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 1.15
      },
      {
        "min": 10000,
        "max": 19999,
        "price": 1
      },
      {
        "min": 20000,
        "max": 999999,
        "price": 0.95
      }
    ],
    "options": [
      {
        "name": "Print Sides",
        "key": "printSides",
        "type": "select",
        "choices": [
          {
            "label": "Double Sided",
            "value": "double-sided"
          },
          {
            "label": "Single Sided (50% off base rate)",
            "value": "single-sided"
          }
        ],
        "defaultValue": "double-sided"
      },
      {
        "name": "Corners Finish",
        "key": "corners",
        "type": "select",
        "choices": [
          {
            "label": "Sharp Standard Edges",
            "value": "sharp"
          },
          {
            "label": "Rounded Edges (+₹0.95/card)",
            "value": "rounded",
            "priceAdj": 0.95
          }
        ],
        "defaultValue": "sharp"
      },
      {
        "name": "Matte/Glossy Finish",
        "key": "finish",
        "type": "select",
        "choices": [
          {
            "label": "Matte Finish",
            "value": "matte"
          },
          {
            "label": "Glossy Finish",
            "value": "glossy"
          }
        ],
        "defaultValue": "matte"
      },
      {
        "name": "Texture Variant",
        "key": "texture",
        "type": "select",
        "choices": [
          {
            "label": "White Texture",
            "value": "white"
          },
          {
            "label": "Cream Texture",
            "value": "cream"
          },
          {
            "label": "Ivory Texture",
            "value": "ivory"
          },
          {
            "label": "Criss Cross Texture",
            "value": "criss-cross"
          },
          {
            "label": "Needle Point Texture",
            "value": "needle-point"
          }
        ],
        "defaultValue": "white"
      },
      {
        "name": "Metallic Foil Highlight",
        "key": "foil",
        "type": "select",
        "choices": [
          {
            "label": "Gold Foil Highlight",
            "value": "gold"
          },
          {
            "label": "Silver Foil Highlight",
            "value": "silver"
          }
        ],
        "defaultValue": "gold"
      }
    ]
  },
  {
    "id": "350gsm-premium",
    "slug": "350gsm-premium",
    "name": "350 GSM Premium Matte / Glossy",
    "category": "Business Cards",
    "basePrice": 2.5,
    "description": "Premium business cards available in standard, matte, heavy-duty, textured, and metallic foil finishes. Double or single-sided print with sharp or rounded edges.",
    "moq": 200,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 342,
    "badge": "Best Seller",
    "customizerType": "business-cards",
    "priceTiers": [
      {
        "min": 500,
        "max": 599,
        "price": 2.5
      },
      {
        "min": 600,
        "max": 699,
        "price": 2.45
      },
      {
        "min": 700,
        "max": 799,
        "price": 2.4
      },
      {
        "min": 800,
        "max": 899,
        "price": 2.35
      },
      {
        "min": 900,
        "max": 999,
        "price": 2.3
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 2.25
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 2.2
      },
      {
        "min": 2000,
        "max": 2999,
        "price": 2.15
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 2.05
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 1.95
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 1.85
      },
      {
        "min": 10000,
        "max": 19999,
        "price": 1.75
      },
      {
        "min": 20000,
        "max": 29999,
        "price": 1.6
      },
      {
        "min": 30000,
        "max": 999999,
        "price": 1.5
      }
    ],
    "options": [
      {
        "name": "Print Sides",
        "key": "printSides",
        "type": "select",
        "choices": [
          {
            "label": "Double Sided",
            "value": "double-sided"
          },
          {
            "label": "Single Sided (50% off base rate)",
            "value": "single-sided"
          }
        ],
        "defaultValue": "double-sided"
      },
      {
        "name": "Corners Finish",
        "key": "corners",
        "type": "select",
        "choices": [
          {
            "label": "Sharp Standard Edges",
            "value": "sharp"
          },
          {
            "label": "Rounded Edges (+₹0.95/card)",
            "value": "rounded",
            "priceAdj": 0.95
          }
        ],
        "defaultValue": "sharp"
      },
      {
        "name": "Matte/Glossy Finish",
        "key": "finish",
        "type": "select",
        "choices": [
          {
            "label": "Matte Finish",
            "value": "matte"
          },
          {
            "label": "Glossy Finish",
            "value": "glossy"
          }
        ],
        "defaultValue": "matte"
      },
      {
        "name": "Texture Variant",
        "key": "texture",
        "type": "select",
        "choices": [
          {
            "label": "White Texture",
            "value": "white"
          },
          {
            "label": "Cream Texture",
            "value": "cream"
          },
          {
            "label": "Ivory Texture",
            "value": "ivory"
          },
          {
            "label": "Criss Cross Texture",
            "value": "criss-cross"
          },
          {
            "label": "Needle Point Texture",
            "value": "needle-point"
          }
        ],
        "defaultValue": "white"
      },
      {
        "name": "Metallic Foil Highlight",
        "key": "foil",
        "type": "select",
        "choices": [
          {
            "label": "Gold Foil Highlight",
            "value": "gold"
          },
          {
            "label": "Silver Foil Highlight",
            "value": "silver"
          }
        ],
        "defaultValue": "gold"
      }
    ]
  },
  {
    "id": "400gsm-heavy",
    "slug": "400gsm-heavy",
    "name": "400 GSM Heavy Duty",
    "category": "Business Cards",
    "basePrice": 3.5,
    "description": "Premium business cards available in standard, matte, heavy-duty, textured, and metallic foil finishes. Double or single-sided print with sharp or rounded edges.",
    "moq": 200,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 342,
    "badge": "Best Seller",
    "customizerType": "business-cards",
    "priceTiers": [
      {
        "min": 200,
        "max": 299,
        "price": 3.5
      },
      {
        "min": 300,
        "max": 399,
        "price": 3.45
      },
      {
        "min": 400,
        "max": 499,
        "price": 3.4
      },
      {
        "min": 500,
        "max": 599,
        "price": 3.35
      },
      {
        "min": 600,
        "max": 699,
        "price": 3.3
      },
      {
        "min": 700,
        "max": 799,
        "price": 3.25
      },
      {
        "min": 800,
        "max": 899,
        "price": 3.2
      },
      {
        "min": 900,
        "max": 999,
        "price": 3.15
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 3.05
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 2.95
      },
      {
        "min": 2000,
        "max": 2999,
        "price": 2.85
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 2.75
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 2.65
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 2.55
      },
      {
        "min": 10000,
        "max": 19999,
        "price": 2.45
      },
      {
        "min": 20000,
        "max": 29999,
        "price": 2.3
      },
      {
        "min": 30000,
        "max": 999999,
        "price": 2.25
      }
    ],
    "options": [
      {
        "name": "Print Sides",
        "key": "printSides",
        "type": "select",
        "choices": [
          {
            "label": "Double Sided",
            "value": "double-sided"
          },
          {
            "label": "Single Sided (50% off base rate)",
            "value": "single-sided"
          }
        ],
        "defaultValue": "double-sided"
      },
      {
        "name": "Corners Finish",
        "key": "corners",
        "type": "select",
        "choices": [
          {
            "label": "Sharp Standard Edges",
            "value": "sharp"
          },
          {
            "label": "Rounded Edges (+₹0.95/card)",
            "value": "rounded",
            "priceAdj": 0.95
          }
        ],
        "defaultValue": "sharp"
      },
      {
        "name": "Matte/Glossy Finish",
        "key": "finish",
        "type": "select",
        "choices": [
          {
            "label": "Matte Finish",
            "value": "matte"
          },
          {
            "label": "Glossy Finish",
            "value": "glossy"
          }
        ],
        "defaultValue": "matte"
      },
      {
        "name": "Texture Variant",
        "key": "texture",
        "type": "select",
        "choices": [
          {
            "label": "White Texture",
            "value": "white"
          },
          {
            "label": "Cream Texture",
            "value": "cream"
          },
          {
            "label": "Ivory Texture",
            "value": "ivory"
          },
          {
            "label": "Criss Cross Texture",
            "value": "criss-cross"
          },
          {
            "label": "Needle Point Texture",
            "value": "needle-point"
          }
        ],
        "defaultValue": "white"
      },
      {
        "name": "Metallic Foil Highlight",
        "key": "foil",
        "type": "select",
        "choices": [
          {
            "label": "Gold Foil Highlight",
            "value": "gold"
          },
          {
            "label": "Silver Foil Highlight",
            "value": "silver"
          }
        ],
        "defaultValue": "gold"
      }
    ]
  },
  {
    "id": "textured",
    "slug": "textured",
    "name": "Premium Textured Cards",
    "category": "Business Cards",
    "basePrice": 3.5,
    "description": "Premium business cards available in standard, matte, heavy-duty, textured, and metallic foil finishes. Double or single-sided print with sharp or rounded edges.",
    "moq": 200,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 342,
    "badge": "Best Seller",
    "customizerType": "business-cards",
    "priceTiers": [
      {
        "min": 500,
        "max": 599,
        "price": 3.5
      },
      {
        "min": 600,
        "max": 699,
        "price": 3.45
      },
      {
        "min": 700,
        "max": 799,
        "price": 2.4
      },
      {
        "min": 800,
        "max": 899,
        "price": 3.35
      },
      {
        "min": 900,
        "max": 999,
        "price": 3.3
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 3.25
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 3.15
      },
      {
        "min": 2000,
        "max": 2999,
        "price": 3.05
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 2.95
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 2.85
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 2.75
      },
      {
        "min": 10000,
        "max": 19999,
        "price": 2.65
      },
      {
        "min": 20000,
        "max": 29999,
        "price": 2.4
      },
      {
        "min": 30000,
        "max": 999999,
        "price": 2.25
      }
    ],
    "options": [
      {
        "name": "Print Sides",
        "key": "printSides",
        "type": "select",
        "choices": [
          {
            "label": "Double Sided",
            "value": "double-sided"
          },
          {
            "label": "Single Sided (50% off base rate)",
            "value": "single-sided"
          }
        ],
        "defaultValue": "double-sided"
      },
      {
        "name": "Corners Finish",
        "key": "corners",
        "type": "select",
        "choices": [
          {
            "label": "Sharp Standard Edges",
            "value": "sharp"
          },
          {
            "label": "Rounded Edges (+₹0.95/card)",
            "value": "rounded",
            "priceAdj": 0.95
          }
        ],
        "defaultValue": "sharp"
      },
      {
        "name": "Matte/Glossy Finish",
        "key": "finish",
        "type": "select",
        "choices": [
          {
            "label": "Matte Finish",
            "value": "matte"
          },
          {
            "label": "Glossy Finish",
            "value": "glossy"
          }
        ],
        "defaultValue": "matte"
      },
      {
        "name": "Texture Variant",
        "key": "texture",
        "type": "select",
        "choices": [
          {
            "label": "White Texture",
            "value": "white"
          },
          {
            "label": "Cream Texture",
            "value": "cream"
          },
          {
            "label": "Ivory Texture",
            "value": "ivory"
          },
          {
            "label": "Criss Cross Texture",
            "value": "criss-cross"
          },
          {
            "label": "Needle Point Texture",
            "value": "needle-point"
          }
        ],
        "defaultValue": "white"
      },
      {
        "name": "Metallic Foil Highlight",
        "key": "foil",
        "type": "select",
        "choices": [
          {
            "label": "Gold Foil Highlight",
            "value": "gold"
          },
          {
            "label": "Silver Foil Highlight",
            "value": "silver"
          }
        ],
        "defaultValue": "gold"
      }
    ]
  },
  {
    "id": "metallic",
    "slug": "metallic",
    "name": "Metallic Foil Highlight",
    "category": "Business Cards",
    "basePrice": 5.5,
    "description": "Premium business cards available in standard, matte, heavy-duty, textured, and metallic foil finishes. Double or single-sided print with sharp or rounded edges.",
    "moq": 200,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 342,
    "badge": "Best Seller",
    "customizerType": "business-cards",
    "priceTiers": [
      {
        "min": 500,
        "max": 599,
        "price": 5.5
      },
      {
        "min": 600,
        "max": 699,
        "price": 5.35
      },
      {
        "min": 700,
        "max": 799,
        "price": 5.2
      },
      {
        "min": 800,
        "max": 899,
        "price": 5.05
      },
      {
        "min": 900,
        "max": 999,
        "price": 4.9
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 4.75
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 4.55
      },
      {
        "min": 2000,
        "max": 2999,
        "price": 4.35
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 4.05
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 3.75
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 3.45
      },
      {
        "min": 10000,
        "max": 19999,
        "price": 3.15
      },
      {
        "min": 20000,
        "max": 29999,
        "price": 2.5
      },
      {
        "min": 30000,
        "max": 999999,
        "price": 2.25
      }
    ],
    "options": [
      {
        "name": "Print Sides",
        "key": "printSides",
        "type": "select",
        "choices": [
          {
            "label": "Double Sided",
            "value": "double-sided"
          },
          {
            "label": "Single Sided (50% off base rate)",
            "value": "single-sided"
          }
        ],
        "defaultValue": "double-sided"
      },
      {
        "name": "Corners Finish",
        "key": "corners",
        "type": "select",
        "choices": [
          {
            "label": "Sharp Standard Edges",
            "value": "sharp"
          },
          {
            "label": "Rounded Edges (+₹0.95/card)",
            "value": "rounded",
            "priceAdj": 0.95
          }
        ],
        "defaultValue": "sharp"
      },
      {
        "name": "Matte/Glossy Finish",
        "key": "finish",
        "type": "select",
        "choices": [
          {
            "label": "Matte Finish",
            "value": "matte"
          },
          {
            "label": "Glossy Finish",
            "value": "glossy"
          }
        ],
        "defaultValue": "matte"
      },
      {
        "name": "Texture Variant",
        "key": "texture",
        "type": "select",
        "choices": [
          {
            "label": "White Texture",
            "value": "white"
          },
          {
            "label": "Cream Texture",
            "value": "cream"
          },
          {
            "label": "Ivory Texture",
            "value": "ivory"
          },
          {
            "label": "Criss Cross Texture",
            "value": "criss-cross"
          },
          {
            "label": "Needle Point Texture",
            "value": "needle-point"
          }
        ],
        "defaultValue": "white"
      },
      {
        "name": "Metallic Foil Highlight",
        "key": "foil",
        "type": "select",
        "choices": [
          {
            "label": "Gold Foil Highlight",
            "value": "gold"
          },
          {
            "label": "Silver Foil Highlight",
            "value": "silver"
          }
        ],
        "defaultValue": "gold"
      }
    ]
  },
  {
    "id": "square-cut",
    "slug": "square-cut",
    "name": "Square Cut (300 GSM Standard)",
    "category": "Business Cards",
    "basePrice": 2,
    "description": "Premium business cards available in standard, matte, heavy-duty, textured, and metallic foil finishes. Double or single-sided print with sharp or rounded edges.",
    "moq": 200,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 342,
    "badge": "Best Seller",
    "customizerType": "business-cards",
    "priceTiers": [
      {
        "min": 400,
        "max": 499,
        "price": 2
      },
      {
        "min": 500,
        "max": 599,
        "price": 1.95
      },
      {
        "min": 600,
        "max": 699,
        "price": 1.9
      },
      {
        "min": 700,
        "max": 799,
        "price": 1.85
      },
      {
        "min": 800,
        "max": 899,
        "price": 1.8
      },
      {
        "min": 900,
        "max": 999,
        "price": 1.75
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 1.7
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 1.6
      },
      {
        "min": 2000,
        "max": 2999,
        "price": 1.5
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 1.4
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 1.3
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 1.15
      },
      {
        "min": 10000,
        "max": 19999,
        "price": 1
      },
      {
        "min": 20000,
        "max": 29999,
        "price": 0.9
      },
      {
        "min": 30000,
        "max": 999999,
        "price": 0.85
      }
    ],
    "options": [
      {
        "name": "Print Sides",
        "key": "printSides",
        "type": "select",
        "choices": [
          {
            "label": "Double Sided",
            "value": "double-sided"
          },
          {
            "label": "Single Sided (50% off base rate)",
            "value": "single-sided"
          }
        ],
        "defaultValue": "double-sided"
      },
      {
        "name": "Corners Finish",
        "key": "corners",
        "type": "select",
        "choices": [
          {
            "label": "Sharp Standard Edges",
            "value": "sharp"
          },
          {
            "label": "Rounded Edges (+₹0.95/card)",
            "value": "rounded",
            "priceAdj": 0.95
          }
        ],
        "defaultValue": "sharp"
      },
      {
        "name": "Matte/Glossy Finish",
        "key": "finish",
        "type": "select",
        "choices": [
          {
            "label": "Matte Finish",
            "value": "matte"
          },
          {
            "label": "Glossy Finish",
            "value": "glossy"
          }
        ],
        "defaultValue": "matte"
      },
      {
        "name": "Texture Variant",
        "key": "texture",
        "type": "select",
        "choices": [
          {
            "label": "White Texture",
            "value": "white"
          },
          {
            "label": "Cream Texture",
            "value": "cream"
          },
          {
            "label": "Ivory Texture",
            "value": "ivory"
          },
          {
            "label": "Criss Cross Texture",
            "value": "criss-cross"
          },
          {
            "label": "Needle Point Texture",
            "value": "needle-point"
          }
        ],
        "defaultValue": "white"
      },
      {
        "name": "Metallic Foil Highlight",
        "key": "foil",
        "type": "select",
        "choices": [
          {
            "label": "Gold Foil Highlight",
            "value": "gold"
          },
          {
            "label": "Silver Foil Highlight",
            "value": "silver"
          }
        ],
        "defaultValue": "gold"
      }
    ]
  },
  {
    "id": "mini-card",
    "slug": "mini-card",
    "name": "Mini Card (300 GSM Standard)",
    "category": "Business Cards",
    "basePrice": 1.85,
    "description": "Premium business cards available in standard, matte, heavy-duty, textured, and metallic foil finishes. Double or single-sided print with sharp or rounded edges.",
    "moq": 200,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 342,
    "badge": "Best Seller",
    "customizerType": "business-cards",
    "priceTiers": [
      {
        "min": 300,
        "max": 399,
        "price": 1.85
      },
      {
        "min": 400,
        "max": 499,
        "price": 1.8
      },
      {
        "min": 500,
        "max": 599,
        "price": 1.75
      },
      {
        "min": 600,
        "max": 699,
        "price": 1.7
      },
      {
        "min": 700,
        "max": 799,
        "price": 1.65
      },
      {
        "min": 800,
        "max": 899,
        "price": 1.6
      },
      {
        "min": 900,
        "max": 999,
        "price": 1.55
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 1.5
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 1.45
      },
      {
        "min": 2000,
        "max": 2999,
        "price": 1.4
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 1.3
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 1.25
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 1.15
      },
      {
        "min": 10000,
        "max": 19999,
        "price": 1.05
      },
      {
        "min": 20000,
        "max": 29999,
        "price": 1
      },
      {
        "min": 30000,
        "max": 999999,
        "price": 0.95
      }
    ],
    "options": [
      {
        "name": "Print Sides",
        "key": "printSides",
        "type": "select",
        "choices": [
          {
            "label": "Double Sided",
            "value": "double-sided"
          },
          {
            "label": "Single Sided (50% off base rate)",
            "value": "single-sided"
          }
        ],
        "defaultValue": "double-sided"
      },
      {
        "name": "Corners Finish",
        "key": "corners",
        "type": "select",
        "choices": [
          {
            "label": "Sharp Standard Edges",
            "value": "sharp"
          },
          {
            "label": "Rounded Edges (+₹0.95/card)",
            "value": "rounded",
            "priceAdj": 0.95
          }
        ],
        "defaultValue": "sharp"
      },
      {
        "name": "Matte/Glossy Finish",
        "key": "finish",
        "type": "select",
        "choices": [
          {
            "label": "Matte Finish",
            "value": "matte"
          },
          {
            "label": "Glossy Finish",
            "value": "glossy"
          }
        ],
        "defaultValue": "matte"
      },
      {
        "name": "Texture Variant",
        "key": "texture",
        "type": "select",
        "choices": [
          {
            "label": "White Texture",
            "value": "white"
          },
          {
            "label": "Cream Texture",
            "value": "cream"
          },
          {
            "label": "Ivory Texture",
            "value": "ivory"
          },
          {
            "label": "Criss Cross Texture",
            "value": "criss-cross"
          },
          {
            "label": "Needle Point Texture",
            "value": "needle-point"
          }
        ],
        "defaultValue": "white"
      },
      {
        "name": "Metallic Foil Highlight",
        "key": "foil",
        "type": "select",
        "choices": [
          {
            "label": "Gold Foil Highlight",
            "value": "gold"
          },
          {
            "label": "Silver Foil Highlight",
            "value": "silver"
          }
        ],
        "defaultValue": "gold"
      }
    ]
  },
  {
    "id": "dl-envelopes",
    "slug": "dl-envelopes",
    "name": "DL Envelopes",
    "category": "Envelopes",
    "basePrice": 20,
    "description": "Branded commercial envelopes in DL, C5, and C4 formats. Ideal for official communication, marketing mailers, and document deliveries.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 94,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 24,
        "price": 20
      },
      {
        "min": 25,
        "max": 49,
        "price": 19
      },
      {
        "min": 50,
        "max": 99,
        "price": 18
      },
      {
        "min": 100,
        "max": 199,
        "price": 17
      },
      {
        "min": 200,
        "max": 299,
        "price": 16
      },
      {
        "min": 300,
        "max": 399,
        "price": 15.5
      },
      {
        "min": 400,
        "max": 499,
        "price": 15
      },
      {
        "min": 500,
        "max": 999,
        "price": 14.5
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 13.5
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 12.5
      },
      {
        "min": 2000,
        "max": 2499,
        "price": 11.5
      },
      {
        "min": 2500,
        "max": 4999,
        "price": 10.75
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 9
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 7.5
      },
      {
        "min": 10000,
        "max": 999999,
        "price": 6
      }
    ]
  },
  {
    "id": "c5-envelopes",
    "slug": "c5-envelopes",
    "name": "C5 Envelopes",
    "category": "Envelopes",
    "basePrice": 23,
    "description": "Branded commercial envelopes in DL, C5, and C4 formats. Ideal for official communication, marketing mailers, and document deliveries.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 94,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 24,
        "price": 23
      },
      {
        "min": 25,
        "max": 49,
        "price": 22
      },
      {
        "min": 50,
        "max": 99,
        "price": 21
      },
      {
        "min": 100,
        "max": 199,
        "price": 20
      },
      {
        "min": 200,
        "max": 299,
        "price": 19
      },
      {
        "min": 300,
        "max": 399,
        "price": 18.5
      },
      {
        "min": 400,
        "max": 499,
        "price": 18
      },
      {
        "min": 500,
        "max": 999,
        "price": 17.5
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 16.5
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 15.5
      },
      {
        "min": 2000,
        "max": 2499,
        "price": 14.5
      },
      {
        "min": 2500,
        "max": 4999,
        "price": 14
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 12.5
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 11.25
      },
      {
        "min": 10000,
        "max": 999999,
        "price": 10
      }
    ]
  },
  {
    "id": "c4-envelopes",
    "slug": "c4-envelopes",
    "name": "C4 Envelopes",
    "category": "Envelopes",
    "basePrice": 30,
    "description": "Branded commercial envelopes in DL, C5, and C4 formats. Ideal for official communication, marketing mailers, and document deliveries.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 94,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 24,
        "price": 30
      },
      {
        "min": 25,
        "max": 49,
        "price": 28.5
      },
      {
        "min": 50,
        "max": 99,
        "price": 27
      },
      {
        "min": 100,
        "max": 199,
        "price": 25.5
      },
      {
        "min": 200,
        "max": 299,
        "price": 24
      },
      {
        "min": 300,
        "max": 399,
        "price": 23
      },
      {
        "min": 400,
        "max": 499,
        "price": 22
      },
      {
        "min": 500,
        "max": 999,
        "price": 21
      },
      {
        "min": 1000,
        "max": 1499,
        "price": 19.5
      },
      {
        "min": 1500,
        "max": 1999,
        "price": 18.5
      },
      {
        "min": 2000,
        "max": 2499,
        "price": 17.5
      },
      {
        "min": 2500,
        "max": 4999,
        "price": 17
      },
      {
        "min": 5000,
        "max": 7499,
        "price": 15.5
      },
      {
        "min": 7500,
        "max": 9999,
        "price": 14.75
      },
      {
        "min": 10000,
        "max": 999999,
        "price": 14
      }
    ]
  },
  {
    "id": "letterheads-a4",
    "slug": "letterheads-a4",
    "name": "Custom Letterheads (A4 / A5)",
    "category": "Corporate Stationery",
    "basePrice": 20,
    "description": "Premium A4 letterheads (MOQ 50) and custom flyers in high quality matte/glossy offset printing. Perfect for office correspondence and distribution campaigns.",
    "moq": 50,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.7,
    "reviewCount": 68,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 50,
        "max": 99,
        "price": 20
      },
      {
        "min": 100,
        "max": 249,
        "price": 19
      },
      {
        "min": 250,
        "max": 499,
        "price": 18
      },
      {
        "min": 500,
        "max": 749,
        "price": 17
      },
      {
        "min": 750,
        "max": 999,
        "price": 16
      },
      {
        "min": 1000,
        "max": 999999,
        "price": 15
      }
    ]
  },
  {
    "id": "bulk-flyers",
    "slug": "bulk-flyers",
    "name": "Bulk Offset Flyers (MOQ 2000)",
    "category": "Corporate Stationery",
    "basePrice": 0,
    "description": "Premium A4 letterheads (MOQ 50) and custom flyers in high quality matte/glossy offset printing. Perfect for office correspondence and distribution campaigns.",
    "moq": 50,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.7,
    "reviewCount": 68,
    "customizerType": "standard-tiers",
    "priceTiers": []
  },
  {
    "id": "frontlit-flex",
    "slug": "frontlit-flex",
    "name": "Normal Frontlit Flex Banner",
    "category": "Signage & Display",
    "basePrice": 35,
    "description": "Heavy duty flex frontlit and Starflex banners. Available with sturdy wooden framing or structural steel framing. Fully calculated dynamically by surface area (sqft).",
    "moq": 1,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 112,
    "badge": "Fast Shipping",
    "customizerType": "banners",
    "priceTiers": [
      {
        "min": 1,
        "max": 49,
        "price": 35
      },
      {
        "min": 50,
        "max": 249,
        "price": 31
      },
      {
        "min": 250,
        "max": 499,
        "price": 27
      },
      {
        "min": 500,
        "max": 999999,
        "price": 22
      }
    ],
    "options": [
      {
        "name": "Banner Dimensions (feet)",
        "key": "bannerDimensions",
        "type": "dimensions",
        "defaultValue": {
          "width": 6,
          "height": 4
        }
      }
    ]
  },
  {
    "id": "starflex-glossy",
    "slug": "starflex-glossy",
    "name": "Premium Starflex (Glossy)",
    "category": "Signage & Display",
    "basePrice": 45,
    "description": "Heavy duty flex frontlit and Starflex banners. Available with sturdy wooden framing or structural steel framing. Fully calculated dynamically by surface area (sqft).",
    "moq": 1,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 112,
    "badge": "Fast Shipping",
    "customizerType": "banners",
    "priceTiers": [
      {
        "min": 1,
        "max": 49,
        "price": 45
      },
      {
        "min": 50,
        "max": 249,
        "price": 41
      },
      {
        "min": 250,
        "max": 499,
        "price": 37
      },
      {
        "min": 500,
        "max": 999999,
        "price": 32
      }
    ],
    "options": [
      {
        "name": "Banner Dimensions (feet)",
        "key": "bannerDimensions",
        "type": "dimensions",
        "defaultValue": {
          "width": 6,
          "height": 4
        }
      }
    ]
  },
  {
    "id": "starflex-wood-frame",
    "slug": "starflex-wood-frame",
    "name": "Starflex with Wooden Framing",
    "category": "Signage & Display",
    "basePrice": 55,
    "description": "Heavy duty flex frontlit and Starflex banners. Available with sturdy wooden framing or structural steel framing. Fully calculated dynamically by surface area (sqft).",
    "moq": 1,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 112,
    "badge": "Fast Shipping",
    "customizerType": "banners",
    "priceTiers": [
      {
        "min": 1,
        "max": 49,
        "price": 55
      },
      {
        "min": 50,
        "max": 249,
        "price": 52
      },
      {
        "min": 250,
        "max": 999999,
        "price": 50
      }
    ],
    "options": [
      {
        "name": "Banner Dimensions (feet)",
        "key": "bannerDimensions",
        "type": "dimensions",
        "defaultValue": {
          "width": 6,
          "height": 4
        }
      }
    ]
  },
  {
    "id": "starflex-steel-frame",
    "slug": "starflex-steel-frame",
    "name": "Starflex with Steel Framing",
    "category": "Signage & Display",
    "basePrice": 95,
    "description": "Heavy duty flex frontlit and Starflex banners. Available with sturdy wooden framing or structural steel framing. Fully calculated dynamically by surface area (sqft).",
    "moq": 1,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 112,
    "badge": "Fast Shipping",
    "customizerType": "banners",
    "priceTiers": [
      {
        "min": 1,
        "max": 999999,
        "price": 95
      }
    ],
    "options": [
      {
        "name": "Banner Dimensions (feet)",
        "key": "bannerDimensions",
        "type": "dimensions",
        "defaultValue": {
          "width": 6,
          "height": 4
        }
      }
    ]
  },
  {
    "id": "polyester-lanyard-20mm",
    "slug": "polyester-lanyard-20mm",
    "name": "20mm Polyester Printed Lanyards",
    "category": "ID & Lanyards",
    "basePrice": 55,
    "description": "Premium satin-finished 20mm polyester lanyards, keychain lanyards, XXL custom PVC cards, and standard paper/PVC employee cards with clear protective sleeves.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 201,
    "customizerType": "lanyards",
    "priceTiers": [],
    "options": [
      {
        "name": "Lanyard Attachment Hook",
        "key": "lanyardHook",
        "type": "select",
        "choices": [
          {
            "label": "China Hook",
            "value": "china"
          },
          {
            "label": "Overlock Hook (+₹3.00)",
            "value": "overlock"
          },
          {
            "label": "Double China Hook (+₹3.00)",
            "value": "double-china"
          },
          {
            "label": "Safety Breakaway (+₹5.00)",
            "value": "safety-breakaway"
          }
        ],
        "defaultValue": "china"
      }
    ]
  },
  {
    "id": "keychain-lanyard",
    "slug": "keychain-lanyard",
    "name": "Printed Keychain Lanyards",
    "category": "ID & Lanyards",
    "basePrice": 45,
    "description": "Premium satin-finished 20mm polyester lanyards, keychain lanyards, XXL custom PVC cards, and standard paper/PVC employee cards with clear protective sleeves.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 201,
    "customizerType": "lanyards",
    "priceTiers": [
      {
        "min": 39,
        "max": 99,
        "price": 45
      },
      {
        "min": 100,
        "max": 149,
        "price": 37
      },
      {
        "min": 150,
        "max": 199,
        "price": 33
      },
      {
        "min": 200,
        "max": 249,
        "price": 30
      },
      {
        "min": 250,
        "max": 299,
        "price": 27
      },
      {
        "min": 300,
        "max": 399,
        "price": 25
      },
      {
        "min": 400,
        "max": 499,
        "price": 22
      },
      {
        "min": 500,
        "max": 999999,
        "price": 19
      }
    ],
    "options": [
      {
        "name": "Lanyard Attachment Hook",
        "key": "lanyardHook",
        "type": "select",
        "choices": [
          {
            "label": "China Hook",
            "value": "china"
          },
          {
            "label": "Overlock Hook (+₹3.00)",
            "value": "overlock"
          },
          {
            "label": "Double China Hook (+₹3.00)",
            "value": "double-china"
          },
          {
            "label": "Safety Breakaway (+₹5.00)",
            "value": "safety-breakaway"
          }
        ],
        "defaultValue": "china"
      }
    ]
  },
  {
    "id": "xxl-pvc-card",
    "slug": "xxl-pvc-card",
    "name": "XXL PVC ID Cards",
    "category": "ID & Lanyards",
    "basePrice": 100,
    "description": "Premium satin-finished 20mm polyester lanyards, keychain lanyards, XXL custom PVC cards, and standard paper/PVC employee cards with clear protective sleeves.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 201,
    "customizerType": "lanyards",
    "priceTiers": [
      {
        "min": 10,
        "max": 19,
        "price": 100
      },
      {
        "min": 20,
        "max": 39,
        "price": 85
      },
      {
        "min": 40,
        "max": 59,
        "price": 80
      },
      {
        "min": 60,
        "max": 99,
        "price": 75
      },
      {
        "min": 100,
        "max": 149,
        "price": 65
      },
      {
        "min": 150,
        "max": 999999,
        "price": 60
      }
    ],
    "options": [
      {
        "name": "Lanyard Attachment Hook",
        "key": "lanyardHook",
        "type": "select",
        "choices": [
          {
            "label": "China Hook",
            "value": "china"
          },
          {
            "label": "Overlock Hook (+₹3.00)",
            "value": "overlock"
          },
          {
            "label": "Double China Hook (+₹3.00)",
            "value": "double-china"
          },
          {
            "label": "Safety Breakaway (+₹5.00)",
            "value": "safety-breakaway"
          }
        ],
        "defaultValue": "china"
      }
    ]
  },
  {
    "id": "standard-pvc-card",
    "slug": "standard-pvc-card",
    "name": "Standard PVC ID Card (With Clear Cover)",
    "category": "ID & Lanyards",
    "basePrice": 40,
    "description": "Premium satin-finished 20mm polyester lanyards, keychain lanyards, XXL custom PVC cards, and standard paper/PVC employee cards with clear protective sleeves.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 201,
    "customizerType": "lanyards",
    "priceTiers": [
      {
        "min": 10,
        "max": 19,
        "price": 40
      },
      {
        "min": 20,
        "max": 39,
        "price": 35
      },
      {
        "min": 40,
        "max": 59,
        "price": 30
      },
      {
        "min": 60,
        "max": 99,
        "price": 27
      },
      {
        "min": 100,
        "max": 999999,
        "price": 25
      }
    ],
    "options": [
      {
        "name": "Lanyard Attachment Hook",
        "key": "lanyardHook",
        "type": "select",
        "choices": [
          {
            "label": "China Hook",
            "value": "china"
          },
          {
            "label": "Overlock Hook (+₹3.00)",
            "value": "overlock"
          },
          {
            "label": "Double China Hook (+₹3.00)",
            "value": "double-china"
          },
          {
            "label": "Safety Breakaway (+₹5.00)",
            "value": "safety-breakaway"
          }
        ],
        "defaultValue": "china"
      }
    ]
  },
  {
    "id": "paper-id-card",
    "slug": "paper-id-card",
    "name": "Paper ID Card (With Clear Cover)",
    "category": "ID & Lanyards",
    "basePrice": 25,
    "description": "Premium satin-finished 20mm polyester lanyards, keychain lanyards, XXL custom PVC cards, and standard paper/PVC employee cards with clear protective sleeves.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 201,
    "customizerType": "lanyards",
    "priceTiers": [
      {
        "min": 10,
        "max": 19,
        "price": 25
      },
      {
        "min": 20,
        "max": 39,
        "price": 22
      },
      {
        "min": 40,
        "max": 59,
        "price": 22
      },
      {
        "min": 60,
        "max": 99,
        "price": 20
      },
      {
        "min": 100,
        "max": 149,
        "price": 18
      },
      {
        "min": 150,
        "max": 999999,
        "price": 15
      }
    ],
    "options": [
      {
        "name": "Lanyard Attachment Hook",
        "key": "lanyardHook",
        "type": "select",
        "choices": [
          {
            "label": "China Hook",
            "value": "china"
          },
          {
            "label": "Overlock Hook (+₹3.00)",
            "value": "overlock"
          },
          {
            "label": "Double China Hook (+₹3.00)",
            "value": "double-china"
          },
          {
            "label": "Safety Breakaway (+₹5.00)",
            "value": "safety-breakaway"
          }
        ],
        "defaultValue": "china"
      }
    ]
  },
  {
    "id": "rectangle-calendar",
    "slug": "rectangle-calendar",
    "name": "Rectangle Table Desk Calendar (Landscape)",
    "category": "Calendars & Planners",
    "basePrice": 240,
    "description": "Premium wire-o bound desk table calendars, available in classic landscape rectangle and modern balanced square layouts. Excellent end-of-year custom gifts.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 46,
    "badge": "Corporate Favorite",
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 19,
        "price": 240
      },
      {
        "min": 20,
        "max": 29,
        "price": 235
      },
      {
        "min": 30,
        "max": 49,
        "price": 225
      },
      {
        "min": 50,
        "max": 99,
        "price": 200
      },
      {
        "min": 100,
        "max": 199,
        "price": 150
      },
      {
        "min": 200,
        "max": 499,
        "price": 145
      },
      {
        "min": 500,
        "max": 999999,
        "price": 135
      }
    ]
  },
  {
    "id": "square-calendar",
    "slug": "square-calendar",
    "name": "Square Table Desk Calendar (Balanced)",
    "category": "Calendars & Planners",
    "basePrice": 280,
    "description": "Premium wire-o bound desk table calendars, available in classic landscape rectangle and modern balanced square layouts. Excellent end-of-year custom gifts.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 46,
    "badge": "Corporate Favorite",
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 19,
        "price": 280
      },
      {
        "min": 20,
        "max": 29,
        "price": 265
      },
      {
        "min": 30,
        "max": 49,
        "price": 245
      },
      {
        "min": 50,
        "max": 99,
        "price": 225
      },
      {
        "min": 100,
        "max": 199,
        "price": 180
      },
      {
        "min": 200,
        "max": 499,
        "price": 165
      },
      {
        "min": 500,
        "max": 999999,
        "price": 140
      }
    ]
  },
  {
    "id": "custom-apparel",
    "slug": "custom-apparel",
    "name": "Custom Corporate Apparel & Embroidery",
    "category": "Apparel & Embroidery",
    "basePrice": 0,
    "description": "Premium customized t-shirts, hoodies, jackets, and athletic jerseys featuring multi-color prints or structural heavy duty embroidery. Quote based on volume and complexity.",
    "moq": 1,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 382,
    "badge": "Premium Quality",
    "customizerType": "email-quote-only"
  },
  {
    "id": "custom-apparel-regular",
    "slug": "custom-apparel-regular",
    "name": "Custom Apparel & Embroidery",
    "category": "Apparel & Embroidery",
    "basePrice": 0,
    "description": "Premium customized t-shirts, hoodies, jackets, and athletic jerseys featuring multi-color prints or structural heavy duty embroidery. Quote based on volume and complexity.",
    "moq": 1,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.9,
    "reviewCount": 382,
    "badge": "Premium Quality",
    "customizerType": "email-quote-only"
  },
  {
    "id": "bifold",
    "slug": "bifold",
    "name": "Bi-Fold Brochures (4 Pages)",
    "category": "Marketing Materials",
    "basePrice": 20,
    "description": "Custom folded flyers and multi-page corporate bifold, trifold, and Z-fold brochures. Thick 130 GSM offset paper with clean creasing and dynamic bulk discounts.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.6,
    "reviewCount": 52,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 20
      },
      {
        "min": 50,
        "max": 499,
        "price": 18
      },
      {
        "min": 500,
        "max": 999,
        "price": 17.5
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 16
      },
      {
        "min": 3000,
        "max": 999999,
        "price": 15
      }
    ]
  },
  {
    "id": "trifold",
    "slug": "trifold",
    "name": "Tri-Fold Brochures (6 Panels)",
    "category": "Marketing Materials",
    "basePrice": 25,
    "description": "Custom folded flyers and multi-page corporate bifold, trifold, and Z-fold brochures. Thick 130 GSM offset paper with clean creasing and dynamic bulk discounts.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.6,
    "reviewCount": 52,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 25
      },
      {
        "min": 50,
        "max": 499,
        "price": 23
      },
      {
        "min": 500,
        "max": 999,
        "price": 22.5
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 21
      },
      {
        "min": 3000,
        "max": 999999,
        "price": 20
      }
    ]
  },
  {
    "id": "zfold",
    "slug": "zfold",
    "name": "Z-Fold Brochures (6 Panels Accordion)",
    "category": "Marketing Materials",
    "basePrice": 25,
    "description": "Custom folded flyers and multi-page corporate bifold, trifold, and Z-fold brochures. Thick 130 GSM offset paper with clean creasing and dynamic bulk discounts.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.6,
    "reviewCount": 52,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 25
      },
      {
        "min": 50,
        "max": 499,
        "price": 23
      },
      {
        "min": 500,
        "max": 999,
        "price": 22.5
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 21
      },
      {
        "min": 3000,
        "max": 999999,
        "price": 20
      }
    ]
  },
  {
    "id": "a5-diary",
    "slug": "a5-diary",
    "name": "A5 Hardbound Diary",
    "category": "Calendars & Planners",
    "basePrice": 310,
    "description": "Luxury hardbound corporate diaries in A4 and A5 sizes. Includes debossed covers, satin ribbons, ruled pages, and dynamic company logo engraving.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 77,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 310
      },
      {
        "min": 50,
        "max": 99,
        "price": 305
      },
      {
        "min": 100,
        "max": 299,
        "price": 300
      },
      {
        "min": 300,
        "max": 499,
        "price": 295
      },
      {
        "min": 500,
        "max": 999,
        "price": 290
      },
      {
        "min": 1000,
        "max": 999999,
        "price": 275
      }
    ]
  },
  {
    "id": "a4-diary",
    "slug": "a4-diary",
    "name": "A4 Hardbound Diary (Large Desk Size)",
    "category": "Calendars & Planners",
    "basePrice": 450,
    "description": "Luxury hardbound corporate diaries in A4 and A5 sizes. Includes debossed covers, satin ribbons, ruled pages, and dynamic company logo engraving.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 77,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 450
      },
      {
        "min": 50,
        "max": 99,
        "price": 430
      },
      {
        "min": 100,
        "max": 299,
        "price": 410
      },
      {
        "min": 300,
        "max": 499,
        "price": 390
      },
      {
        "min": 500,
        "max": 999,
        "price": 370
      },
      {
        "min": 1000,
        "max": 999999,
        "price": 350
      }
    ]
  },
  {
    "id": "bookmarks",
    "slug": "bookmarks",
    "name": "Custom Gloss Bookmarks",
    "category": "Marketing Materials",
    "basePrice": 20,
    "description": "Laminated cardstock bookmarks and table top tent cards. Extremely effective for restaurant menus, promotional counter displays, and custom reading inserts.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.5,
    "reviewCount": 39,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 20
      },
      {
        "min": 50,
        "max": 99,
        "price": 18
      },
      {
        "min": 100,
        "max": 299,
        "price": 16
      },
      {
        "min": 300,
        "max": 499,
        "price": 12
      },
      {
        "min": 500,
        "max": 999,
        "price": 10
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 8
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 6
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 5
      }
    ]
  },
  {
    "id": "tent-cards",
    "slug": "tent-cards",
    "name": "Table Top Tent Cards",
    "category": "Marketing Materials",
    "basePrice": 20,
    "description": "Laminated cardstock bookmarks and table top tent cards. Extremely effective for restaurant menus, promotional counter displays, and custom reading inserts.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.5,
    "reviewCount": 39,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 20
      },
      {
        "min": 50,
        "max": 99,
        "price": 18
      },
      {
        "min": 100,
        "max": 299,
        "price": 15
      },
      {
        "min": 300,
        "max": 499,
        "price": 12
      },
      {
        "min": 500,
        "max": 999,
        "price": 11
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 10
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 8
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 6
      }
    ]
  },
  {
    "id": "custom-stickers",
    "slug": "custom-stickers",
    "name": "Custom Stickers (Die-cut)",
    "category": "Promotional Products",
    "basePrice": 25,
    "description": "Printed custom die-cut stickers.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.7,
    "reviewCount": 184,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 25
      },
      {
        "min": 50,
        "max": 99,
        "price": 22
      },
      {
        "min": 100,
        "max": 299,
        "price": 20
      },
      {
        "min": 300,
        "max": 499,
        "price": 20
      },
      {
        "min": 500,
        "max": 999,
        "price": 18
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 15
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 8
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 17
      }
    ]
  },
  {
    "id": "hang-tags",
    "slug": "hang-tags",
    "name": "Hang Tags / Clothing Tags",
    "category": "Promotional Products",
    "basePrice": 12,
    "description": "Custom printed clothing hang tags.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.7,
    "reviewCount": 184,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 12
      },
      {
        "min": 50,
        "max": 99,
        "price": 11
      },
      {
        "min": 100,
        "max": 299,
        "price": 10
      },
      {
        "min": 300,
        "max": 499,
        "price": 8
      },
      {
        "min": 500,
        "max": 999,
        "price": 7
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 6.5
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 5
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 4.5
      }
    ]
  },
  {
    "id": "ceramic-mugs",
    "slug": "ceramic-mugs",
    "name": "Ceramic Mugs (Sublimation Print)",
    "category": "Promotional Products",
    "basePrice": 200,
    "description": "Premium sublimation printed ceramic mugs.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.7,
    "reviewCount": 184,
    "customizerType": "upload-only",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 200
      },
      {
        "min": 50,
        "max": 99,
        "price": 180
      },
      {
        "min": 100,
        "max": 299,
        "price": 165
      },
      {
        "min": 300,
        "max": 499,
        "price": 150
      },
      {
        "min": 500,
        "max": 999,
        "price": 140
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 130
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 120
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 110
      }
    ]
  },
  {
    "id": "standees",
    "slug": "standees",
    "name": "Premium Roll-up Standees",
    "category": "Promotional Products",
    "basePrice": 1800,
    "description": "Premium roll-up standees for events.",
    "moq": 1,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.7,
    "reviewCount": 184,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 1,
        "max": 1,
        "price": 1800
      },
      {
        "min": 2,
        "max": 2,
        "price": 1750
      },
      {
        "min": 3,
        "max": 3,
        "price": 1700
      },
      {
        "min": 4,
        "max": 4,
        "price": 1650
      },
      {
        "min": 5,
        "max": 5,
        "price": 1600
      },
      {
        "min": 6,
        "max": 6,
        "price": 1550
      },
      {
        "min": 7,
        "max": 999999,
        "price": 1500
      }
    ]
  },
  {
    "id": "badges",
    "slug": "badges",
    "name": "Safety Pin Button Badges",
    "category": "Promotional Products",
    "basePrice": 33,
    "description": "Custom printed safety pin button badges.",
    "moq": 25,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.7,
    "reviewCount": 184,
    "customizerType": "upload-only",
    "priceTiers": [
      {
        "min": 25,
        "max": 49,
        "price": 33
      },
      {
        "min": 50,
        "max": 74,
        "price": 31
      },
      {
        "min": 75,
        "max": 99,
        "price": 29
      },
      {
        "min": 100,
        "max": 149,
        "price": 27
      },
      {
        "min": 150,
        "max": 299,
        "price": 25
      },
      {
        "min": 300,
        "max": 499,
        "price": 22
      },
      {
        "min": 500,
        "max": 999999,
        "price": 20
      }
    ]
  },
  {
    "id": "danglers",
    "slug": "danglers",
    "name": "Ceiling Danglers",
    "category": "Promotional Products",
    "basePrice": 20,
    "description": "Custom printed ceiling marketing danglers.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.7,
    "reviewCount": 184,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 24,
        "price": 20
      },
      {
        "min": 25,
        "max": 49,
        "price": 19.5
      },
      {
        "min": 50,
        "max": 74,
        "price": 19
      },
      {
        "min": 75,
        "max": 99,
        "price": 18.5
      },
      {
        "min": 100,
        "max": 149,
        "price": 18
      },
      {
        "min": 150,
        "max": 299,
        "price": 17
      },
      {
        "min": 300,
        "max": 499,
        "price": 16
      },
      {
        "min": 500,
        "max": 999999,
        "price": 15
      }
    ]
  },
  {
    "id": "invoice-books",
    "slug": "invoice-books",
    "name": "Invoice Books (A4, 50 Sets)",
    "category": "Corporate Stationery",
    "basePrice": 185,
    "description": "Standard duplicate receipt books, A4 invoice books, hardbound register books, adhesive office stickers, and custom printed certificates on thick 300 GSM cards.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 65,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 185
      },
      {
        "min": 50,
        "max": 99,
        "price": 165
      },
      {
        "min": 100,
        "max": 299,
        "price": 150
      },
      {
        "min": 300,
        "max": 499,
        "price": 130
      },
      {
        "min": 500,
        "max": 999,
        "price": 120
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 110
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 100
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 90
      }
    ]
  },
  {
    "id": "receipt-books",
    "slug": "receipt-books",
    "name": "Receipt Books (Duplicate, 50 Sets)",
    "category": "Corporate Stationery",
    "basePrice": 155,
    "description": "Standard duplicate receipt books, A4 invoice books, hardbound register books, adhesive office stickers, and custom printed certificates on thick 300 GSM cards.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 65,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 155
      },
      {
        "min": 50,
        "max": 99,
        "price": 135
      },
      {
        "min": 100,
        "max": 299,
        "price": 120
      },
      {
        "min": 300,
        "max": 499,
        "price": 105
      },
      {
        "min": 500,
        "max": 999,
        "price": 95
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 85
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 75
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 65
      }
    ]
  },
  {
    "id": "register-books",
    "slug": "register-books",
    "name": "Register Books (A4 Hardbound, 100 pgs)",
    "category": "Corporate Stationery",
    "basePrice": 285,
    "description": "Standard duplicate receipt books, A4 invoice books, hardbound register books, adhesive office stickers, and custom printed certificates on thick 300 GSM cards.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 65,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 285
      },
      {
        "min": 50,
        "max": 99,
        "price": 255
      },
      {
        "min": 100,
        "max": 299,
        "price": 235
      },
      {
        "min": 300,
        "max": 499,
        "price": 215
      },
      {
        "min": 500,
        "max": 999,
        "price": 200
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 185
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 170
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 155
      }
    ]
  },
  {
    "id": "office-labels",
    "slug": "office-labels",
    "name": "Adhesive Office Labels",
    "category": "Corporate Stationery",
    "basePrice": 25,
    "description": "Standard duplicate receipt books, A4 invoice books, hardbound register books, adhesive office stickers, and custom printed certificates on thick 300 GSM cards.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 65,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 25
      },
      {
        "min": 50,
        "max": 99,
        "price": 17
      },
      {
        "min": 100,
        "max": 299,
        "price": 14
      },
      {
        "min": 300,
        "max": 499,
        "price": 11
      },
      {
        "min": 500,
        "max": 999,
        "price": 10
      },
      {
        "min": 1000,
        "max": 2999,
        "price": 9
      },
      {
        "min": 3000,
        "max": 4999,
        "price": 8
      },
      {
        "min": 5000,
        "max": 999999,
        "price": 7.5
      }
    ]
  },
  {
    "id": "certificates",
    "slug": "certificates",
    "name": "A4 Certificates (300 GSM)",
    "category": "Corporate Stationery",
    "basePrice": 25,
    "description": "Standard duplicate receipt books, A4 invoice books, hardbound register books, adhesive office stickers, and custom printed certificates on thick 300 GSM cards.",
    "moq": 10,
    "images": [
      "/images/placeholder-product.jpg"
    ],
    "rating": 4.8,
    "reviewCount": 65,
    "customizerType": "standard-tiers",
    "priceTiers": [
      {
        "min": 10,
        "max": 49,
        "price": 25
      },
      {
        "min": 50,
        "max": 74,
        "price": 23
      },
      {
        "min": 75,
        "max": 99,
        "price": 21
      },
      {
        "min": 100,
        "max": 149,
        "price": 19
      },
      {
        "min": 150,
        "max": 199,
        "price": 17
      },
      {
        "min": 200,
        "max": 249,
        "price": 16
      },
      {
        "min": 250,
        "max": 299,
        "price": 15
      },
      {
        "min": 300,
        "max": 499,
        "price": 14
      },
      {
        "min": 500,
        "max": 999999,
        "price": 12
      }
    ]
  }
];
