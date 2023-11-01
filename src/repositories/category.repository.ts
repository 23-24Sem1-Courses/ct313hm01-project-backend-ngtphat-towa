import Logging from "../common/Logging";
import { Categories } from "../mocks/models/categories";
import { Category } from "../models/catagory.model";

export class CategoryRepository {
  private categories: Category[] = Categories;
  constructor() {}

  // Get all
  async getAll(): Promise<Category[]> {
    console.log(this.categories);

    return this.categories;
  }

  // Get by Name
  async getByName(name: string): Promise<Category | null> {
    const category =
      this.categories.find((category) => category.name === name) ?? null;
    return category;
  }

  // Get by id
  async getById(id: number): Promise<Category | null> {
    const category =
      this.categories.find((category) => category.id === id) ?? null;
    return category;
  }
  // Create
  async create(category: Category): Promise<Category> {
    category.id = Math.floor(Math.random() * 10000) + 1;
    Logging.info(category);
    this.categories.push(category);
    return category;
  }

  // Update
  async update(category: Category): Promise<Category> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.id === category.id
    );
    if (categoryIndex >= 0) {
      this.categories[categoryIndex] = category;
    } 
    return this.categories[categoryIndex];
  }
}
