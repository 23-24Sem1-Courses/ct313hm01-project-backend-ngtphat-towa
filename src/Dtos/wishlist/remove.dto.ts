import Joi from "joi";
export interface RemoveWilistItemDTO {
  id?: number;
  userId: number;
  productId?: number;
}

export const removeWilistItemSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "Id must be a number",
    "any.required": "Id is a required field",
  }),
  userId: Joi.number().required().messages({
    "number.base": "User id must be a number",
    "any.required": "User id is a required field",
  }),
  productId: Joi.number().required().messages({
    "number.base": "Product id must be a number",
    "any.required": "Product id is a required field",
  }),
}).options({ stripUnknown: true });
