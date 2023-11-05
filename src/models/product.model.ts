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
}
