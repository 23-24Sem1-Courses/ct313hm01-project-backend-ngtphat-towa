import Joi from "joi";

export interface UpdateCartItemDTO {
  id?: number;
  userId: number;
  cartId?: number;
  productId: number;
  quantity: number;
}
export const updateCartItemSchema = Joi.object({
  id: Joi.number().optional().messages({
    "number.base": "Product ID must be a number",
  }),
  userId: Joi.number().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),
  cartId: Joi.number().optional().messages({
    // "any.required": "Cart ID is required",
    "number.base": "Cart ID must be a number",
  }),
  productId: Joi.number().required().messages({
    "any.required": "Product ID is required",
    "number.base": "Product ID must be a number",
  }),
  quantity: Joi.number().required().min(1).messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be greater than or equal to 1",
  }),
  createdDate: Joi.date().optional().messages({
    "date.invalid": "Created date must be a valid date format",
  }),
}).options({ stripUnknown: true });
