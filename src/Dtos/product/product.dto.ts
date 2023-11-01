export interface ProductDTO {
  id?: number;
  name: string;
  imageURL?: string;
  price: number;
  description?: string;
  categoryId: number;
}

export function validateProductDTO(productDto: ProductDTO): void {
  if (!productDto.name) {
    throw new Error("The name property is required.");
  }

  if (!productDto.price) {
    throw new Error("The price property is required.");
  }

  if (!productDto.description) {
    throw new Error("The description property is required.");
  }

  if (!productDto.categoryId) {
    throw new Error("The categoryId property is required.");
  }
}
