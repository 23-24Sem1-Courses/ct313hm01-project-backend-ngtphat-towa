import { NextFunction, Request, Response } from "express";
import CartRepository from "../repositories/cart.repository";
import Logging from "../common/Logging";
import { parseBodyToDTO, parseUserToDTO } from "../Dtos/common.dto";
import { UserDTO, userSchema } from "../Dtos/user/user.dto";
import { UpdateUserDTO } from "../Dtos/user/update.dto";
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

const cartRepository = CartRepository;
/** /add */
const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // parse and validate data
    const addToCartItemDTO = parseBodyToDTO<AddCartItemDTO>(
      req,
      addCartItemSchema
    );

    // Check if the new cart exist, otherwise create new one
    var existingCart = await cartRepository.getCartById(
      addToCartItemDTO.userId
    );
    if (existingCart === null || existingCart?.id) {
      existingCart = await cartRepository.create(addToCartItemDTO.userId);
    }
    // Assign current cart id to dto
    addToCartItemDTO.cartId = existingCart!.id;
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

    let cartDTO = await cartRepository.getCartById(updateCartItemDTO.userId);

    if (cartDTO === null) {
      cartDTO = await cartRepository.create(updateCartItemDTO.userId);
    }
    updateCartItemDTO.cartId = cartDTO!.id;
    const data = await cartRepository.updateToCart(updateCartItemDTO);

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

    // Check the new cart exist:
    const currentCart = await cartRepository.getCartById(userDTO.id);
    if (currentCart === null) {
      throw new ResourceNotFoundErrorResponse("current cart");
    }

    // Fetch CartItem
    const data = await cartRepository.getCartItem(currentCart);

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
    const cart = await cartRepository.getCartById(removeCartItemDTO.userId);
    if (cart === null) {
      throw new ResourceNotFoundErrorResponse();
    }

    removeCartItemDTO.cartId = cart.id;
    const data = await cartRepository.removeCartItem(removeCartItemDTO);

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
};
