import { Product } from "./product.model";
import { User } from "./user.model";

export interface WishlistItem {
  id: number;
  user?: User;
  createdDate?: Date;
  product?: Product;
}
