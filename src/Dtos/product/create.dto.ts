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
export interface CreateProductDTO {
  name: string;
  imageUrl?: string;
  price: number;
  description?: string;
  categoryId: number;
}

// Define the Joi schema for CreateProductDTO
export const createProductSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Product name is required",
    "string.base": "Product name must be a string",
  }),
  imageUrl: Joi.string().optional().uri().messages({
    "string.uri": "Image URL must be a valid URL",
  }),
  price: Joi.number().required().messages({
    "number.empty": "Product price is required",
    "number.base": "Product price must be a number",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  categoryId: Joi.number().required().messages({
    "number.empty": "Category ID is required",
    "number.base": "Category ID must be a number",
  }),
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
