import Joi from "joi";
import { ProductDTO } from "../Dtos/product/product.dto";
import { Order } from "./order.model";
import { Product } from "./product.model";

export interface OrderItem {
  id?: number;
  quantity?: number;
  price?: number;
  createdDate?: Date;
  orderId?: number;
  product?: Product | ProductDTO;
}
export const orderItemModelSchema = Joi.object({
  id: Joi.number().optional(),
  quantity: Joi.number().required().messages({
    "any.required": "quantity is required",
  }),
  price: Joi.number().required().messages({
    "any.required": "price is required",
  }),
  createdDate: Joi.date().optional(),
  orderId: Joi.number().required().messages({
    "any.required": "orderId is required",
  }),
  product: Joi.alternatives(
    Joi.object({
      id: Joi.number().required(),
      name: Joi.string().required(),
      imageUrl: Joi.string().uri(),
      price: Joi.number().required(),
      description: Joi.string(),
      categoryId: Joi.number().required(),
    }),
    Joi.ref("product")
  ).messages({
    "any.ref": "product must be either a Product object or a ProductDTO object",
  }),
});
