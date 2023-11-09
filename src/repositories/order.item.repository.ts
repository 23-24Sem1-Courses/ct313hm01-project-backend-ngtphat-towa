import { knex } from "knex";
import config from "../config/config";
import { OrderItemDTO } from "../Dtos/order/order.item.dto";

class OrderItemRepository {
  private db = knex(config.knex);
  private table = "orders";
  constructor() {}

  async getAll(): Promise<OrderItemDTO[]> {
    return await this.db(this.table).select("*");
  }

  async getById(id: number): Promise<OrderItemDTO | null> {
    return await this.db(this.table).where({ id: id }).first();
  }
  async search(searchCriteria: Partial<OrderItemDTO>): Promise<OrderItemDTO[]> {
    let query = this.db(this.table);

    for (const [key, value] of Object.entries(searchCriteria)) {
      query = query.orWhere(key as string, "like", `%${value}%`);
    }

    return await query.select("*");
  }

  async create(item: OrderItemDTO): Promise<OrderItemDTO> {
    const [newId] = await this.db(this.table).insert(item);
    return await this.db(this.table).where({ id: newId }).first();
  }

  async read(id: number): Promise<OrderItemDTO | null> {
    return await this.db(this.table).where({ id }).first();
  }

  async update(id: number, item: OrderItemDTO): Promise<OrderItemDTO> {
    await this.db(this.table).where({ id: id }).update(item);
    return await this.db(this.table).where({ id: id }).first();
  }

  async delete(id: number): Promise<void> {
    await this.db(this.table).where({ id }).delete();
  }
}
