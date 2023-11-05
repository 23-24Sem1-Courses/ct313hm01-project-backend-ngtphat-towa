import { knex } from "knex";
import config from "../config/config";
import { Product } from "../models/product.model";
import { Category } from "../models/catagory.model";

const TableName = "categories";
class CategoryRepository {
  private db = knex(config.knex);

  constructor() {}

  // Get all
  async getAll(): Promise<Category[]> {
    const models = await this.db<Category>(TableName).select();

    for (const category of models) {
      const products = await this.db<Product>("products").where(
        "categoryId",
        category.id
      );
      category.products = products;
    }

    return models;
  }

  // Get by Name
  async getByName(name: string): Promise<Category | null> {
    const category = await this.db<Category>(TableName)
      .where("categoryName", name)
      .first();
    return category ?? null;
  }

  // Get by id
  async getById(id: number): Promise<Category | null> {
    const category = await this.db<Category>(TableName).where("id", id).first();
    return category ?? null;
  }

  // Create
  async create(model: Category): Promise<Category> {
    const [id] = await this.db<Category>(TableName)
      .insert(model)
      .returning("id");
    model.id = Number(id);
    return model;
  }

  // Update
  async update(model: Category): Promise<Category> {
    await this.db<Category>(TableName).where("id", model.id).update(model);
    return model;
  }
}
export default new CategoryRepository();
