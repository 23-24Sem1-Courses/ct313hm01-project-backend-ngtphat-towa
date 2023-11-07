import Joi from "joi";

export interface RemoveToCartDTO {
  cartId?: number;
  userId: number;
  productId: number;
}
export const removeToCartSchema = Joi.object({
  cartId: Joi.number().optional().messages({
    "number.base": "Cart ID must be a number",
  }),
  userId: Joi.number().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),
  productId: Joi.number().required().messages({
    "any.required": "Product ID is required",
    "number.base": "Product ID must be a number",
  }),
}).options({ stripUnknown: true });
