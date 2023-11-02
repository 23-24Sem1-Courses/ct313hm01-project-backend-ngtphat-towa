import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { CategoryRepository } from "../repositories/category.repository";
import {
  CategoryDTO,
  validateCategoryDTO,
} from "../Dtos/category/category.dto";
import { Category } from "../models/catagory.model";
import {
  ConflictErrorResponse,
  ResourceNotFoundErrorResponse,
  validateIdDTO,
} from "../common/api.error";

const service = new CategoryService(new CategoryRepository());
const resourceName = "category";

/** all */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  const categories = await service.getAll();
  return res.status(200).json(categories);
};
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateIdDTO(req.params);
    const existing = await validateExisting(id);

    return res.status(200).json(existing);
  } catch (error) {
    next(error);
  }
};

/** create */
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// Retrive and validate
    const dto = new CategoryDTO(req.body);
    validateCategoryDTO(dto);
    validateNameExist(dto.categoryName);

    /// Call Services
    const model = await service.create(dto);

    return res.status(200).json(model);
  } catch (error) {
    next(error);
  }
};

/** update/:id */
const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// Retrive
    const id = validateIdDTO(req.params);
    const catagoryDTO = new CategoryDTO(req.body);

    // Validate
    validateCategoryDTO(catagoryDTO);
    await validateExisting(id);

    /// Call Services
    const category = await service.update(id, catagoryDTO);

    //
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

async function validateNameExist(searchName: string): Promise<void> {
  const existing = await service.getByName(searchName.trim());
  if (existing !== null) {
    throw new ConflictErrorResponse();
  }
}

async function validateExisting(id: number): Promise<Category> {
  const existing = await service.getById(id);
  if (existing === null) {
    throw new ResourceNotFoundErrorResponse(resourceName);
  }
  return existing;
}

export default {
  getAll,
  create,
  update,
  getById,
};
