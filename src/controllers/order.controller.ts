import { NextFunction, Request, Response } from "express";
import {
  parseBodyToDTO,
  parseBodyToDTOs,
  parseUserToDTO,
} from "../Dtos/common.dto";
import {
  CheckoutItemDTO,
  checkoutItemSchema,
} from "../Dtos/checkout/checkout.item.dto";
import orderService from "../services/order.service";
import { UserDTO, userSchema } from "../Dtos/user/user.dto";
import { SessionDTO, sessionSchema } from "../Dtos/checkout/session.dto";
import { User } from "../models/user.model";
import { bool } from "joi";
import Logging from "../common/Logging";

/** /create-checkout-session */
const checkoutList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrive check out item list
    const userDTO = parseUserToDTO<UserDTO>(req, userSchema);
    const checkOutItemList = parseBodyToDTOs<CheckoutItemDTO>(
      req,
      checkoutItemSchema
    );
    Logging.info_data("check-out-item", userDTO);
    // add user id into each checkout items
    for (const item of checkOutItemList) {
      item.userId = userDTO.id;
    }
    // Create sesstion by call services
    const session = await orderService.createSession(checkOutItemList);
    // Create json response
    const stripeResponse = {
      sessionId: session.id,
    };

    return res.status(200).json(stripeResponse);
  } catch (error) {
    next(error);
  }
};

/** /add */
const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // retrive uesr from authentication
    const userDTO = parseUserToDTO<UserDTO>(req, userSchema);
    const sessionDTO = parseBodyToDTO<SessionDTO>(req, sessionSchema);

    await orderService.placeOrder(userDTO, sessionDTO);

    return res.status(201).json({
      userDTO,
      sessionDTO,
    });
  } catch (error) {
    next(error);
  }
};

/**  get all orders */
const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrive and validate
    const userDTO = parseUserToDTO<UserDTO>(req, userSchema);

    const data = await orderService.listOrders(userDTO);

    return res.status(200).json(data);
  } catch (error) {}
};

/** get orderitems for an order */
const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "getOrderById" });
};

export default {
  checkoutList,
  placeOrder,
  getAllOrders,
  getOrderById,
};
