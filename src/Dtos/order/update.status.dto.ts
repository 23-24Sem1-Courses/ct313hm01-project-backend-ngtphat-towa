import Joi from "joi";
import { DeliveryStatus } from "../../enums/order.status.enum";

export interface UpdateOrderStatusDTO {
  id?: number;

  sessionId: string;
  deliveryStatus: DeliveryStatus;
  //   userId: number;
  //   createdDate?: Date;
  //   updatedDate?:Date
  //   totalPrice?: number;
}

export const updateOrderStatusSchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "id is required",
    "number.empty": "id cannot be empty",
  }),

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
  //   createdDate: Joi.date().optional(),
  //   totalPrice: Joi.number().optional(),
  //   userId: Joi.number().required().messages({
  //     "any.required": "userId is required",
  //   }),
}).options({ stripUnknown: true });
