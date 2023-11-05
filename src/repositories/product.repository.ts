import { knex } from "knex";
import config from "../config/config";
import { Product } from "../models/product.model";

import { CreateProductDTO } from "../Dtos/product/create.dto";
import { UpdateProductDTO } from "../Dtos/product/update.dto";

import CategoryRepository from "./category.repository";
import { ProductDTO } from "../Dtos/product/product.dto";

const ProductTable = "products";
class ProductRepository {
  private db = knex(config.knex);
  private categoryRepository = CategoryRepository;

  constructor() {}

  // Get all
  async getAll(): Promise<Product[] | null> {
    const dtos = await this.db<ProductDTO>(ProductTable).select();

    let models: Product[] = [];
    for (let dto of dtos) {
      const category = (await this.categoryRepository.getById(
        dto.categoryId!
      ))!;

      models.push({
        ...dto,
        category,
      });
    }

    return models;
  }

  // Get by Name
  async getByName(name: string): Promise<Product[] | null> {
    const models = await this.db<Product>(ProductTable)
      .where("name", name)
      .select();
    return models ? models : null;
  }

  // Get by id
  async getById(id: number): Promise<Product | null> {
    const model = await this.db<Product>(ProductTable).where("id", id).first();
    return model ?? null;
  }

  // Create
  async create(dto: CreateProductDTO): Promise<Product> {
    const [id] = await this.db<CreateProductDTO>(ProductTable).insert(dto);

    const model = {
      id: Number(id),
      ...dto,
    };
    return model;
  }

  // Update
  async update(id: number, dto: UpdateProductDTO): Promise<Product> {
    await this.db<ProductDTO>(ProductTable).where("id", id).update(dto);

    const category = (await this.categoryRepository.getById(dto.categoryId!))!;
    const model: Product = {
      ...dto,
      category,
    };

    return model;
  }

  // Delete by id
  async deleteById(id: number): Promise<number> {
    const deletedId = await this.db<Product>(ProductTable)
      .where("id", id)
      .delete();
    return deletedId;
  }
  async deleteAll(): Promise<void> {
    await this.db<Product>(ProductTable).truncate();
  }
}
export default new ProductRepository();
