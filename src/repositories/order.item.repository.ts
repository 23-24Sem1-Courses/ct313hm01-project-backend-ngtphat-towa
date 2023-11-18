import { knex } from "knex";
import config from "../config/config";
import { OrderItem } from "../models/orderItem.model";
import { OrderItemDTO } from "../Dtos/order/order.item.dto";
import ProductRepository from "../repositories/product.repository";

class OrderItemRepository {
  private db = knex(config.knex);
  private table = "order_items";
  private productRepository = ProductRepository;
  constructor() {}

  async getAll(): Promise<OrderItem[]> {
    return await this.db(this.table).select("*");
  }

  async getOrderById(orderId: number): Promise<OrderItem[] | null> {
    const orderItemsDTOs = await this.db<OrderItemDTO>(this.table).where({
      orderId: orderId,
    });

    if (!orderItemsDTOs) {
      return null;
    }
    const orderItems: OrderItem[] = [];
    for (const item of orderItemsDTOs) {
      const product = await this.productRepository.getById(item.productId);
      const orderItem: OrderItem = {
        ...item,
        product: product!,
      };
      orderItems.push(orderItem);
    }
    return orderItems || null;
  }
  async search(searchCriteria: Partial<OrderItem>): Promise<OrderItem[]> {
    let query = this.db(this.table);

    for (const [key, value] of Object.entries(searchCriteria)) {
      query = query.orWhere(key as string, "like", `%${value}%`);
    }

    return await query.select("*");
  }

  async insert(item: OrderItemDTO): Promise<OrderItemDTO | null> {
    const [newId] = await this.db(this.table).insert(item);
    const result = await this.db<OrderItemDTO>(this.table)
      .where({ id: newId })
      .first();
    return result || null;
  }

  async read(id: number): Promise<OrderItem | null> {
    return await this.db(this.table).where({ id }).first();
  }

  async update(id: number, item: OrderItem): Promise<OrderItem> {
    await this.db(this.table).where({ id: id }).update(item);
    return await this.db(this.table).where({ id: id }).first();
  }

  async delete(id: number): Promise<void> {
    await this.db(this.table).where({ id }).delete();
  }
}
export default new OrderItemRepository();
