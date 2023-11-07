import { NextFunction, Request, Response } from "express";
import WishlistService from "../services/wishlist.service";

import { parseBodyToDTO, parseUserToDTO } from "../Dtos/common.dto";
import { UserDTO, userSchema } from "../Dtos/user/user.dto";

import {
  AddWilistItemDTO,
  addWilistItemSchema,
} from "../Dtos/wishlist/add.dto";
import {
  ConflictErrorResponse,
  ResourceNotFoundErrorResponse,
} from "../common/api.error";
import productService from "../services/product.service";
import { RemoveWilistItemDTO } from "../Dtos/wishlist/remove.dto";

const service = WishlistService;

/** /getWishList */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// validate user
    const user = parseUserToDTO<UserDTO>(req, userSchema);

    /// get all wishlist
    const model = await service.getAll(user);

    return res.status(200).json(model);
  } catch (error) {
    next(error);
  }
};

/** /addWishList */
const addNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// validate user
    const itemDTO = parseBodyToDTO<AddWilistItemDTO>(req, addWilistItemSchema);
    await validateExisting(itemDTO.userId, itemDTO.productId);

    /// get all wishlist
    const model = await service.add(itemDTO);

    return res.status(200).json(model);
  } catch (error) {
    next(error);
  }
};

/** /removeWishList */
const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// validate user
    const itemDTO = parseBodyToDTO<RemoveWilistItemDTO>(
      req,
      addWilistItemSchema
    );
    await validateExisting(itemDTO.userId, itemDTO.productId!);

    /// get all wishlist
    const model = await service.remove(itemDTO);

    return res.status(200).json(model);
  } catch (error) {
    next(error);
  }
};

async function validateExisting(userId: number, productId: number) {
  const existing = await service.getById({ userId, productId });
  if (existing !== null) {
    throw new ConflictErrorResponse();
  }
  const product = await productService.getById(productId);
  if (product === null) {
    throw new ResourceNotFoundErrorResponse("product");
  }
}

export default {
  getWishList: getAll,
  addWishList: addNew,
  removeWishlist: remove,
};
