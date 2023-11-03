import { Request } from "express";
import { Category } from "../../models/catagory.model";
import { Product } from "../../models/product.model";
import { MissingRequiredParameterErrorResponse } from "../../common/api.error";

export interface ProductDTO {
  id?: number;
  name: string;
  imageUrl?: string;
  price: number;
  description?: string;
  categoryId: number;
}

export function validateProductDTO(productDto: ProductDTO): void {
  if (!productDto.name) {
    throw new MissingRequiredParameterErrorResponse("name");
  }

  if (!productDto.price) {
    throw new MissingRequiredParameterErrorResponse("price");
  }

  if (!productDto.description) {
    throw new MissingRequiredParameterErrorResponse("description");
  }

  if (!productDto.categoryId) {
    throw new MissingRequiredParameterErrorResponse("description");
  }
}
