import Joi from "joi";
import { OrderItemDTO } from "./order.item.dto";
import { DeliveryStatus } from "../../enums/order.status.enum";

export interface OrderDTO {
  id?: number;
  createdDate: Date;
  totalPrice: number;
  sessionId: string;
  orderItems?: OrderItemDTO[];
  userId: number;
  deliveryStatus?: DeliveryStatus;
}

export const orderSchema = Joi.object({
  id: Joi.number().optional(),
  createdDate: Joi.date().required().messages({
    "any.required": "createdDate is required",
    "date.empty": "createdDate cannot be empty",
  }),
  totalPrice: Joi.number().required().messages({
    "any.required": "totalPrice is required",
  }),
  sessionId: Joi.string().required().messages({
    "any.required": "sessionId is required",
    "string.empty": "sessionId cannot be empty",
  }),
  // orderItems: Joi.array().items(orderItemSchema).required(),
  userId: Joi.number().required().messages({
    "number.base": "User ID must be a number",
    "number.integer": "User ID must be an integer",
    "number.min": "User ID must be at least 1",
    "any.required": "User ID is a required field",
  }),
  deliveryStatus: Joi.string()
    .valid(...Object.values(DeliveryStatus))
    .optional()
    .messages({
      "string.valid":
        "deliveryStatus must be one of the following: pending, processing, shipped, delivered, cancelled",
    }),
}).options({ stripUnknown: true });
