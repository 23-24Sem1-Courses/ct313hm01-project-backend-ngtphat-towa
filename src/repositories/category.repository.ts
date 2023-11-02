import { knex } from "knex";
import Logging from "../common/Logging";
import { Category } from "../models/catagory.model";
import { knexConfig } from "../config/knexfile";
import { Product } from "../models/product.model";

const TableName = "categories";
export class CategoryRepository {
  private db = knex(knexConfig);

  constructor() {}

  // Get all
  async getAll(): Promise<Category[]> {
    const categories = await this.db<Category>(TableName).select();

    // for (const category of categories) {
    //   const products = await this.db<Product>("products").where(
    //     "categoryId",
    //     category.id
    //   );
    //   category.products = products;
    // }

    return categories;
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
    Logging.info(model);
    return model;
  }

  // Update
  async update(model: Category): Promise<Category> {
    await this.db<Category>(TableName)
      .where("id", model.id)
      .update(model);
    return model;
  }
}