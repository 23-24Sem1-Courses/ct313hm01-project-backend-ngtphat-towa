import { knex } from "knex";
import config from "../config/config";
import { Product } from "../models/product.model";

import { CreateProductDTO } from "../Dtos/product/create.dto";
import { UpdateProductDTO } from "../Dtos/product/update.dto";

import CategoryRepository from "./category.repository";
import { ProductDTO } from "../Dtos/product/product.dto";
import { CartDTO } from "../Dtos/cart/cart.dto";
import { UserDTO } from "../Dtos/user/user.dto";
import { AddCartItemDTO } from "../Dtos/cart/add.item.dto";
import { UpdateCartItemDTO } from "../Dtos/cart/update.item.dto";
import { CartItemDTO } from "../Dtos/cart/cart.item.dto";
import { RemoveItemCartDTO } from "../Dtos/cart/remove.item.dto";
import { RemoveCartDTO } from "../Dtos/cart/remove.dto";
import Logging from "../common/Logging";

class CartRepository {
  private db = knex(config.knex);

  constructor() {}

  async create(userId: number): Promise<CartDTO | null> {
    const result = await this.db.raw("CALL CreateCart(?)", [userId]);
    const cartDTO: CartDTO = result[0][0][0];
    return cartDTO;
  }

  async addToCart(addToCart: AddCartItemDTO): Promise<CartDTO | null> {
    const result = await this.db.raw("CALL AddToCart(?,?,?,?)", [
      addToCart.cartId,
      addToCart.userId,
      addToCart.productId,
      addToCart.quantity,
    ]);

    const cartDTO: CartDTO = JSON.parse(JSON.stringify(result[0][0][0]));

    return cartDTO;
  }
  async updateToCart(updateToCart: UpdateCartItemDTO): Promise<CartDTO | null> {
    const result = await this.db.raw("CALL UpdateCartItemQuantity(?,?,?,?)", [
      updateToCart.userId,
      updateToCart.cartId,
      updateToCart.productId,
      updateToCart.quantity,
    ]);
    const cartDTO: CartDTO = result[0][0][0];

    return cartDTO;
  }
  async removeCartItem(
    removeCartItem: RemoveItemCartDTO
  ): Promise<CartDTO | null> {
    const result = await this.db.raw("CALL RemoveCartItem(?,?,?)", [
      removeCartItem.userId,
      removeCartItem.cartId,
      removeCartItem.productId,
    ]);
    const cartDTO: CartDTO = result[0][0][0];

    return cartDTO;
  }
  async removeCart(userId: number) {
    const result = await this.db.raw<CartDTO>("CALL RemoveCart(?)", [userId]);
    return result;
  }
  async getCartItem(cartDTO: CartDTO) {
    var result = await this.db.raw("CALL GetCartItems(?)", [cartDTO.id]);
    const cartItemsDtos: CartItemDTO[] = result[0][0];
    cartDTO.cartItems = cartItemsDtos;

    return cartDTO;
  }
  async getCartById(userId: number) {
    // Get Cart
    let result = await this.db.raw("CALL GetCart(?)", [userId]);
    const data = result[0][0];
    Logging.info(result)
    Logging.info(data);
    if (result && data.id) {
      const cartDto: CartDTO = {
        id: data.id,
        totalCost: data.totalCost,
        userId: data.userId,
        createdDate: data.createdDate,
      };

      return cartDto;
    }
    return null;
  }
  // async getCartItemById(
  //   cartId: number,
  //   productId: number
  // ): Promise<CartDTO | null> {
  //   // Get Cart
  //   // let result = await this.db.raw("CALL GetCart(?)", [userId]);

  //   // const cartDTO: CartItemDTO = result[0][0][0];

  //   // return cartDTO;
  // }
}

export default new CartRepository();
