import Joi from "joi";
import { CartItemDTO, cartItemSchema } from "./cartItem.dto";

export interface CartDTO {
  id?: number;
  cartItems?: CartItemDTO[];
  totalCost: number;
  createdDate?: Date;
}

export const cartSchema = Joi.object({
  id: Joi.number().optional(),
  cartItems: Joi.array().allow(null).items(cartItemSchema),
  totalCost: Joi.number().required().messages({
    "any.required": "Total cost is required",
    "number.base": "Total cost must be a number",
  }),
  createdDate: Joi.date().optional().messages({
    "date.invalid": "Created date must be a valid date format",
  }),
});
