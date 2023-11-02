import ApiError from "../../common/api.error";
import { Category } from "../../models/catagory.model";
import { ProductDTO } from "../product/product.dto";

export class CategoryDTO {
  id?: number;
  categoryName: string;
  description: string;
  imageUrl?: string;
  products?: ProductDTO[];

  constructor(body: any = {}) {
    this.id = body.id;
    this.categoryName = body.categoryName;
    this.description = body.description ?? "";
    this.imageUrl = body.imageUrl ?? "";
    this.products = body.products ?? [];
  }
}

export function validateCategoryDTO(categoryDto: CategoryDTO): void {
  if (!categoryDto.categoryName) {
    throw new ApiError(500, "The categoryName property is required.");
  }
}

export function mapCategoryDTOToModel(dto: CategoryDTO): Category {
  return {
    id: dto.id ?? 0,
    categoryName: dto.categoryName,
    description: dto.description,
    imageUrl: dto.imageUrl,
  };
}
