import { knex } from "knex";
import Logging from "../common/Logging";
// import { Product } from "../models/catagory.model";
import { knexConfig } from "../config/knexfile";
import { Product } from "../models/product.model";
import {
  CreateProductDTO,
  UpdateProductDTO,
  mapCreateProductDTOToProduct,
  mapUpdateProductDTOToProduct,
} from "../Dtos/product/product.dto";

const TableName = "products";
export class ProductRepository {
  private db = knex(knexConfig);

  constructor() {}

  // Get all
  async getAll(): Promise<Product[]> {
    const products = await this.db<Product>(TableName).select();
    return products;
  }

  // Get by Name
  async getByName(name: string): Promise<Product[] | null> {
    const model = await this.db<Product>(TableName)
      .where("name", name)
      .select();
    return model ?? null;
  }

  // Get by id
  async getById(id: number): Promise<Product | null> {
    const model = await this.db<Product>(TableName).where("id", id).first();
    return model ?? null;
  }

  // Create
  async create(model: CreateProductDTO): Promise<Product> {
    const [id] = await this.db<CreateProductDTO>(TableName).insert(model);

    const createdModel = mapCreateProductDTOToProduct(model);
    createdModel.id = Number(id);

    return createdModel;
  }

  // Update
  async update(model: UpdateProductDTO): Promise<Product> {
    await this.db<UpdateProductDTO>(TableName)
      .where("id", model.id)
      .update(model);
    console.log(model);

    const updatedModel = mapUpdateProductDTOToProduct(model);
    console.log(updatedModel);

    return updatedModel;
  }

  // Delete by id
  async deleteById(id: number): Promise<number> {
    const deletedId = await this.db<Product>(TableName)
      .where("id", id)
      .delete();
    return deletedId;
  }
  async deleteAll(): Promise<void> {
    await this.db<Product>(TableName).truncate();
  }
}