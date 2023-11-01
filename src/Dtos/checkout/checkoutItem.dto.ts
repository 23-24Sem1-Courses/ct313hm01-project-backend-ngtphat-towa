export interface CheckoutItemDTO {
  productName: string;
  quantity: number;
  price: number;
  productId: number;
  userId: number;
}

export function validateCheckoutItemDto(
  checkoutItemDto: CheckoutItemDTO
): void {
  if (!checkoutItemDto.productName) {
    throw new Error("The productName property is required.");
  }

  if (!checkoutItemDto.quantity) {
    throw new Error("The quantity property is required.");
  }

  if (!checkoutItemDto.price) {
    throw new Error("The price property is required.");
  }

  if (!checkoutItemDto.productId) {
    throw new Error("The productId property is required.");
  }

  if (!checkoutItemDto.userId) {
    throw new Error("The userId property is required.");
  }
}
