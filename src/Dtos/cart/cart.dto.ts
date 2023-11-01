import { CartItemDTO } from "./CartItem.dto";

export interface CartDTO {
  cartItems: CartItemDTO[];
  totalCost: number;
}

export function validateCartDTO(cartDto: CartDTO): void {
  if (!cartDto.cartItems || cartDto.cartItems.length === 0) {
    throw new Error("The cart must contain at least one item.");
  }

  for (const cartItemDto of cartDto.cartItems) {
    if (
      !cartItemDto.id ||
      !cartItemDto.productId ||
      !cartItemDto.quantity ||
      !cartItemDto.price
    ) {
      throw new Error(
        "All cart items must have valid id, productId, quantity, and price."
      );
    }
  }

  if (
    cartDto.totalCost !==
    cartDto.cartItems.reduce(
      (totalCost, cartItemDto) =>
        totalCost + cartItemDto.quantity * cartItemDto.price,
      0
    )
  ) {
    throw new Error(
      "The total cost of the cart does not match the sum of the costs of all the items in the cart."
    );
  }
}
