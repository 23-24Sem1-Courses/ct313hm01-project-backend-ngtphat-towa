export interface AddToCartDTO {
  id?: number;
  productId: number;
  quantity: number;
}

export function validateAddToCartDTO(addToCartDto: AddToCartDTO): void {
  if (!addToCartDto.productId) {
    throw new Error("The productId property is required.");
  }

  if (!addToCartDto.quantity) {
    throw new Error("The quantity property is required.");
  }
}
