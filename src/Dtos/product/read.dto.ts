import Joi from "joi";
import { Category } from "../../models/category.model";
import { Request } from "express";

// ReadProductDTO for reading product data
export interface ReadProductDTO {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: Category;
}

// Joi schema for ReadProductDTO
export const readProductSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.object({
    id: Joi.number().required(),
    // Add other properties of Category here if needed
  }).allow(null),
});

export function parseBodyToReadProductDTO(req: Request): ReadProductDTO {
  return {
    id: req.body.id,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  };
}
