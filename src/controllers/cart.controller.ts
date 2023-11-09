import { NextFunction, Request, Response } from "express";
import CartRepository from "../repositories/cart.repository";
import { parseBodyToDTO, parseUserToDTO } from "../Dtos/common.dto";
import { UserDTO, userSchema } from "../Dtos/user/user.dto";
import {
  UpdateCartItemDTO,
  updateCartItemSchema,
} from "../Dtos/cart/update.item.dto";
import { AddCartItemDTO, addCartItemSchema } from "../Dtos/cart/add.item.dto";
import {
  DatabaseErrorResponse,
  ResourceNotFoundErrorResponse,
} from "../common/api.error";
import {
  RemoveItemCartDTO,
  removeCartItemSchema,
} from "../Dtos/cart/remove.item.dto";
import CartService from "../services/cart.service";
import cartService from "../services/cart.service";

const cartRepository = CartService;
/** /add */
const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // parse and validate data
    const addToCartItemDTO = parseBodyToDTO<AddCartItemDTO>(
      req,
      addCartItemSchema
    );
    const data = await cartRepository.addToCart(addToCartItemDTO);

    // Return current data
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
/** /update/{cartItemId} */
const updateCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updateCartItemDTO = parseBodyToDTO<UpdateCartItemDTO>(
      req,
      updateCartItemSchema
    );
    const data = await cartService.updateCartItem(updateCartItemDTO);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
/** / */
/** parms token */
const getCartItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDTO = parseUserToDTO<UserDTO>(req, userSchema);

    const data = await cartService.getCartItems(userDTO);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/** /delete/{cartItemId} */
const removeCartItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const removeCartItemDTO = parseBodyToDTO<RemoveItemCartDTO>(
      req,
      removeCartItemSchema
    );

    const data = await cartService.removeCartItem(removeCartItemDTO);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

/** /delete/{cartItemId} */
const removeCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDTO = parseUserToDTO<UserDTO>(req, userSchema);

    const data = await cartService.removeCart(userDTO);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default {
  addToCart,
  getCartItems,
  updateCartItem,
  removeCartItem,
  removeCart,
};
