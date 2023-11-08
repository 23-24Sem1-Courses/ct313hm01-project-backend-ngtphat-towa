import Joi from "joi";

export interface RemoveItemCartDTO {
  id?: number;
  userId: number;
  cartId?: number;
  productId: number;
}
export const removeCartItemSchema = Joi.object({
  id: Joi.number().optional().messages({
    "number.base": "ID must be a number",
  }),
  userId: Joi.number().optional().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),
  cartId: Joi.number().optional().messages({
    "number.base": "User ID must be a number",
  }),
  productId: Joi.number().required().messages({
    "any.required": "Product ID is required",
    "number.base": "Product ID must be a number",
  }),
}).options({ stripUnknown: true });
