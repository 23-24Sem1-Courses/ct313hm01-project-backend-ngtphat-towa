import { Product } from "./product.model";

export interface Category {
  id: number;
  categoryName: string;
  description: string;
  imageUrl: string;
  products?: Product[];
}

export function validateCategory(category: Category): void {
  if (!category.categoryName) {
    throw new Error("The categoryName property is required.");
  }

  if (!category.description) {
    throw new Error("The description property is required.");
  }

  if (!category.imageUrl) {
    throw new Error("The imageUrl property is required.");
  }
}
