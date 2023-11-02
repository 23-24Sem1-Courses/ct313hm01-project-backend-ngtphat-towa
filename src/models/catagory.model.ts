import ApiError from "../common/api.error";
import { Product } from "./product.model";

export interface Category {
  id: number;
  categoryName: string;
  description: string;
  imageUrl?: string;
  products?: Product[];
}

export function validateCategory(category: Category): ApiError | null {
  if (!category.categoryName) {
    return new Error("The categoryName property is required.");
  }

  if (!category.description) {
    return new Error("The description property is required.");
  }

  if (!category.imageUrl) {
    return new Error("The imageUrl property is required.");
  }
  return null;
}
