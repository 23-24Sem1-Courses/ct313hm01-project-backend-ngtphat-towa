import { ProductDTO } from "../Dtos/product/product.dto";
import { Order } from "./order.model";
import { Product } from "./product.model";

export interface OrderItem {
  id?: number;
  quantity?: number;
  price?: number;
  createdDate?: Date;
  orderId?: number;
  product?: Product | ProductDTO;
}
