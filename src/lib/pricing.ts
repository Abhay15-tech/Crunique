/**
 * CRUNIQUE Authoritative Server-Side Pricing Engine
 * Currency: INR (₹)
 * ALL financial calculations are strictly maintained in INTEGER PAISE (₹1 = 100 paise)
 * NEVER trust client-supplied prices, totals, or discounts.
 */

export interface CartItemInput {
  productId: string;
  packSize?: string;
  quantity: number;
}

export interface ValidatedOrderItem {
  productId: string;
  name: string;
  packSize: string;
  quantity: number;
  unitPricePaise: number;
  totalPricePaise: number;
  image: string;
}

export interface PricingResult {
  currency: 'INR';
  items: ValidatedOrderItem[];
  itemCount: number;
  subtotalPaise: number;
  discountPaise: number;
  discountCode: string | null;
  shippingFeePaise: number;
  totalAmountPaise: number;
}

// Authoritative standard pack sizes and prices in Paise for standard 50g base items
export const SERVER_PACK_PRICES_PAISE: Record<string, number> = {
  '25g': 11900,  // ₹119.00
  '50g': 19900,  // ₹199.00
  '100g': 34900, // ₹349.00
  '250g': 74900, // ₹749.00
};

// Authoritative catalog mapping
export const SERVER_PRODUCT_CATALOG: Record<string, { name: string; image: string; basePack: string; defaultPaise: number }> = {
  'apple-chips': {
    name: 'Crispy Apple Chips',
    image: '/assets/images/apple_chips.png',
    basePack: '50g',
    defaultPaise: 19900
  },
  'banana-chips': {
    name: 'Crunchy Banana Crisps',
    image: '/assets/images/banana_chips.png',
    basePack: '50g',
    defaultPaise: 19900
  },
  'kiwi-chips': {
    name: 'Exotic Kiwi Crisps',
    image: '/assets/images/kiwi_chips.png',
    basePack: '50g',
    defaultPaise: 24900
  },
  'guava-chips': {
    name: 'Tropical Guava Crisps',
    image: '/assets/images/guava_chips.png',
    basePack: '50g',
    defaultPaise: 22900
  },
  'pineapple-chips': {
    name: 'Golden Pineapple Crisps',
    image: '/assets/images/pineapple_chips.png',
    basePack: '50g',
    defaultPaise: 24900
  },
  // Combo & Gifting Hampers
  'signature-trio': {
    name: 'Signature Trio Hamper',
    image: '/assets/images/apple_chips.png',
    basePack: 'Bundle (3x50g)',
    defaultPaise: 54900
  },
  'wellness-bundle': {
    name: 'Wellness Family Pack',
    image: '/assets/images/kiwi_chips.png',
    basePack: 'Bundle (5x50g)',
    defaultPaise: 89900
  },
  'family-celebration-hamper': {
    name: 'Family Celebration Hamper',
    image: '/assets/images/banana_chips.png',
    basePack: 'Luxury Box',
    defaultPaise: 129900
  },
  'executive-grand-hamper': {
    name: 'CRUNIQUE Executive Grand Hamper',
    image: '/assets/images/apple_chips.png',
    basePack: 'Collector Hamper',
    defaultPaise: 249900
  }
};

// Valid promo discount rules
const VALID_PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  'FAMILY15': { discountPercent: 15, description: 'Family Code: 15% Off' },
  'CRUNIQUE10': { discountPercent: 10, description: 'Welcome Code: 10% Off' }
};

// Shipping rules: Free shipping at or above ₹499 (49900 paise), else ₹49 (4900 paise)
export const FREE_SHIPPING_THRESHOLD_PAISE = 49900;
export const STANDARD_SHIPPING_FEE_PAISE = 4900;

/**
 * Validates cart items and calculates authoritative integer-paise pricing on the server.
 */
export function calculateServerCartPricing(
  rawItems: CartItemInput[],
  promoCode?: string | null
): PricingResult {
  if (!Array.isArray(rawItems) || rawItems.length === 0) {
    throw new Error('Cart must contain at least one valid item');
  }

  const validatedItems: ValidatedOrderItem[] = [];
  let subtotalPaise = 0;
  let totalQuantity = 0;

  for (const item of rawItems) {
    if (!item || !item.productId) {
      throw new Error('Invalid item: missing product identifier');
    }

    const catalogEntry = SERVER_PRODUCT_CATALOG[item.productId];
    if (!catalogEntry) {
      throw new Error(`Product not found or currently unavailable: ${item.productId}`);
    }

    // Validate quantity
    const quantity = Math.floor(Number(item.quantity));
    if (isNaN(quantity) || quantity < 1 || quantity > 50) {
      throw new Error(`Invalid quantity for ${catalogEntry.name}: must be between 1 and 50`);
    }

    // Determine unit price in paise
    let packSize = (item.packSize || catalogEntry.basePack).trim();
    let unitPricePaise = catalogEntry.defaultPaise;

    if (SERVER_PACK_PRICES_PAISE[packSize]) {
      unitPricePaise = SERVER_PACK_PRICES_PAISE[packSize];
    }

    const itemTotalPaise = unitPricePaise * quantity;
    subtotalPaise += itemTotalPaise;
    totalQuantity += quantity;

    validatedItems.push({
      productId: item.productId,
      name: `${catalogEntry.name} (${packSize})`,
      packSize,
      quantity,
      unitPricePaise,
      totalPricePaise: itemTotalPaise,
      image: catalogEntry.image
    });
  }

  // Calculate discount
  let discountPaise = 0;
  let appliedPromo: string | null = null;
  if (promoCode) {
    const cleanCode = promoCode.trim().toUpperCase();
    const promo = VALID_PROMO_CODES[cleanCode];
    if (promo) {
      appliedPromo = cleanCode;
      discountPaise = Math.round((subtotalPaise * promo.discountPercent) / 100);
    }
  }

  // Calculate shipping
  const discountedSubtotal = Math.max(0, subtotalPaise - discountPaise);
  const shippingFeePaise = discountedSubtotal >= FREE_SHIPPING_THRESHOLD_PAISE ? 0 : STANDARD_SHIPPING_FEE_PAISE;

  const totalAmountPaise = discountedSubtotal + shippingFeePaise;

  return {
    currency: 'INR',
    items: validatedItems,
    itemCount: totalQuantity,
    subtotalPaise,
    discountPaise,
    discountCode: appliedPromo,
    shippingFeePaise,
    totalAmountPaise
  };
}

/**
 * Format paise into clean INR display string
 * e.g., 19900 paise -> "₹199" or "₹199.50"
 */
export function formatPaiseToInr(paise: number): string {
  const rupees = paise / 100;
  if (Number.isInteger(rupees)) {
    return `₹${rupees.toLocaleString('en-IN')}`;
  }
  return `₹${rupees.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
