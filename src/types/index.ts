export type FruitType = 'APPLE' | 'BANANA' | 'KIWI' | 'GUAVA' | 'PINEAPPLE';

export type UserRole = 'CUSTOMER' | 'ADMIN';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface NutritionInfo {
  servingSize: string;
  calories: number;
  totalFat: string;
  sodium: string;
  totalCarbs: string;
  dietaryFiber: string;
  sugars: string;
  protein: string;
}

export interface ProductType {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  discountPrice?: number;
  sku: string;
  stock: number;
  weight: string;
  categoryId: string;
  fruitType: FruitType;
  tagline: string;
  benefits: string[];
  ingredients: string[];
  nutrition: NutritionInfo;
  shelfLife: string;
  storage: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  accentColor: string;
  image: string;
  rating: number;
  reviewsCount: number;
  collection: string;
}

export interface PackSizeOption {
  size: '25g' | '50g' | '100g' | '250g';
  label: string;
  price: number;
  description: string;
}

export interface CartItemType {
  id: string;
  productId: string;
  product: ProductType;
  quantity: number;
  packSize: '25g' | '50g' | '100g' | '250g';
}

export interface ComboPackType {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  targetAudience: string;
  includedFruits: string[];
  badge: string;
  accentColor: string;
  image: string;
}
