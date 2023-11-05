import { Cart } from "./cart.model";
import { Category } from "./category.model";
import { Wishlist } from "./wishlist.model";

export interface Product {
  id?: number;
  name?: string;
  imageUrl?: string;
  price?: number;
  description?: string;
  category?: Category;
  wishListList?: Wishlist[];
  carts?: Cart[];
}

function validateProduct(product: Product): void {
  if (!product.name) {
    throw new Error("The name property is required.");
  }

  if (!product.imageUrl) {
    throw new Error("The imageURL property is required.");
  }

  if (!product.price) {
    throw new Error("The price property is required.");
  }

  if (!product.description) {
    throw new Error("The description property is required.");
  }

  if (!product.category) {
    throw new Error("The category property is required.");
  }
}
