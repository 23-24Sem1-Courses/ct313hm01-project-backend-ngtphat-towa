import { Product } from "./product.model";
import { User } from "./user.model";

export interface Wishlist {
  id: number;
  user: User;
  createdDate: Date;
  product: Product;
}

export function validateWishList(wishList: Wishlist): void {
  if (!wishList.user) {
    throw new Error("The user property is required.");
  }

  if (!wishList.createdDate) {
    throw new Error("The createdDate property is required.");
  }

  if (!wishList.product) {
    throw new Error("The product property is required.");
  }
}
