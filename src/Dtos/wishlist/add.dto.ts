import Joi from "joi";
import { ProductDTO, getProductSchema } from "../product/product.dto";
import { UserDTO } from "../user/user.dto";
export interface AddWilistItemDTO {
  userId: number;
  productId: number;
  createDate?: Date;
}
export const addWilistItemSchema = Joi.object({
  userId: Joi.number().optional(),
  productId: Joi.number().required(),
  createDate: Joi.date().optional(),
}).options({ stripUnknown: true });
