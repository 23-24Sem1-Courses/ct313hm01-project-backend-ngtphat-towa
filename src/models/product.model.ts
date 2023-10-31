import { Catagory } from "./catalog.model";

export interface Product {
  id?: number;
  name: string;
  imageURL?: string;
  price: number;
  description?: string;
  category?: Catagory;
}
