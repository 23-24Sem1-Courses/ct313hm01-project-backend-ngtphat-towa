import { knex } from "knex";
import config from "../config/config";
import { Order } from "../models/order.model";
import { OrderDTO } from "../Dtos/order/order.dto";
import Logging from "../common/Logging";
import { UpdateOrderStatusDTO } from "../Dtos/order/update.status.dto";

class OrderRepository {
  private db = knex(config.knex);
  private table = "orders";
  constructor() {}

  async getAllByUser(userId: number): Promise<OrderDTO[]> {
    return await this.db(this.table)
      .where("userId", userId)
      .orderBy("createdDate", "desc")
      .select("*");
  }

  async getAll(): Promise<OrderDTO[]> {
    const result = await this.db(this.table).select("*");
    return result || null;
  }

  async getUserOrderById(id: number, userId: number): Promise<OrderDTO | null> {
    const data = await this.db(this.table)
      .where({ id: id, userId: userId })
      .first();

    return data || null;
  }

  async getOrderById(id: number): Promise<OrderDTO | null> {
    const data = await this.db<OrderDTO>(this.table).where({ id: id }).first();
    return data || null;
  }
  async search(searchCriteria: Partial<Order>): Promise<Order[]> {
    let query = this.db(this.table);

    for (const [key, value] of Object.entries(searchCriteria)) {
      query = query.orWhere(key as string, "like", `%${value}%`);
    }

    return (await query.select("*")) || null;
  }

  async create(item: OrderDTO): Promise<Order | null> {
    const [newId] = await this.db(this.table).insert(item);
    const model = await this.db(this.table).where({ id: newId }).first();
    return model || null;
  }

  async read(id: number): Promise<Order | null> {
    return (await this.db(this.table).where({ id }).first()) || null;
  }

  async updateOrderStatus(dto: UpdateOrderStatusDTO): Promise<OrderDTO | null> {
    const query = this.db(this.table)
      .where({ id: dto.id!, sessionId: dto.sessionId })
      .update({
        deliveryStatus: dto.deliveryStatus.valueOf(),
      });
    Logging.debug("updateOrderStatus", query.toSQL());
    await query;
    return await this.getOrderById(dto.id!);
  }

  async delete(id: number): Promise<void> {
    await this.db(this.table).where({ id }).delete();
  }
}
export default new OrderRepository();
