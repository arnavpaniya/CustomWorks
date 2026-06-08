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
  isQuoteOnly?: boolean;
  
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
    id: "visiting-card-300gsm",
    slug: "visiting-card-300gsm",
    name: "Visiting Card 300 GSM",
    category: "Business Cards",
    basePrice: 1.75,
    description: "Premium-quality business cards printed on durable 300 GSM card stock, designed to leave a lasting professional impression. Perfect for entrepreneurs, corporate professionals, startups, students, and those looking to network at events. Customise your visiting cards with your logo, brand colours, contact details, and unique design elements to reflect your identity.\n\n• Material: Premium 300 GSM Card Stock\n• Finish: Smooth Matte Finish\n• Printing Technology: High-Quality Digital Printing\n• Card Size: Standard Visiting Card Size",
    moq: 200,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 154,
    customizerType: "business-cards",
    priceTiers: [
      { min: 200, max: 299, price: 1.75 },
      { min: 300, max: 399, price: 1.72 },
      { min: 400, max: 499, price: 1.69 },
      { min: 500, max: 599, price: 1.66 },
      { min: 600, max: 699, price: 1.63 },
      { min: 700, max: 799, price: 1.60 },
      { min: 800, max: 899, price: 1.57 },
      { min: 900, max: 999, price: 1.54 },
      { min: 1000, max: 1499, price: 1.50 },
      { min: 1500, max: 1999, price: 1.45 },
      { min: 2000, max: 2999, price: 1.40 },
      { min: 3000, max: 4999, price: 1.30 },
      { min: 5000, max: 7499, price: 1.25 },
      { min: 7500, max: 9999, price: 1.15 },
      { min: 10000, max: 19999, price: 1.00 },
      { min: 20000, max: 999999, price: 0.95 }
    ],
    options: [
      {
        name: "Print Sides",
        key: "printSides",
        type: "select",
        choices: [
          { label: "Double Sided", value: "double-sided" },
          { label: "Single Sided (50% off base rate)", value: "single-sided" }
        ],
        defaultValue: "double-sided"
      },
      {
        name: "Corners Finish",
        key: "corners",
        type: "select",
        choices: [
          { label: "Sharp Standard Edges", value: "sharp" },
          { label: "Rounded Edges (+₹0.95/card)", value: "rounded", priceAdj: 0.95 }
        ],
        defaultValue: "sharp"
      }
    ]
  },
  {
    id: "visiting-card-350gsm",
    slug: "visiting-card-350gsm",
    name: "Visiting Card 350 GSM",
    category: "Business Cards",
    basePrice: 2.50,
    description: "Premium 350 GSM matte business cards designed for a stronger, thicker, and more professional feel. The matte finish provides a smooth, elegant texture with a refined look.\n\n• Material: Premium 350 GSM Matte Card Stock\n• Finish: Elegant Matte Finish (Non-Glossy)\n• Card Size: Standard Visiting Card Size",
    moq: 500,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 92,
    customizerType: "business-cards",
    priceTiers: [
      { min: 500, max: 599, price: 2.50 },
      { min: 600, max: 699, price: 2.45 },
      { min: 700, max: 799, price: 2.40 },
      { min: 800, max: 899, price: 2.35 },
      { min: 900, max: 999, price: 2.30 },
      { min: 1000, max: 1499, price: 2.25 },
      { min: 1500, max: 1999, price: 2.20 },
      { min: 2000, max: 2999, price: 2.15 },
      { min: 3000, max: 4999, price: 2.05 },
      { min: 5000, max: 7499, price: 1.95 },
      { min: 7500, max: 9999, price: 1.85 },
      { min: 10000, max: 19999, price: 1.75 },
      { min: 20000, max: 29999, price: 1.60 },
      { min: 30000, max: 999999, price: 1.50 }
    ],
    options: [
      {
        name: "Print Sides",
        key: "printSides",
        type: "select",
        choices: [
          { label: "Double Sided", value: "double-sided" },
          { label: "Single Sided (50% off base rate)", value: "single-sided" }
        ],
        defaultValue: "double-sided"
      },
      {
        name: "Matte/Glossy Finish",
        key: "finish",
        type: "select",
        choices: [
          { label: "Matte Finish", value: "matte" },
          { label: "Glossy Finish", value: "glossy" }
        ],
        defaultValue: "matte"
      },
      {
        name: "Corners Finish",
        key: "corners",
        type: "select",
        choices: [
          { label: "Sharp Standard Edges", value: "sharp" },
          { label: "Rounded Edges (+₹0.95/card)", value: "rounded", priceAdj: 0.95 }
        ],
        defaultValue: "sharp"
      }
    ]
  },
  {
    id: "visiting-card-400gsm",
    slug: "visiting-card-400gsm",
    name: "Visiting Card 400 GSM",
    category: "Business Cards",
    basePrice: 3.50,
    description: "High-quality 400 GSM business cards designed for enhanced durability and a strong professional presence. The thicker card stock offers a firm, refined feel.\n\n• Material: High-Quality 400 GSM Card Stock\n• Finish: Smooth Professional Matte Finish\n• Card Size: Standard Visiting Card Size",
    moq: 200,
    images: ["/images/placeholder-product.jpg"],
    rating: 5.0,
    reviewCount: 41,
    customizerType: "business-cards",
    priceTiers: [
      { min: 200, max: 299, price: 3.50 },
      { min: 300, max: 399, price: 3.45 },
      { min: 400, max: 499, price: 3.40 },
      { min: 500, max: 599, price: 3.35 },
      { min: 600, max: 699, price: 3.30 },
      { min: 700, max: 799, price: 3.25 },
      { min: 800, max: 899, price: 3.20 },
      { min: 900, max: 999, price: 3.15 },
      { min: 1000, max: 1499, price: 3.05 },
      { min: 1500, max: 1999, price: 2.95 },
      { min: 2000, max: 2999, price: 2.85 },
      { min: 3000, max: 4999, price: 2.75 },
      { min: 5000, max: 7499, price: 2.65 },
      { min: 7500, max: 9999, price: 2.55 },
      { min: 10000, max: 19999, price: 2.45 },
      { min: 20000, max: 29999, price: 2.30 },
      { min: 30000, max: 999999, price: 2.25 }
    ],
    options: [
      {
        name: "Print Sides",
        key: "printSides",
        type: "select",
        choices: [
          { label: "Double Sided", value: "double-sided" },
          { label: "Single Sided (50% off base rate)", value: "single-sided" }
        ],
        defaultValue: "double-sided"
      },
      {
        name: "Corners Finish",
        key: "corners",
        type: "select",
        choices: [
          { label: "Sharp Standard Edges", value: "sharp" },
          { label: "Rounded Edges (+₹0.95/card)", value: "rounded", priceAdj: 0.95 }
        ],
        defaultValue: "sharp"
      }
    ]
  },
  {
    id: "textured-visiting-cards",
    slug: "textured-visiting-cards",
    name: "Textured Visiting Cards",
    category: "Business Cards",
    basePrice: 3.50,
    description: "Premium textured visiting cards crafted to deliver a distinctive and sophisticated impression.\n\n• Material: Premium Textured Card Stock\n• Finish: Elegant Surface Texture",
    moq: 500,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 65,
    customizerType: "business-cards",
    priceTiers: [
      { min: 500, max: 599, price: 3.50 },
      { min: 600, max: 699, price: 3.45 },
      { min: 700, max: 799, price: 3.40 },
      { min: 800, max: 899, price: 3.35 },
      { min: 900, max: 999, price: 3.30 },
      { min: 1000, max: 1499, price: 3.25 },
      { min: 1500, max: 1999, price: 3.15 },
      { min: 2000, max: 2999, price: 3.05 },
      { min: 3000, max: 4999, price: 2.95 },
      { min: 5000, max: 7499, price: 2.85 },
      { min: 7500, max: 9999, price: 2.75 },
      { min: 10000, max: 19999, price: 2.65 },
      { min: 20000, max: 29999, price: 2.40 },
      { min: 30000, max: 999999, price: 2.25 }
    ],
    options: [
      {
        name: "Texture Variant",
        key: "texture",
        type: "select",
        choices: [
          { label: "White Texture", value: "white" },
          { label: "Cream Texture", value: "cream" },
          { label: "Ivory Paper", value: "ivory" },
          { label: "Criss Cross Texture", value: "criss-cross" },
          { label: "Needle Point Texture", value: "needle-point" }
        ],
        defaultValue: "white"
      },
      {
        name: "Corners Finish",
        key: "corners",
        type: "select",
        choices: [
          { label: "Sharp Standard Edges", value: "sharp" },
          { label: "Rounded Edges (+₹0.95/card)", value: "rounded", priceAdj: 0.95 }
        ],
        defaultValue: "sharp"
      }
    ]
  },
  {
    id: "metallic-visiting-cards",
    slug: "metallic-visiting-cards",
    name: "Metallic Finishing Visiting Card",
    category: "Business Cards",
    basePrice: 5.50,
    description: "Metallic finishing visiting cards designed to create a striking and premium visual impact. Featuring elegant metallic highlights.\n\n• Finish: Metallic Highlight Finish\n• Printing: High-Resolution Digital Printing with Metallic Foil Effect",
    moq: 500,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 38,
    customizerType: "business-cards",
    priceTiers: [
      { min: 500, max: 599, price: 5.50 },
      { min: 600, max: 699, price: 5.35 },
      { min: 700, max: 799, price: 5.20 },
      { min: 800, max: 899, price: 5.05 },
      { min: 900, max: 999, price: 4.90 },
      { min: 1000, max: 1499, price: 4.75 },
      { min: 1500, max: 1999, price: 4.55 },
      { min: 2000, max: 2999, price: 4.35 },
      { min: 3000, max: 4999, price: 4.05 },
      { min: 5000, max: 7499, price: 3.75 },
      { min: 7500, max: 9999, price: 3.45 },
      { min: 10000, max: 19999, price: 3.15 },
      { min: 20000, max: 29999, price: 2.50 },
      { min: 30000, max: 999999, price: 2.25 }
    ],
    options: [
      {
        name: "Metallic Finish",
        key: "foil",
        type: "select",
        choices: [
          { label: "Gold Foil Highlight", value: "gold" },
          { label: "Silver Foil Highlight", value: "silver" }
        ],
        defaultValue: "gold"
      },
      {
        name: "Corners Finish",
        key: "corners",
        type: "select",
        choices: [
          { label: "Sharp Standard Edges", value: "sharp" },
          { label: "Rounded Edges (+₹0.95/card)", value: "rounded", priceAdj: 0.95 }
        ],
        defaultValue: "sharp"
      }
    ]
  },
  {
    id: "square-cut-visiting-card",
    slug: "square-cut-visiting-card",
    name: "Square Cut Visiting Card",
    category: "Business Cards",
    basePrice: 2.00,
    description: "Modern square cut visiting cards designed to offer a unique and contemporary alternative to traditional rectangular cards.\n\n• Material: Premium 300 GSM Card Stock\n• Card Shape: Square Cut Format",
    moq: 400,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 42,
    customizerType: "business-cards",
    priceTiers: [
      { min: 400, max: 499, price: 2.00 },
      { min: 500, max: 599, price: 1.95 },
      { min: 600, max: 699, price: 1.90 },
      { min: 700, max: 799, price: 1.85 },
      { min: 800, max: 899, price: 1.80 },
      { min: 900, max: 999, price: 1.75 },
      { min: 1000, max: 1499, price: 1.70 },
      { min: 1500, max: 1999, price: 1.60 },
      { min: 2000, max: 2999, price: 1.50 },
      { min: 3000, max: 4999, price: 1.40 },
      { min: 5000, max: 7499, price: 1.30 },
      { min: 7500, max: 9999, price: 1.15 },
      { min: 10000, max: 19999, price: 1.00 },
      { min: 20000, max: 29999, price: 0.90 },
      { min: 30000, max: 999999, price: 0.85 }
    ],
    options: [
      {
        name: "Print Sides",
        key: "printSides",
        type: "select",
        choices: [
          { label: "Double Sided", value: "double-sided" },
          { label: "Single Sided (50% off base rate)", value: "single-sided" }
        ],
        defaultValue: "double-sided"
      },
      {
        name: "Corners Finish",
        key: "corners",
        type: "select",
        choices: [
          { label: "Sharp Standard Edges", value: "sharp" },
          { label: "Rounded Edges (+₹0.95/card)", value: "rounded", priceAdj: 0.95 }
        ],
        defaultValue: "sharp"
      }
    ]
  },
  {
    id: "mini-business-card",
    slug: "mini-business-card",
    name: "Mini Business Card",
    category: "Business Cards",
    basePrice: 1.85,
    description: "Compact and stylish mini business cards designed for a modern and minimal presentation.\n\n• Material: Premium 300 GSM Card Stock\n• Card Size: Mini Business Card Format",
    moq: 300,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 31,
    customizerType: "business-cards",
    priceTiers: [
      { min: 300, max: 399, price: 1.85 },
      { min: 400, max: 499, price: 1.80 },
      { min: 500, max: 599, price: 1.75 },
      { min: 600, max: 699, price: 1.70 },
      { min: 700, max: 799, price: 1.65 },
      { min: 800, max: 899, price: 1.60 },
      { min: 900, max: 999, price: 1.55 },
      { min: 1000, max: 1499, price: 1.50 },
      { min: 1500, max: 1999, price: 1.45 },
      { min: 2000, max: 2999, price: 1.40 },
      { min: 3000, max: 4999, price: 1.30 },
      { min: 5000, max: 7499, price: 1.25 },
      { min: 7500, max: 9999, price: 1.15 },
      { min: 10000, max: 19999, price: 1.05 },
      { min: 20000, max: 29999, price: 1.00 },
      { min: 30000, max: 999999, price: 0.95 }
    ],
    options: [
      {
        name: "Print Sides",
        key: "printSides",
        type: "select",
        choices: [
          { label: "Double Sided", value: "double-sided" },
          { label: "Single Sided (50% off base rate)", value: "single-sided" }
        ],
        defaultValue: "double-sided"
      },
      {
        name: "Corners Finish",
        key: "corners",
        type: "select",
        choices: [
          { label: "Sharp Standard Edges", value: "sharp" },
          { label: "Rounded Edges (+₹0.95/card)", value: "rounded", priceAdj: 0.95 }
        ],
        defaultValue: "sharp"
      }
    ]
  },
  {
    id: "envelopes-dl",
    slug: "envelopes-dl",
    name: "DL Printed Envelopes",
    category: "Corporate Identity",
    basePrice: 20.00,
    description: "Professionally printed DL size envelopes designed to enhance brand presentation and maintain a polished corporate identity.\n\n• Material: High-Quality Envelope Paper\n• Size: DL Size Envelope\n• Print: Single-Sided Printing",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 45,
    customizerType: "envelopes",
    priceTiers: [
      { min: 10, max: 24, price: 20.00 },
      { min: 25, max: 49, price: 19.00 },
      { min: 50, max: 99, price: 18.00 },
      { min: 100, max: 199, price: 17.00 },
      { min: 200, max: 299, price: 16.00 },
      { min: 300, max: 399, price: 15.50 },
      { min: 400, max: 499, price: 15.00 },
      { min: 500, max: 999, price: 14.50 },
      { min: 1000, max: 1499, price: 13.50 },
      { min: 1500, max: 1999, price: 12.50 },
      { min: 2000, max: 2499, price: 11.50 },
      { min: 2500, max: 4999, price: 10.75 },
      { min: 5000, max: 7499, price: 9.00 },
      { min: 7500, max: 9999, price: 7.50 },
      { min: 10000, max: 999999, price: 6.00 }
    ]
  },
  {
    id: "envelopes-c5",
    slug: "envelopes-c5",
    name: "C5 Printed Envelopes",
    category: "Corporate Identity",
    basePrice: 23.00,
    description: "Professionally printed C5 size envelopes designed to enhance brand presentation and maintain a polished corporate identity.\n\n• Material: High-Quality Envelope Paper\n• Size: C5 Size Envelope\n• Print: Single-Sided Printing",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 30,
    customizerType: "envelopes",
    priceTiers: [
      { min: 10, max: 24, price: 23.00 },
      { min: 25, max: 49, price: 22.00 },
      { min: 50, max: 99, price: 21.00 },
      { min: 100, max: 199, price: 20.00 },
      { min: 200, max: 299, price: 19.00 },
      { min: 300, max: 399, price: 18.50 },
      { min: 400, max: 499, price: 18.00 },
      { min: 500, max: 999, price: 17.50 },
      { min: 1000, max: 1499, price: 16.50 },
      { min: 1500, max: 1999, price: 15.50 },
      { min: 2000, max: 2499, price: 14.50 },
      { min: 2500, max: 4999, price: 14.00 },
      { min: 5000, max: 7499, price: 12.50 },
      { min: 7500, max: 9999, price: 11.25 },
      { min: 10000, max: 999999, price: 10.00 }
    ]
  },
  {
    id: "envelopes-c4",
    slug: "envelopes-c4",
    name: "C4 Printed Envelopes",
    category: "Corporate Identity",
    basePrice: 30.00,
    description: "Professionally printed C4 size envelopes designed to enhance brand presentation and maintain a polished corporate identity.\n\n• Material: High-Quality Envelope Paper\n• Size: C4 Size Envelope\n• Print: Single-Sided Printing",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 22,
    customizerType: "envelopes",
    priceTiers: [
      { min: 10, max: 24, price: 30.00 },
      { min: 25, max: 49, price: 28.50 },
      { min: 50, max: 99, price: 27.00 },
      { min: 100, max: 199, price: 25.50 },
      { min: 200, max: 299, price: 24.00 },
      { min: 300, max: 399, price: 23.00 },
      { min: 400, max: 499, price: 22.00 },
      { min: 500, max: 999, price: 21.00 },
      { min: 1000, max: 1499, price: 19.50 },
      { min: 1500, max: 1999, price: 18.50 },
      { min: 2000, max: 2499, price: 17.50 },
      { min: 2500, max: 4999, price: 17.00 },
      { min: 5000, max: 7499, price: 15.50 },
      { min: 7500, max: 9999, price: 14.75 },
      { min: 10000, max: 999999, price: 14.00 }
    ]
  },
  {
    id: "flyers-a5-90gsm",
    slug: "flyers-a5-90gsm",
    name: "Bulk Double-Sided Flyers A5 (90 GSM)",
    category: "Marketing & Promotions",
    basePrice: 0,
    isQuoteOnly: true,
    description: "Professionally printed marketing materials designed to enhance brand visibility. 90 GSM Maplitho / Art Paper (Matte Finish).\nDouble-Sided (4+4 CMYK).\nIdeal for mass promotions and retail offers.",
    moq: 2000,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 15,
    customizerType: "email-quote-only"
  },
  {
    id: "flyers-a5-130gsm",
    slug: "flyers-a5-130gsm",
    name: "Bulk Double-Sided Flyers A5 (130 GSM)",
    category: "Marketing & Promotions",
    basePrice: 0,
    isQuoteOnly: true,
    description: "Premium promotional flyers printed on 130 GSM Art Paper (Glossy / Matte Finish). Double-Sided (4+4 CMYK).\nIdeal for premium promotional campaigns, product launches, exhibitions.",
    moq: 2000,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 12,
    customizerType: "email-quote-only"
  },
  {
    id: "flyers-a4-90gsm",
    slug: "flyers-a4-90gsm",
    name: "Bulk Double-Sided Flyers A4 (90 GSM)",
    category: "Marketing & Promotions",
    basePrice: 0,
    isQuoteOnly: true,
    description: "Large format A4 flyers printed on 90 GSM Maplitho / Art Paper. Double-Sided (4+4 CMYK).\nIdeal for corporate brochures, real estate marketing, and detailed infographics.",
    moq: 2000,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 10,
    customizerType: "email-quote-only"
  },
  {
    id: "flyers-a4-130gsm",
    slug: "flyers-a4-130gsm",
    name: "Bulk Double-Sided Flyers A4 (130 GSM)",
    category: "Marketing & Promotions",
    basePrice: 0,
    isQuoteOnly: true,
    description: "Large format A4 flyers printed on 130 GSM Maplitho / Art Paper. Double-Sided (4+4 CMYK).\nPremium quality ideal for corporate brochures, real estate marketing, and detailed infographics.",
    moq: 2000,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 18,
    customizerType: "email-quote-only"
  },
  {
    id: "brochures-premium-multipage",
    slug: "brochures-premium-multipage",
    name: "Premium Multi-Page Brochures / Catalogs",
    category: "Marketing & Promotions",
    basePrice: 0,
    isQuoteOnly: true,
    description: "High-end multi-page saddle-stitched or perfect bound brochures. Ideal for extensive product catalogs, company profiles, and premium marketing collateral. Various paper thicknesses and premium finishes available.",
    moq: 100,
    images: ["/images/placeholder-product.jpg"],
    rating: 5.0,
    reviewCount: 28,
    customizerType: "email-quote-only"
  },
  {
    id: "custom-letterheads",
    slug: "custom-letterheads",
    name: "Custom Letterheads",
    category: "Corporate Identity",
    basePrice: 20.00,
    description: "Professionally printed letterheads designed to maintain brand identity and ensure formal communication consistency.\n• Material: 80–100 GSM Bond Paper / Executive Bond\n• Print: Single-Sided (1+0 or 4+0 CMYK)\n• Sizes: A5 or A4",
    moq: 50,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 56,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 50, max: 99, price: 20.00 },
      { min: 100, max: 249, price: 19.00 },
      { min: 250, max: 499, price: 18.00 },
      { min: 500, max: 749, price: 17.00 },
      { min: 750, max: 999, price: 16.00 },
      { min: 1000, max: 999999, price: 15.00 }
    ],
    options: [
      {
        name: "Size",
        key: "size",
        type: "select",
        choices: [
          { label: "A4 Size", value: "a4" },
          { label: "A5 Size", value: "a5" }
        ],
        defaultValue: "a4"
      }
    ]
  },
  {
    id: "flex-banners",
    slug: "flex-banners",
    name: "Normal Flex Banners (Frontlit)",
    category: "Marketing & Promotions",
    basePrice: 35.00,
    description: "High-quality flex banners designed for indoor and outdoor promotional visibility.\n• Material: 280–300 GSM Frontlit Flex\n• Finishing Options: Eyelets, Folding, Hemming",
    moq: 1,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 89,
    customizerType: "area-tiers",
    priceTiers: [
      { min: 1, max: 49, price: 35.00 },
      { min: 50, max: 249, price: 31.00 },
      { min: 250, max: 499, price: 27.00 },
      { min: 500, max: 750, price: 22.00 },
      { min: 751, max: 999999, price: 22.00 }
    ]
  },
  {
    id: "starflex-banners",
    slug: "starflex-banners",
    name: "Premium Starflex Banners",
    category: "Marketing & Promotions",
    basePrice: 45.00,
    description: "Premium Glossy Starflex banners designed for enhanced brightness, superior surface smoothness, and sharper image clarity.\n• Material: 300–340 GSM Premium Starflex (Glossy Finish)",
    moq: 1,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 65,
    customizerType: "area-tiers",
    priceTiers: [
      { min: 1, max: 49, price: 45.00 },
      { min: 50, max: 249, price: 41.00 },
      { min: 250, max: 499, price: 37.00 },
      { min: 500, max: 750, price: 32.00 },
      { min: 751, max: 999999, price: 32.00 }
    ]
  },
  {
    id: "starflex-wood-frame",
    slug: "starflex-wood-frame",
    name: "Starflex Banners (Wooden Frame)",
    category: "Marketing & Promotions",
    basePrice: 55.00,
    description: "Premium Starflex banners mounted on basic wooden support frames for stable and easy display. Suitable for temporary installations.\n• Material: 300–340 GSM Starflex\n• Frame Type: Basic Wooden Support Frame",
    moq: 1,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 22,
    customizerType: "area-tiers",
    priceTiers: [
      { min: 1, max: 49, price: 55.00 },
      { min: 50, max: 249, price: 52.00 },
      { min: 250, max: 499, price: 50.00 },
      { min: 500, max: 999999, price: 50.00 }
    ]
  },
  {
    id: "starflex-steel-frame",
    slug: "starflex-steel-frame",
    name: "Starflex Banners (Steel Frame)",
    category: "Marketing & Promotions",
    basePrice: 95.00,
    description: "Heavy-duty Starflex banners mounted on welded mild steel frame structures designed for long-term outdoor installations and permanent branding displays.\n• Material: Premium Starflex\n• Frame Type: Welded Mild Steel Structure",
    moq: 1,
    images: ["/images/placeholder-product.jpg"],
    rating: 5.0,
    reviewCount: 15,
    customizerType: "area-tiers",
    priceTiers: [
      { min: 1, max: 999999, price: 95.00 }
    ]
  },
  {
    id: "lanyards-20mm",
    slug: "lanyards-20mm",
    name: "20mm Polyester Lanyards",
    category: "Corporate Identity",
    basePrice: 55.00,
    description: "Professionally printed ID lanyards with high-quality polyester material and vibrant sublimation printing. Choose from various hook attachments.",
    moq: 39,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 154,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 39, max: 99, price: 55.00 },
      { min: 100, max: 149, price: 48.00 },
      { min: 150, max: 199, price: 44.00 },
      { min: 200, max: 249, price: 40.00 },
      { min: 250, max: 299, price: 36.00 },
      { min: 300, max: 399, price: 32.00 },
      { min: 400, max: 499, price: 28.00 },
      { min: 500, max: 999999, price: 25.00 }
    ],
    options: [
      {
        name: "Lanyard Hook Type",
        key: "lanyardHook",
        type: "select",
        choices: [
          { label: "Standard Metal China Hook", value: "china" },
          { label: "Overlock Hook (Stronger reinforced) (+₹3/unit)", value: "overlock", priceAdj: 3.00 },
          { label: "Double China Hook (For multi-card) (+₹3/unit)", value: "double-china", priceAdj: 3.00 },
          { label: "Safety Breakaway Clip (+₹5/unit)", value: "safety-breakaway", priceAdj: 5.00 }
        ],
        defaultValue: "china"
      }
    ]
  },
  {
    id: "keychain-lanyards",
    slug: "keychain-lanyards",
    name: "Printed Keychain Lanyards",
    category: "Corporate Identity",
    basePrice: 45.00,
    description: "Compact and durable lanyard keychains designed for branding and promotional giveaways. Made from high-quality polyester.",
    moq: 39,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 65,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 39, max: 99, price: 45.00 },
      { min: 100, max: 149, price: 37.00 },
      { min: 150, max: 199, price: 33.00 },
      { min: 200, max: 249, price: 30.00 },
      { min: 250, max: 299, price: 27.00 },
      { min: 300, max: 399, price: 25.00 },
      { min: 400, max: 499, price: 22.00 },
      { min: 500, max: 999999, price: 19.00 }
    ]
  },
  {
    id: "id-card-xxl",
    slug: "id-card-xxl",
    name: "XXL PVC ID Cards",
    category: "Corporate Identity",
    basePrice: 100.00,
    description: "Premium-quality large-format PVC ID cards designed for enhanced visibility and durability.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 20,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 19, price: 100.00 },
      { min: 20, max: 39, price: 85.00 },
      { min: 40, max: 59, price: 80.00 },
      { min: 60, max: 99, price: 75.00 },
      { min: 100, max: 149, price: 65.00 },
      { min: 150, max: 999999, price: 60.00 }
    ]
  },
  {
    id: "id-card-standard-pvc",
    slug: "id-card-standard-pvc",
    name: "Standard PVC ID Card (With Cover)",
    category: "Corporate Identity",
    basePrice: 40.00,
    description: "Durable PVC ID cards printed using high-resolution digital card printing technology and supplied with a protective transparent plastic card cover.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 150,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 19, price: 40.00 },
      { min: 20, max: 39, price: 35.00 },
      { min: 40, max: 59, price: 30.00 },
      { min: 60, max: 99, price: 27.00 },
      { min: 100, max: 149, price: 25.00 },
      { min: 150, max: 999999, price: 25.00 }
    ]
  },
  {
    id: "id-card-paper",
    slug: "id-card-paper",
    name: "Paper ID Card (With Cover)",
    category: "Corporate Identity",
    basePrice: 25.00,
    description: "Cost-effective identification cards printed on high-quality art paper and inserted into protective transparent covers. Ideal for short-term events.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.6,
    reviewCount: 42,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 19, price: 25.00 },
      { min: 20, max: 39, price: 22.00 },
      { min: 40, max: 59, price: 22.00 },
      { min: 60, max: 99, price: 20.00 },
      { min: 100, max: 149, price: 18.00 },
      { min: 150, max: 999999, price: 15.00 }
    ]
  },
  {
    id: "table-calendar-rectangle",
    slug: "table-calendar-rectangle",
    name: "Table Calendar (Rectangle)",
    category: "Corporate Gifting",
    basePrice: 240.00,
    description: "Premium-quality customised table calendars (Rectangular Layout) designed to provide year-round brand visibility and professional desk presentation.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 38,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 19, price: 240.00 },
      { min: 20, max: 29, price: 235.00 },
      { min: 30, max: 39, price: 225.00 },
      { min: 40, max: 49, price: 215.00 },
      { min: 50, max: 99, price: 200.00 },
      { min: 100, max: 199, price: 150.00 },
      { min: 200, max: 499, price: 145.00 },
      { min: 500, max: 999999, price: 135.00 }
    ]
  },
  {
    id: "table-calendar-square",
    slug: "table-calendar-square",
    name: "Table Calendar (Square)",
    category: "Corporate Gifting",
    basePrice: 280.00,
    description: "Premium-quality customised table calendars (Square Layout) designed to provide year-round brand visibility and professional desk presentation.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 25,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 19, price: 280.00 },
      { min: 20, max: 29, price: 265.00 },
      { min: 30, max: 39, price: 245.00 },
      { min: 40, max: 49, price: 225.00 },
      { min: 50, max: 99, price: 210.00 },
      { min: 100, max: 199, price: 180.00 },
      { min: 200, max: 499, price: 165.00 },
      { min: 500, max: 999999, price: 140.00 }
    ]
  },
  {
    id: "custom-tshirts",
    slug: "custom-tshirts",
    name: "Custom Printed T-Shirts (Round Neck / Polo)",
    category: "Apparel & Uniforms",
    basePrice: 0,
    isQuoteOnly: true,
    description: "High-quality custom printed T-Shirts available in round neck and polo styles. Ideal for corporate events, promotional giveaways, and team building. Multiple fabric and printing options available.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 95,
    customizerType: "email-quote-only"
  },
  {
    id: "corporate-uniforms",
    slug: "corporate-uniforms",
    name: "Corporate Uniforms & Hoodies",
    category: "Apparel & Uniforms",
    basePrice: 0,
    isQuoteOnly: true,
    description: "Premium corporate uniforms, hoodies, jackets, and jerseys customized with your brand logo. Available with high-quality embroidery or premium printing for a professional look.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 67,
    customizerType: "email-quote-only"
  },
  {
    id: "custom-embroidery",
    slug: "custom-embroidery",
    name: "Custom Embroidery & Personalisation",
    category: "Apparel & Uniforms",
    basePrice: 0,
    isQuoteOnly: true,
    description: "Professional embroidery and personalisation services designed to add premium detailing and durability to apparel, uniforms, and accessories.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 45,
    customizerType: "email-quote-only"
  },
  {
    id: "brochures-bifold",
    slug: "brochures-bifold",
    name: "Bifold Brochures",
    category: "Marketing & Promotions",
    basePrice: 20.00,
    description: "Professionally printed brochures (Single Fold - 2 Panels). Printed on high-quality art paper with precision folding.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 65,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 20.00 },
      { min: 50, max: 99, price: 18.00 },
      { min: 100, max: 499, price: 18.00 },
      { min: 500, max: 999, price: 17.50 },
      { min: 1000, max: 2999, price: 16.00 },
      { min: 3000, max: 4999, price: 15.00 },
      { min: 5000, max: 999999, price: 15.00 }
    ],
    options: [
      {
        name: "Finish",
        key: "finish",
        type: "select",
        choices: [
          { label: "Matte", value: "matte" },
          { label: "Glossy", value: "glossy" }
        ],
        defaultValue: "matte"
      }
    ]
  },
  {
    id: "brochures-trifold",
    slug: "brochures-trifold",
    name: "Trifold Brochures",
    category: "Marketing & Promotions",
    basePrice: 25.00,
    description: "Professionally printed brochures (3 Panels - Letter Fold). Ideal for restaurant menus, event details, and corporate services.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 88,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 25.00 },
      { min: 50, max: 99, price: 23.00 },
      { min: 100, max: 499, price: 23.00 },
      { min: 500, max: 999, price: 22.50 },
      { min: 1000, max: 2999, price: 21.00 },
      { min: 3000, max: 4999, price: 20.00 },
      { min: 5000, max: 999999, price: 20.00 }
    ]
  },
  {
    id: "brochures-zfold",
    slug: "brochures-zfold",
    name: "Z-Fold Brochures",
    category: "Marketing & Promotions",
    basePrice: 25.00,
    description: "Professionally printed brochures (Z-Fold Accordion Style). Ideal for product catalogues and technical information.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 42,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 25.00 },
      { min: 50, max: 99, price: 23.00 },
      { min: 100, max: 499, price: 23.00 },
      { min: 500, max: 999, price: 22.50 },
      { min: 1000, max: 2999, price: 21.00 },
      { min: 3000, max: 4999, price: 20.00 },
      { min: 5000, max: 999999, price: 20.00 }
    ]
  },
  {
    id: "diaries-a5",
    slug: "diaries-a5",
    name: "Custom Corporate Diaries (A5)",
    category: "Corporate Gifting",
    basePrice: 310.00,
    description: "Premium-quality customised A5 corporate diaries designed for professional use and brand visibility. PU Leather, Hardbound, or Soft Cover options available.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 115,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 310.00 },
      { min: 50, max: 99, price: 305.00 },
      { min: 100, max: 299, price: 300.00 },
      { min: 300, max: 499, price: 295.00 },
      { min: 500, max: 999, price: 290.00 },
      { min: 1000, max: 999999, price: 275.00 }
    ],
    options: [
      {
        name: "Cover Type",
        key: "cover",
        type: "select",
        choices: [
          { label: "PU Leather", value: "pu-leather" },
          { label: "Hardbound", value: "hardbound" },
          { label: "Soft Cover", value: "softcover" }
        ],
        defaultValue: "hardbound"
      }
    ]
  },
  {
    id: "diaries-a4",
    slug: "diaries-a4",
    name: "Custom Corporate Diaries (A4)",
    category: "Corporate Gifting",
    basePrice: 450.00,
    description: "Premium-quality customised A4 corporate diaries for executives and managers. PU Leather or Hardbound options available.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 5.0,
    reviewCount: 78,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 450.00 },
      { min: 50, max: 99, price: 430.00 },
      { min: 100, max: 299, price: 410.00 },
      { min: 300, max: 499, price: 390.00 },
      { min: 500, max: 999, price: 370.00 },
      { min: 1000, max: 999999, price: 350.00 }
    ],
    options: [
      {
        name: "Cover Type",
        key: "cover",
        type: "select",
        choices: [
          { label: "PU Leather", value: "pu-leather" },
          { label: "Hardbound", value: "hardbound" }
        ],
        defaultValue: "hardbound"
      }
    ]
  },
  {
    id: "bookmarks",
    slug: "bookmarks",
    name: "Custom Printed Bookmarks",
    category: "Marketing & Promotions",
    basePrice: 20.00,
    description: "Custom printed bookmarks designed for branding, promotions, educational use, and event giveaways. Premium Card Stock.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.6,
    reviewCount: 32,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 20.00 },
      { min: 50, max: 99, price: 18.00 },
      { min: 100, max: 299, price: 16.00 },
      { min: 300, max: 499, price: 12.00 },
      { min: 500, max: 999, price: 10.00 },
      { min: 1000, max: 2999, price: 8.00 },
      { min: 3000, max: 4999, price: 6.00 },
      { min: 5000, max: 999999, price: 5.00 }
    ]
  },
  {
    id: "table-tent-cards",
    slug: "table-tent-cards",
    name: "Table Top Tent Cards",
    category: "Marketing & Promotions",
    basePrice: 20.00,
    description: "Professionally printed table top tent cards designed for promotional displays, menu presentations, and event branding.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 54,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 20.00 },
      { min: 50, max: 99, price: 18.00 },
      { min: 100, max: 299, price: 15.00 },
      { min: 300, max: 499, price: 12.00 },
      { min: 500, max: 999, price: 11.00 },
      { min: 1000, max: 2999, price: 10.00 },
      { min: 3000, max: 4999, price: 8.00 },
      { min: 5000, max: 999999, price: 6.00 }
    ]
  },
  {
    id: "custom-stickers",
    slug: "custom-stickers",
    name: "Custom Stickers",
    category: "Stickers & Tags",
    basePrice: 25.00,
    description: "High-quality custom stickers designed for branding, promotional campaigns, packaging, and personalisation.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 231,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 25.00 },
      { min: 50, max: 99, price: 22.00 },
      { min: 100, max: 299, price: 20.00 },
      { min: 300, max: 499, price: 20.00 },
      { min: 500, max: 999, price: 18.00 },
      { min: 1000, max: 2999, price: 15.00 },
      { min: 3000, max: 4999, price: 8.00 },
      { min: 5000, max: 999999, price: 17.00 }
    ],
    options: [
      {
        name: "Finish",
        key: "finish",
        type: "select",
        choices: [
          { label: "Matte", value: "matte" },
          { label: "Glossy", value: "glossy" },
          { label: "Laminated", value: "laminated" }
        ],
        defaultValue: "matte"
      }
    ]
  },
  {
    id: "hang-tags",
    slug: "hang-tags",
    name: "Hang Tags / Clothing Tags",
    category: "Stickers & Tags",
    basePrice: 12.00,
    description: "Premium hang tags designed to enhance clothing and product presentation while strengthening brand identity.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 95,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 12.00 },
      { min: 50, max: 99, price: 11.00 },
      { min: 100, max: 299, price: 10.00 },
      { min: 300, max: 499, price: 8.00 },
      { min: 500, max: 999, price: 7.00 },
      { min: 1000, max: 2999, price: 6.50 },
      { min: 3000, max: 4999, price: 5.00 },
      { min: 5000, max: 999999, price: 4.50 }
    ]
  },
  {
    id: "custom-mugs",
    slug: "custom-mugs",
    name: "Custom Ceramic Mugs",
    category: "Corporate Gifting",
    basePrice: 200.00,
    description: "Custom printed ceramic mugs designed for gifting, corporate branding, promotional merchandise, and personal use.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 165,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 200.00 },
      { min: 50, max: 99, price: 180.00 },
      { min: 100, max: 299, price: 165.00 },
      { min: 300, max: 499, price: 150.00 },
      { min: 500, max: 999, price: 140.00 },
      { min: 1000, max: 2999, price: 130.00 },
      { min: 3000, max: 4999, price: 120.00 },
      { min: 5000, max: 999999, price: 110.00 }
    ]
  },
  {
    id: "standees",
    slug: "standees",
    name: "Promotional Standees",
    category: "Marketing & Promotions",
    basePrice: 1800.00,
    description: "High-impact promotional standees designed for exhibitions, retail promotions, corporate displays, and marketing campaigns.",
    moq: 1,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 45,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 1, max: 1, price: 1800.00 },
      { min: 2, max: 2, price: 1750.00 },
      { min: 3, max: 3, price: 1700.00 },
      { min: 4, max: 4, price: 1650.00 },
      { min: 5, max: 5, price: 1600.00 },
      { min: 6, max: 6, price: 1550.00 },
      { min: 7, max: 999999, price: 1500.00 }
    ]
  },
  {
    id: "custom-badges",
    slug: "custom-badges",
    name: "Custom Printed Badges",
    category: "Marketing & Promotions",
    basePrice: 33.00,
    description: "Custom printed badges designed for identification, event participation, promotional branding, and employee recognition.",
    moq: 25,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 74,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 25, max: 49, price: 33.00 },
      { min: 50, max: 74, price: 31.00 },
      { min: 75, max: 99, price: 29.00 },
      { min: 100, max: 149, price: 27.00 },
      { min: 150, max: 299, price: 25.00 },
      { min: 300, max: 499, price: 22.00 },
      { min: 500, max: 999999, price: 20.00 }
    ]
  },
  {
    id: "ceiling-danglers",
    slug: "ceiling-danglers",
    name: "Ceiling Danglers",
    category: "Marketing & Promotions",
    basePrice: 20.00,
    description: "Attractive ceiling danglers designed for retail advertising, store branding, and promotional campaigns. Premium Display Card.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 22,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 24, price: 20.00 },
      { min: 25, max: 49, price: 19.50 },
      { min: 50, max: 74, price: 19.00 },
      { min: 75, max: 99, price: 18.50 },
      { min: 100, max: 149, price: 18.00 },
      { min: 150, max: 299, price: 17.00 },
      { min: 300, max: 499, price: 16.00 },
      { min: 500, max: 999999, price: 15.00 }
    ]
  },
  {
    id: "invoice-books",
    slug: "invoice-books",
    name: "Invoice Books (A4, 50 Sets)",
    category: "Office & Speciality Printing",
    basePrice: 185.00,
    description: "Professionally designed A4 invoice books created for structured billing and organised transaction recording. Each book contains 50 duplicate sets.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 110,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 185.00 },
      { min: 50, max: 99, price: 165.00 },
      { min: 100, max: 299, price: 150.00 },
      { min: 300, max: 499, price: 130.00 },
      { min: 500, max: 999, price: 120.00 },
      { min: 1000, max: 2999, price: 110.00 },
      { min: 3000, max: 4999, price: 100.00 },
      { min: 5000, max: 999999, price: 90.00 }
    ]
  },
  {
    id: "receipt-books",
    slug: "receipt-books",
    name: "Receipt Books (Duplicate)",
    category: "Office & Speciality Printing",
    basePrice: 155.00,
    description: "High-quality duplicate receipt books designed for accurate payment acknowledgement and financial tracking.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.8,
    reviewCount: 82,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 155.00 },
      { min: 50, max: 99, price: 135.00 },
      { min: 100, max: 299, price: 120.00 },
      { min: 300, max: 499, price: 105.00 },
      { min: 500, max: 999, price: 95.00 },
      { min: 1000, max: 2999, price: 85.00 },
      { min: 3000, max: 4999, price: 75.00 },
      { min: 5000, max: 999999, price: 65.00 }
    ]
  },
  {
    id: "register-books",
    slug: "register-books",
    name: "Register Books (A4 Hardbound, 100 Pages)",
    category: "Office & Speciality Printing",
    basePrice: 285.00,
    description: "Durable and professionally manufactured A4 hardbound register books designed for long-term documentation. 100 Pages.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 61,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 285.00 },
      { min: 50, max: 99, price: 255.00 },
      { min: 100, max: 299, price: 235.00 },
      { min: 300, max: 499, price: 215.00 },
      { min: 500, max: 999, price: 200.00 },
      { min: 1000, max: 2999, price: 185.00 },
      { min: 3000, max: 4999, price: 170.00 },
      { min: 5000, max: 999999, price: 155.00 }
    ],
    options: [
      {
        name: "Page Layout",
        key: "layout",
        type: "select",
        choices: [
          { label: "Ruled", value: "ruled" },
          { label: "Plain", value: "plain" },
          { label: "Grid", value: "grid" }
        ],
        defaultValue: "ruled"
      }
    ]
  },
  {
    id: "office-labels",
    slug: "office-labels",
    name: "Custom Office Labels",
    category: "Office & Speciality Printing",
    basePrice: 25.00,
    description: "Custom printed office labels designed to improve organisation, product identification, and professional branding.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.7,
    reviewCount: 39,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 25.00 },
      { min: 50, max: 99, price: 17.00 },
      { min: 100, max: 299, price: 14.00 },
      { min: 300, max: 499, price: 11.00 },
      { min: 500, max: 999, price: 10.00 },
      { min: 1000, max: 2999, price: 9.00 },
      { min: 3000, max: 4999, price: 8.00 },
      { min: 5000, max: 999999, price: 7.50 }
    ]
  },
  {
    id: "certificates",
    slug: "certificates",
    name: "Certificates (A4, 300 GSM)",
    category: "Office & Speciality Printing",
    basePrice: 25.00,
    description: "Premium A4 certificates printed on thick 300 GSM card stock to provide a prestigious and professional presentation.",
    moq: 10,
    images: ["/images/placeholder-product.jpg"],
    rating: 4.9,
    reviewCount: 77,
    customizerType: "standard-tiers",
    priceTiers: [
      { min: 10, max: 49, price: 25.00 },
      { min: 50, max: 74, price: 23.00 },
      { min: 75, max: 99, price: 21.00 },
      { min: 100, max: 149, price: 19.00 },
      { min: 150, max: 199, price: 17.00 },
      { min: 200, max: 249, price: 16.00 },
      { min: 250, max: 299, price: 15.00 },
      { min: 300, max: 499, price: 14.00 },
      { min: 500, max: 999999, price: 12.00 }
    ]
  },
];