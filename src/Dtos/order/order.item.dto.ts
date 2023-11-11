export interface OrderItemDTO {
  id?: number;
  price: number;
  quantity: number;
  orderId: number;
  productId: number;
  createdDate?: Date;
}

import Joi from "joi";

export const OrderItemSchema = Joi.object({
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 0",
    "any.required": "Price is a required field",
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is a required field",
  }),
  orderId: Joi.number().integer().min(1).required().messages({
    "number.base": "Order ID must be a number",
    "number.integer": "Order ID must be an integer",
    "number.min": "Order ID must be at least 1",
    "any.required": "Order ID is a required field",
  }),
  productId: Joi.number().integer().min(1).required().messages({
    "number.base": "Product ID must be a number",
    "number.integer": "Product ID must be an integer",
    "number.min": "Product ID must be at least 1",
    "any.required": "Product ID is a required field",
  }),
});
