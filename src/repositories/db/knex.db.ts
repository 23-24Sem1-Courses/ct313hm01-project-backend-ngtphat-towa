import { Knex } from "knex";

// type IModel<T extends { id: number }> = T;

export class KnexCrud<T> {
  constructor(
    private knex: Knex,
    private table: string
  ) {}

  async getAll(): Promise<T[]> {
    return await this.knex(this.table).select("*");
  }

  async getById(id: number): Promise<T> {
    return await this.knex(this.table).where({ id: id }).first();
  }
  async search(searchCriteria: Partial<T>): Promise<T[]> {
    let query = this.knex(this.table);

    for (const [key, value] of Object.entries(searchCriteria)) {
      query = query.orWhere(key as string, "like", `%${value}%`);
    }

    return await query.select("*");
  }

  async create(item: T): Promise<T> {
    const [newId] = await this.knex(this.table).insert(item);
    return await this.knex(this.table).where({ id: newId }).first();
  }

  async read(id: number): Promise<T | null> {
    return await this.knex(this.table).where({ id }).first();
  }

  async update(id: number, item: T): Promise<T> {
    await this.knex(this.table).where({ id: id }).update(item);
    return await this.knex(this.table).where({ id: id }).first();
  }

  async delete(id: number): Promise<void> {
    await this.knex(this.table).where({ id }).delete();
  }
}
