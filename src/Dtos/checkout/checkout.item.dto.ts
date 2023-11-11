import Joi from "joi";

export interface CheckoutItemDTO {
  productName: string;
  quantity: number;
  price: number;
  productId: number;
  userId: number;
}

export const checkoutItemSchema = Joi.object({
  productName: Joi.string().required().messages({
    "string.empty": "Product name cannot be empty",
    "any.required": "Product name is a required field",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is a required field",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 0",
    "any.required": "Price is a required field",
  }),
  productId: Joi.number().integer().min(1).required().messages({
    "number.base": "Product ID must be a number",
    "number.integer": "Product ID must be an integer",
    "number.min": "Product ID must be at least 1",
    "any.required": "Product ID is a required field",
  }),
  userId: Joi.number().integer().min(1).required().messages({
    "number.base": "User ID must be a number",
    "number.integer": "User ID must be an integer",
    "number.min": "User ID must be at least 1",
    "any.required": "User ID is a required field",
  }),
}).options({ stripUnknown: true });
