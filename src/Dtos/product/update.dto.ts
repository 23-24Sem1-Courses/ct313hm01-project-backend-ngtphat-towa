import Joi from "joi";
import { Product } from "../../models/product.model";
import { Request } from "express";

// UpdateProductDTO for updating an existing product
export interface UpdateProductDTO {
  name?: string;
  imageUrl?: string;
  price?: number;
  description?: string;
  categoryId?: number;
}

// Joi schema for UpdateProductDTO
export const updateProductSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty":
      "It seems like the product name field is empty. Please provide a product name.",
    "string.base":
      "The product name should be a text string. Please check the input.",
  }),
  imageUrl: Joi.string().optional().uri().messages({
    "string.uri":
      "The image URL should be a valid URL. Please check the input.",
  }),
  price: Joi.number().required().messages({
    "number.empty":
      "It seems like the product price field is empty. Please provide a product price.",
    "number.base":
      "The product price should be a numerical value. Please check the input.",
  }),
  description: Joi.string().optional().messages({
    "string.base":
      "The product description should be a text string. Please check the input.",
  }),
  categoryId: Joi.number().required().messages({
    "number.empty":
      "It seems like the category ID field is empty. Please provide a category ID.",
    "number.base":
      "The category ID should be a numerical value. Please check the input.",
  }),
}).options({ stripUnknown: true });
