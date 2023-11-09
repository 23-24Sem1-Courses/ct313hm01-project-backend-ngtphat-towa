export interface OrderItemDTO {
  price: number;
  quantity: number;
  orderId: number;
  productId: number;
}

export function validateOrderItemsDto(orderItemsDto: OrderItemDTO): void {
  if (!orderItemsDto.price) {
    throw new Error("The price property is required.");
  }

  if (!orderItemsDto.quantity) {
    throw new Error("The quantity property is required.");
  }

  if (!orderItemsDto.orderId) {
    throw new Error("The orderId property is required.");
  }

  if (!orderItemsDto.productId) {
    throw new Error("The productId property is required.");
  }
}
