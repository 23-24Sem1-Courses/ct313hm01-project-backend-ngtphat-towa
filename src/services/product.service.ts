import { CreateProductDTO } from "../Dtos/product/create.dto";
import { UpdateProductDTO } from "../Dtos/product/update.dto";
import { Product } from "../models/product.model";
import ProductRepository from "../repositories/product.repository";

export class ProductService {
  private productRepository = ProductRepository;

  constructor() {}

  // Get all categories
  async getAll(): Promise<Product[] | null> {
    const models = this.productRepository.getAll();
    return models;
  }

  // Get a product by name
  async getByName(name: string): Promise<Product[] | null> {
    const models = await this.productRepository.getByName(name);
    return models;
  }

  // Get a product by ID
  async getById(id: number): Promise<Product | null> {
    const model = this.productRepository.getById(id);
    return model;
  }

  // Create a new product
  async create(createProductDTO: CreateProductDTO): Promise<Product | null> {
    const model = await this.productRepository.create(createProductDTO);
    return model;
  }

  // Update a product
  async update(
    id: number,
    updateProductDTO: UpdateProductDTO
  ): Promise<Product | null> {
    const model = await this.productRepository.update(id, updateProductDTO);
    return model;
  }

  // Delete a product
  async deleteById(id: number): Promise<number | null> {
    const deletedId = await this.productRepository.deleteById(id);
    return deletedId;
  }

  // Delete all products
  async deleteAll(): Promise<void> {
    await this.productRepository.deleteAll();
  }
}
export default new ProductService();
