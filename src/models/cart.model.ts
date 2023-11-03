import { Product } from "./product.model";
import { User } from "./user.model";

export interface Cart {
  id: number;
  createdDate: Date;
  product: Product;
  userId: number;
  quantity: number;
}

function validateCart(cart: Cart): void {
  if (!cart.product) {
    throw new Error("The product property is required.");
  }

  if (!cart.userId) {
    throw new Error("The userId property is required.");
  }

  if (!cart.quantity) {
    throw new Error("The quantity property is required.");
  }

  if (cart.quantity <= 0) {
    throw new Error("The quantity property must be greater than 0.");
  }
}
