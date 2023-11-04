import { knex } from "knex";
import config from "../config/config";
import { User } from "../models/user.model";

const TableName = "users";
class UserRepository {
  private db = knex(config.knex);

  constructor() {}

  // Get all
  async getAll(): Promise<User[]> {
    const models = await this.db<User>(TableName).select();
    return models;
  }

  // Get by Name
  async getByName(name: string): Promise<User | null> {
    const model = await this.db<User>(TableName)
      .where("email", name)
      // .orWhere("email", "like", `%${name}%`)
      .first();
    return model ?? null;
  }

  // Get by id
  async getById(id: number): Promise<User | null> {
    const model = await this.db<User>(TableName).where("id", id).first();
    return model ?? null;
  }

  // Create
  async create(model: User): Promise<User> {
    const [id] = await this.db<User>(TableName).insert(model).returning("id");
    model.id = Number(id);
    return model;
  }

  // Update
  async update(model: User): Promise<User> {
    await this.db<User>(TableName).where("id", model.id).update(model);
    return model;
  }
}
export default new UserRepository();
