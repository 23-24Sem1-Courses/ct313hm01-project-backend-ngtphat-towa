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
  async create(categoryDTO: CategoryDTO): Promise<Category | null> {
    var model = mapCategoryDTOToModel(categoryDTO);
    const catagory = await this.categoryRepository.create(model);
    return catagory;
  }

  // Update a category
  async update(id: number, categoryDTO: CategoryDTO): Promise<Category> {
    var models = mapCategoryDTOToModel(categoryDTO);
    models = await this.categoryRepository.update(models);

    return models;
  }
}
