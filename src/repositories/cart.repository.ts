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
import ApiError, { ResourceNotFoundErrorResponse } from "../common/api.error";

class CartRepository {
  private db = knex(config.knex);

  constructor() {}

  async create(userId: number): Promise<CartDTO | null> {
    // Insert a new row into the Cart table
    const [v_cartId] = await this.db<CartDTO>("carts")
      .insert({ userId: userId })
      .returning("id");

    // Return the newly created row
    const cart = await this.db<CartDTO>("carts").where("id", v_cartId).first();
    if (!cart) {
      return null;
    }

    return cart;
  }

  async addToCart(addToCart: AddCartItemDTO) {
    // Retrieve the price of the product from the Product table
    const product = await this.db<ProductDTO>("products")
      .where("id", addToCart.productId)
      .first();
    const v_price: number = product?.price!;

    // Calculate the total cost of the added item
    const v_totalCost = addToCart.quantity * v_price;

    // Insert a new row into the CartItem table
    await this.db<CartItemDTO>("cart_items").insert({
      cartId: addToCart.cartId,
      productId: addToCart.productId,
      quantity: addToCart.quantity,
      price: v_price,
    });

    // Call the UpdateTotalCost function to update the TotalCost in the Cart table
    return await this.updateTotalCost(
      addToCart.cartId!,
      addToCart.userId,
      v_totalCost
    );
  }
  async updateToCart(updateToCart: UpdateCartItemDTO): Promise<CartDTO | null> {
    // Retrieve the old quantity and price of the cart item from the CartItem table
    const cartItem = await this.db<CartItemDTO>("cart_items")
      .where({ cartId: updateToCart.cartId, productId: updateToCart.productId })
      .first();
    if (!cartItem) {
      throw new ResourceNotFoundErrorResponse();
    }
    const v_oldQuantity = cartItem?.quantity!;
    const v_price = cartItem?.price!;

    // Calculate the difference in total cost
    const v_totalCostDifference =
      (updateToCart.quantity - v_oldQuantity) * v_price;

    // Update the quantity in the CartItem table
    await this.db<CartItemDTO>("cart_items")
      .where({ cartId: updateToCart.cartId, productId: updateToCart.productId })
      .update({ quantity: updateToCart.quantity });

    // Call the UpdateTotalCost function to update the TotalCost in the Cart table
    return await this.updateTotalCost(
      updateToCart.cartId!,
      updateToCart.userId,
      v_totalCostDifference
    );
  }
  async removeCartItem(
    removeCartItem: RemoveItemCartDTO
  ): Promise<CartDTO | null> {
    // Retrieve the quantity and price of the cart item from the CartItem table
    const cartItem = await this.db<CartItemDTO>("cart_items")
      .where({
        cartId: removeCartItem.cartId,
        productId: removeCartItem.productId,
      })
      .first();
    if (!cartItem) {
      throw new ResourceNotFoundErrorResponse();
    }
    const v_quantity = cartItem.quantity!;
    const v_price = cartItem.price!;

    // Calculate the total cost of the removed item
    const v_totalCostDifference = v_quantity * v_price;

    // Remove the item from the CartItem table
    await this.db<CartItemDTO>("cart_items")
      .where({
        cartId: removeCartItem.cartId,
        productId: removeCartItem.productId,
      })
      .del();

    // Call the UpdateTotalCost function to update the TotalCost in the Cart table
    return await this.updateTotalCost(
      removeCartItem.cartId!,
      removeCartItem.userId,
      -v_totalCostDifference
    );
  }
  async removeCart(userId: number, cartId: number): Promise<void> {
    await this.db("carts").where("id", cartId).del();
  }
  async getCartItemById(cartId: number, productId: number) {
    const cartItem = await this.db<CartItemDTO>("cart_items")
      .where({
        cartId: cartId,
        productId: productId,
      })
      .first();
    return cartItem || null;
  }
  async getCartItem(cartDTO: CartDTO) {
    const cartItems: CartItemDTO[] = await this.db<CartItemDTO>(
      "cart_items as ci"
    )
      .join("products as p", "ci.productId", "p.id")
      .select(
        "ci.id",
        "ci.cartId",
        "ci.quantity",
        "ci.productId",
        "ci.price",
        "p.description",
        "p.imageURL",
        "p.name",
        "ci.createdDate"
      )
      .where("ci.cartId", cartDTO.id);
    cartDTO.cartItems = cartItems;
    return cartDTO;
  }
  async getCartById(userId: number) {
    const cart = await this.db<CartDTO>("carts")
      .where("userId", userId)
      .orderBy("id", "desc")
      .first();

    return cart || null;
  }
  private async updateTotalCost(
    p_cartId: number,
    p_userId: number,
    p_totalCost: number
  ) {
    // Update the TotalCost in the Cart table
    await this.db<CartDTO>("carts")
      .where({ id: p_cartId, userId: p_userId })
      .increment("totalCost", p_totalCost);

    // Return the updated Cart
    const cart = await this.db<CartDTO>("carts").where("id", p_cartId).first();

    return cart || null;
  }
}

export default new CartRepository();
