import { knex } from "knex";
import config from "../config/config";
import { Product } from "../models/product.model";

import {
  CreateProductDTO,
  mapCreateProductDTOToProduct,
} from "../Dtos/product/create.dto";
import {
  UpdateProductDTO,
  mapUpdateProductDTOToProduct,
} from "../Dtos/product/update.dto";

const TableName = "products";
export class ProductRepository {
  private db = knex(config.knex);

  constructor() {}

  // Get all
  async getAll(): Promise<Product[]> {
    const products = await this.db<Product>(TableName).select();
    return products;
  }

  // Get by Name
  async getByName(name: string): Promise<Product[] | null> {
    const models = await this.db<Product>(TableName)
      .where("name", name)
      .select();
    return models ? models : null;
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

    const updatedModel = mapUpdateProductDTOToProduct(model);

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
