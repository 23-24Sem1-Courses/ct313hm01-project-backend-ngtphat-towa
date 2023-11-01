import { NullableType } from "joi";
import {
  CategoryDTO,
  mapCategoryDTOToModel,
} from "../Dtos/category/category.dto";
import { ResponseDTO } from "../Dtos/response.dto";
import { Category } from "../models/catagory.model";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    const categories = this.categoryRepository.getAll();
    return categories;
  }

  // Get a category by name
  async getCategoryByName(name: string): Promise<Category | null> {
    return this.categoryRepository.getByName(name);
  }

  // Get a category by ID
  async getCategoryById(id: number): Promise<Category | null> {
    const category = this.categoryRepository.getById(id);
    return category;
  }

  // Create a new category
  async createCategory(categoryDTO: CategoryDTO): Promise<Category | null> {
    var category = mapCategoryDTOToModel(categoryDTO);
    const catagory = await this.categoryRepository.create(category);
    return catagory;
  }

  // Update a category
  async updateCategory(
    id: number,
    categoryDTO: CategoryDTO
  ): Promise<Category> {
    var category = mapCategoryDTOToModel(categoryDTO);
    category = await this.categoryRepository.update(category);

    return category;
  }
}
