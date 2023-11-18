import Joi from "joi";
import { OrderItem } from "./orderItem.model";
import { DeliveryStatus } from "../enums/order.status.enum";

export interface Order {
  id?: number;
  createdDate: Date;
  totalPrice: number;
  sessionId: string;
  orderItems?: OrderItem[];
  userId: number;
  deliveryStatus?: DeliveryStatus;
}
export const orderModelSchema = Joi.object({
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
    "any.required": "userId is required",
  }),
  deliveryStatus: Joi.string()
    .valid(...Object.values(DeliveryStatus))
    .optional()
    .messages({
      "string.valid":
        "deliveryStatus must be one of the following: pending, processing, shipped, delivered, cancelled",
    }),
}).options({ stripUnknown: true });
