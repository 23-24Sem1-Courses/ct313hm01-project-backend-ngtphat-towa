import Joi from "joi";
export interface ReadWilistItemDTO {
  userId: number;
  productId: number;
}

export const readWilistItemSchema = Joi.object({
  userId: Joi.number().required().messages({
    "number.base": "userId must be a number",
    "any.required": "userId is a required field",
  }),
  productId: Joi.number().required().messages({
    "number.base": "productId must be a number",
    "any.required": "productId is a required field",
  }),
}).options({ stripUnknown: true });
