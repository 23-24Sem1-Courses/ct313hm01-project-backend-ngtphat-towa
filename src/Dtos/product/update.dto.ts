import Joi from "joi";
import { Product } from "../../models/product.model";
import { Request } from "express";

// UpdateProductDTO for updating an existing product
export interface UpdateProductDTO {
  id: number;
  name?: string;
  imageUrl?: string;
  price?: number;
  description?: string;
  categoryId?: number;
}

// Joi schema for UpdateProductDTO
export const updateProductSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string(),
  imageUrl: Joi.string().uri(),
  price: Joi.number(),
  description: Joi.string(),
  categoryId: Joi.number(),
});

export function parseBodyToUpdateProductDTO(req: Request): UpdateProductDTO {
  return {
    id: req.body.id,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
    categoryId: req.body.categoryId,
  };
}

export function mapUpdateProductDTOToProduct(dto: UpdateProductDTO): Product {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.imageUrl,
    price: dto.price,
    description: dto.description,
    category: dto.categoryId ? { id: dto.categoryId } : undefined,
    wishListList: [],
    carts: [],
  };
}
