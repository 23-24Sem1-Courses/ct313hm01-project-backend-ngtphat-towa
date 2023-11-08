import Joi from "joi";
import { ProductDTO, getProductSchema } from "../product/product.dto";
import { readProductSchema } from "../product/read.dto";

export interface CartItemDTO {
  id?: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
  createdDate?: Date;
  product?: ProductDTO;
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
  createdDate: Joi.date().optional().messages({
    "date.invalid": "Added date must be a valid date format",
  }),
  product: readProductSchema.optional(),
}).options({ stripUnknown: true });

// import Joi from "joi";
// import { ProductDTO, getProductSchema } from "../product/product.dto";

// export interface CartItemDTO {
//   id?: number;
//   cartId: number;
//   quantity: number;
//   productId: number;
//   price: number;
//   name: string;
//   imageUrl?: string;
//   description?: string;
//   createdDate?: Date;
// }

// export const cartItemSchema = Joi.object({
//   id: Joi.number().optional(),
//   cartId: Joi.number().required().messages({
//     "any.required": "Cart ID is required",
//     "number.base": "Cart ID must be a number",
//   }),
//   quantity: Joi.number().required().min(1).messages({
//     "any.required": "Quantity is required",
//     "number.base": "Quantity must be a number",
//     "number.min": "Quantity must be greater than or equal to 1",
//   }),
//   productId: Joi.number().required().messages({
//     "any.required": "Product ID is required",
//     "number.base": "Product ID must be a number",
//   }),
//   price: Joi.number().required().messages({
//     "any.required": "Price is required",
//     "number.base": "Price must be a number",
//   }),
//   name: Joi.string().required().messages({
//     "string.base": "The name should be a text string. Please check the input.",
//     "string.empty":
//       "It seems like the name field is empty. Please provide a product name.",
//     "any.required": "The name is a required field. Don't forget to include it.",
//   }),
//   imageUrl: Joi.string().optional().uri().messages({
//     "string.uri": "The imageUrl should be a valid URL. Please check the input.",
//   }),
//   description: Joi.string().optional().messages({
//     "string.base":
//       "The description should be a text string. Please check the input.",
//   }),
//   createdDate: Joi.date().optional().messages({
//     "date.invalid": "Added date must be a valid date format",
//   }),
// }).options({ stripUnknown: true });
