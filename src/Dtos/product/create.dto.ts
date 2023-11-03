import Joi from "joi";

import { Product } from "../../models/product.model";
import { Request } from "express";

// CreateProductDTO for creating a new product
export interface CreateProductDTO {
  name: string;
  imageUrl?: string;
  price: number;
  description?: string;
  categoryId: number;
}

// Define the Joi schema for CreateProductDTO
export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  imageUrl: Joi.string().uri(),
  price: Joi.number().required(),
  description: Joi.string(),
  categoryId: Joi.number().required(),
});

export function parseBodyToCreateProductDTO(req: Request): CreateProductDTO {
  return {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
    categoryId: req.body.categoryId,
  };
}

export function mapCreateProductDTOToProduct(dto: CreateProductDTO): Product {
  return {
    name: dto.name,
    imageUrl: dto.imageUrl,
    price: dto.price,
    description: dto.description,
    category: { id: dto.categoryId },
    wishListList: [],
    carts: [],
  };
}
