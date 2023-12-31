import { Product } from "./product.model";
import { User } from "./user.model";

export interface Wishlist {
  user?: User;
  products?: Product[];
}
