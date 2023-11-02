import {
  CreateProductDTO,
  UpdateProductDTO,
} from "../Dtos/product/product.dto";
import { Product } from "../models/product.model";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  // Get all categories
  async getAll(): Promise<Product[]> {
    const models = this.productRepository.getAll();
    return models;
  }

  // Get a product by name
  async getByName(name: string): Promise<Product[] | null> {
    return this.productRepository.getByName(name);
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
  ): Promise<Product> {
    const model = await this.productRepository.update(updateProductDTO);
    return model;
  }

  // Delete a product
  async deleteById(id: number): Promise<number> {
    const deletedId = await this.productRepository.deleteById(id);
    return deletedId;
  }

  // Delete all products
  async deleteAll(): Promise<void> {
    await this.productRepository.deleteAll();
  }
}
