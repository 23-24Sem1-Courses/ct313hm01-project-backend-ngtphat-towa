import { knex } from "knex";
import config from "../config/config";
import { Order } from "../models/order.model";
import { OrderDTO } from "../Dtos/order/order.dto";

class OrderRepository {
  private db = knex(config.knex);
  private table = "orders";
  constructor() {}

  async getAll(userId: number): Promise<OrderDTO[]> {
    return await this.db(this.table)
      .where("userId", userId)
      .orderBy("createdDate", "desc")
      .select("*");
  }

  async getById(id: number): Promise<OrderDTO | null> {
    return await this.db(this.table).where({ id: id }).first();
  }
  async search(searchCriteria: Partial<Order>): Promise<Order[]> {
    let query = this.db(this.table);

    for (const [key, value] of Object.entries(searchCriteria)) {
      query = query.orWhere(key as string, "like", `%${value}%`);
    }

    return await query.select("*");
  }

  async create(item: OrderDTO): Promise<Order | null> {
    const [newId] = await this.db(this.table).insert(item);
    const model = await this.db(this.table).where({ id: newId }).first();
    return model || null;
  }

  async read(id: number): Promise<Order | null> {
    return await this.db(this.table).where({ id }).first();
  }

  async update(id: number, item: Order): Promise<Order> {
    await this.db(this.table).where({ id: id }).update(item);
    return await this.db(this.table).where({ id: id }).first();
  }

  async delete(id: number): Promise<void> {
    await this.db(this.table).where({ id }).delete();
  }
}
export default new OrderRepository();
