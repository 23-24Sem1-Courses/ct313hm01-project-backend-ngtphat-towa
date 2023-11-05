import { knex } from "knex";
import config from "../config/config";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { CreateCategoryDTO } from "../Dtos/category/create.dto";
import { UpdateCategoryDTO } from "../Dtos/category/update.dto";

const CategoryTable = "categories";
class CategoryRepository {
  private db = knex(config.knex);

  constructor() {}

  // Get all
  async getAll(): Promise<Category[]> {
    const models = await this.db<Category>(CategoryTable).select();

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
    const category = await this.db<Category>(CategoryTable)
      .where("name", name)
      .first();
    return category ?? null;
  }

  // Get by id
  async getById(id: number): Promise<Category | null> {
    const category = await this.db<Category>(CategoryTable)
      .where("id", id)
      .first();
    return category ?? null;
  }

  // Create
  async create(dto: CreateCategoryDTO): Promise<Category | null> {
    const id: number = await this.db<Category>(CategoryTable)
      .insert(dto)
      .returning("id");
    const model: Category = {
      id: id,
      ...dto,
    };
    model.id = Number(id);
    return model;
  }

  // Update
  async update(id: number, dto: UpdateCategoryDTO): Promise<Category> {
    await this.db<Category>(CategoryTable).where("id", id).update(dto);

    const model: Category = {
      id: id,
      ...dto,
    };
    return model;
  }
}
export default new CategoryRepository();
