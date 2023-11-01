export interface OrderDTO {
  id?: number;
  userId: number;
}

export function validateOrderDto(orderDto: OrderDTO): void {
  if (!orderDto.userId) {
    throw new Error("The userId property is required.");
  }
}
