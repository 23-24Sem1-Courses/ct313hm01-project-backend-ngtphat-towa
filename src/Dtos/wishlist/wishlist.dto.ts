import Joi from "joi";

export interface WishlistItemDTO {
  id?: number;
  userId?: number;
  productId?: number;
  createdDate?: Date;
}

export const wishlistDTOSchema = Joi.object({
  id: Joi.number().optional().messages({
    "number.base": "id must be a number",
  }),
  userId: Joi.number().required().messages({
    "number.base": "userId must be a number",
    "any.required": "userId is a required field",
  }),
  productId: Joi.number().required().messages({
    "number.base": "productId must be a number",
    "any.required": "productId is a required field",
  }),
  createdDate: Joi.date().required().messages({
    "date.base": "createdDate must be a date",
    "any.required": "createdDate is a required field",
  }),
}).options({ stripUnknown: true });
