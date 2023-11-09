import { knex } from "knex";
import config from "../config/config";
import { OrderDTO } from "../Dtos/order/order.dto";

class OrderRepository {
  private db = knex(config.knex);
  private table = "orders";
  constructor() {}

  async getAll(): Promise<OrderDTO[]> {
    return await this.db(this.table).select("*");
  }

  async getById(id: number): Promise<OrderDTO | null> {
    return await this.db(this.table).where({ id: id }).first();
  }
  async search(searchCriteria: Partial<OrderDTO>): Promise<OrderDTO[]> {
    let query = this.db(this.table);

    for (const [key, value] of Object.entries(searchCriteria)) {
      query = query.orWhere(key as string, "like", `%${value}%`);
    }

    return await query.select("*");
  }

  async create(item: OrderDTO): Promise<OrderDTO> {
    const [newId] = await this.db(this.table).insert(item);
    return await this.db(this.table).where({ id: newId }).first();
  }

  async read(id: number): Promise<OrderDTO | null> {
    return await this.db(this.table).where({ id }).first();
  }

  async update(id: number, item: OrderDTO): Promise<OrderDTO> {
    await this.db(this.table).where({ id: id }).update(item);
    return await this.db(this.table).where({ id: id }).first();
  }

  async delete(id: number): Promise<void> {
    await this.db(this.table).where({ id }).delete();
  }
}
