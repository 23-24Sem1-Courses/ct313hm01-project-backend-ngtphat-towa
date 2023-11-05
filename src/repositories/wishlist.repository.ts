import { knex } from "knex";
import config from "../config/config";
import { Product } from "../models/product.model";
import { Wishlist } from "../models/wishlist.model";

const TableName = "wishlist";
export class WishlistRepository {
  private db = knex(config.knex);

  constructor() {}

  // Get all
  async getAllWishlistItem(): Promise<Product[]> {
    const models = await this.db<Wishlist>(TableName).select();

    return models;
  }

  // Get by id
  async getById(id: number): Promise<Wishlist | null> {
    const category = await this.db<Wishlist>(TableName).where("id", id).first();
    return category ?? null;
  }

  // Create
  async create(model: Wishlist): Promise<Wishlist> {
    const [id] = await this.db<Wishlist>(TableName)
      .insert(model)
      .returning("id");
    model.id = Number(id);
    return model;
  }

  // Update
  async remove(model: Wishlist): Promise<Wishlist> {
    await this.db<Wishlist>(TableName).where("id", model.id).delete();
    return model;
  }
}
