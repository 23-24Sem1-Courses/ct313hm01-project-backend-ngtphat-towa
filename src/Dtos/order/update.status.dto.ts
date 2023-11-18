import Joi from "joi";
import { DeliveryStatus } from "../../enums/order.status.enum";

export interface UpdateOrderStatusDTO {
  id?: number;
  createdDate?: Date;
  totalPrice?: number;
  sessionId: string;
  deliveryStatus: DeliveryStatus;
  userId: number;
}

export const updateOrderStatusSchema = Joi.object({
  id: Joi.number().optional(),
  createdDate: Joi.date().optional(),
  totalPrice: Joi.number().optional(),
  sessionId: Joi.string().required().messages({
    "any.required": "sessionId is required",
    "string.empty": "sessionId cannot be empty",
  }),
  deliveryStatus: Joi.string()
    .valid(...Object.values(DeliveryStatus))
    .required()
    .messages({
      "any.required": "deliveryStatus is required",
      "string.empty": "deliveryStatus cannot be empty",
      "string.valid":
        "deliveryStatus must be one of the following: pending, processing, shipped, delivered, cancelled",
    }),
  userId: Joi.number().required().messages({
    "any.required": "userId is required",
  }),
}).options({ stripUnknown: true });
