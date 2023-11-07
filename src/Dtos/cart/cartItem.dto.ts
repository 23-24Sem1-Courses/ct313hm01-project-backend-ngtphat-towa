import Joi from "joi";
import { ProductDTO, getProductSchema } from "../product/product.dto";

export interface CartItemDTO {
  id?: number;
  cartId?: number;
  quantity: number;
  productId: number;
  price: number;
  addedDate?: Date;
  total?: number;
}
export const cartItemSchema = Joi.object({
  id: Joi.number().optional(),
  cartId: Joi.number().required().messages({
    "any.required": "Cart ID is required",
    "number.base": "Cart ID must be a number",
  }),
  quantity: Joi.number().required().min(1).messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be greater than or equal to 1",
  }),
  productId: Joi.number().required().messages({
    "any.required": "Product ID is required",
    "number.base": "Product ID must be a number",
  }),
  price: Joi.number().required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
  }),
  addedDate: Joi.date().optional().messages({
    "date.invalid": "Added date must be a valid date format",
  }),
  total: Joi.number().optional().messages({
    "number.base": "Total must be a number",
  }),
}).options({ stripUnknown: true });
