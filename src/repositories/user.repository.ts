import { knex } from "knex";
import Logging from "../common/Logging";
import config from "../config/config";
import { User } from "../models/user.model";

const TableName = "user";
export class UserRepository {
  private db = knex(config.knex);

  constructor() {}

  // Get all
  async getAll(): Promise<User[]> {
    const categories = await this.db<User>(TableName).select();
    return categories;
  }

  // Get by Name
  async getByName(name: string): Promise<User | null> {
    const category = await this.db<User>(TableName)
      .where("username", name)
      .orWhere("email", "like", "%${name}%")
      .first();
    return category ?? null;
  }

  // Get by id
  async getById(id: number): Promise<User | null> {
    const category = await this.db<User>(TableName).where("id", id).first();
    return category ?? null;
  }

  // Create
  async create(model: User): Promise<User> {
    const [id] = await this.db<User>(TableName).insert(model).returning("id");
    model.id = Number(id);
    Logging.info(model);
    return model;
  }

  // Update
  async update(model: User): Promise<User> {
    await this.db<User>(TableName).where("id", model.id).update(model);
    return model;
  }
}
