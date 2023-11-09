import Joi from "joi";

export interface OrderDTO {
  id?: number;
  userId: number;
}

export const OrderSchema = Joi.object({
  id: Joi.number().integer().min(1).optional().messages({
    "number.base": "Order ID must be a number",
    "number.integer": "Order ID must be an integer",
    "number.min": "Order ID must be at least 1",
  }),
  userId: Joi.number().integer().min(1).required().messages({
    "number.base": "User ID must be a number",
    "number.integer": "User ID must be an integer",
    "number.min": "User ID must be at least 1",
    "any.required": "User ID is a required field",
  }),
});
