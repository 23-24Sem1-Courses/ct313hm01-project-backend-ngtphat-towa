import { ProductDTO } from "../product/product.dto";

export interface CategoryDTO {
  id?: number;
  categoryName: string;
  description: string;
  imageUrl: string;
  products?: ProductDTO[];
}

export function validateCategoryDTO(categoryDto: CategoryDTO): void {
  if (!categoryDto.categoryName) {
    throw new Error("The categoryName property is required.");
  }

  if (!categoryDto.description) {
    throw new Error("The description property is required.");
  }

  if (!categoryDto.imageUrl) {
    throw new Error("The imageUrl property is required.");
  }
}
