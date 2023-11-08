import Joi from "joi";

export interface RemoveCartDTO {
  userId: number;
  cartId: number;
}
export const removeCartSchema = Joi.object({
  userId: Joi.number().optional().messages({
    "number.base": "User ID must be a number",
    "any.required": "User ID is required",
  }),
  cartId: Joi.number().required().messages({
    "any.required": "User ID is required",
    "number.base": "User ID must be a number",
  }),
}).options({ stripUnknown: true });
