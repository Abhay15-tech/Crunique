'use server';

import { CRUNIQUE_PRODUCTS, COMBO_PACK_COLLECTIONS } from '@/data/products';
import { ProductType, ComboPackType } from '@/types';

export async function getProductsAction(): Promise<ProductType[]> {
  // In production with PostgreSQL: return await db.product.findMany(...)
  return CRUNIQUE_PRODUCTS as unknown as ProductType[];
}

export async function getProductBySlugAction(slug: string): Promise<ProductType | null> {
  const found = CRUNIQUE_PRODUCTS.find((p) => p.id === slug || p.name.toLowerCase().includes(slug.toLowerCase()));
  return (found as unknown as ProductType) || null;
}

export async function getComboPacksAction(): Promise<ComboPackType[]> {
  return COMBO_PACK_COLLECTIONS as unknown as ComboPackType[];
}
