import ApiError from "../common/api.error";
import { Product } from "./product.model";

export interface Category {
  id?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  products?: Product[];
}
