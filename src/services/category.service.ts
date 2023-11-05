import { Category } from "../models/category.model";
import CategoryRepository from "../repositories/category.repository";
import { CreateCategoryDTO } from "../Dtos/category/create.dto";
import { UpdateCategoryDTO } from "../Dtos/category/update.dto";

class CategoryService {
  private categoryRepository = CategoryRepository;

  constructor() {}

  // Get all categories
  async getAll(): Promise<Category[]> {
    const models = this.categoryRepository.getAll();
    return models;
  }

  // Get a category by name
  async getByName(name: string): Promise<Category | null> {
    return this.categoryRepository.getByName(name);
  }

  // Get a category by ID
  async getById(id: number): Promise<Category | null> {
    const model = this.categoryRepository.getById(id);
    return model;
  }

  // Create a new category
  async create(dto: CreateCategoryDTO): Promise<Category | null> {
    const catagory = await this.categoryRepository.create(dto);
    return catagory;
  }

  // Update a category
  async update(id: number, dto: UpdateCategoryDTO): Promise<Category> {
    const model = await this.categoryRepository.update(id, dto);

    return model;
  }
}
export default new CategoryService();
