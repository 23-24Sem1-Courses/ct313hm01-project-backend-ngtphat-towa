import { AddCartItemDTO } from "../Dtos/cart/add.item.dto";
import { CartDTO } from "../Dtos/cart/cart.dto";
import { RemoveItemCartDTO } from "../Dtos/cart/remove.item.dto";
import { UpdateCartItemDTO } from "../Dtos/cart/update.item.dto";
import { UserDTO } from "../Dtos/user/user.dto";
import { ResourceNotFoundErrorResponse } from "../common/api.error";
import CartRepository from "../repositories/cart.repository";

class CartSevice {
  private cartRepository = CartRepository;

  async addToCart(addToCartItemDTO: AddCartItemDTO): Promise<CartDTO | null> {
    var existingCart = await this.cartRepository.getCartById(
      addToCartItemDTO.userId
    );
    if (existingCart === null) {
      existingCart = await this.cartRepository.create(addToCartItemDTO.userId);
    }
    // Assign current cart id to dto
    addToCartItemDTO.cartId = existingCart!.id;
    const data = await this.cartRepository.addToCart(addToCartItemDTO);

    return data;
  }
  async updateCartItem(
    updateCartItemDTO: UpdateCartItemDTO
  ): Promise<CartDTO | null> {
    const existingCart = await this.cartRepository.getCartById(
      updateCartItemDTO.userId
    );
    if (existingCart === null) {
      throw new ResourceNotFoundErrorResponse();
    }
    updateCartItemDTO.cartId = existingCart.id;
    const data = await this.cartRepository.updateToCart(updateCartItemDTO);

    return data;
  }
  async getCartItems(userDTO: UserDTO): Promise<CartDTO | null> {
    // Check the new cart exist:
    const currentCart = await this.cartRepository.getCartById(userDTO.id);
    if (currentCart === null) {
      throw new ResourceNotFoundErrorResponse("current cart");
    }
    // Fetch CartItem
    const data = await this.cartRepository.getCartItem(currentCart);

    return data;
  }

  async removeCartItem(removeCartItemDTO: RemoveItemCartDTO) {
    const existingCart = await this.cartRepository.getCartById(
      removeCartItemDTO.userId
    );

    if (existingCart === null) {
      throw new ResourceNotFoundErrorResponse();
    }

    removeCartItemDTO.cartId = existingCart.id;
    const data = await this.cartRepository.removeCartItem(removeCartItemDTO);

    return data;
  }
  async removeCart(userDTO: UserDTO): Promise<CartDTO | null> {
    const existingCart = await this.cartRepository.getCartById(userDTO.id);
    if (existingCart === null) {
      throw new ResourceNotFoundErrorResponse();
    }
    await this.cartRepository.removeCart(
      existingCart.userId!,
      existingCart.id!
    );
    return existingCart;
  }
}
export default new CartSevice();
