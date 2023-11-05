import { NextFunction, Request, Response } from "express";
import CategoryService from "../services/category.service";

import { CategoryDTO } from "../Dtos/category/category.dto";
import { Category } from "../models/category.model";
import {
  ConflictErrorResponse,
  ResourceNotFoundErrorResponse,
  validateIdDTO,
} from "../common/api.error";
import { parseBodyToDTO } from "../Dtos/common.dto";
import {
  CreateCategoryDTO,
  createCategorySchema,
} from "../Dtos/category/create.dto";
import { updateProductSchema } from "../Dtos/product/update.dto";
import { UpdateCategoryDTO } from "../Dtos/category/update.dto";

const service = CategoryService;
const resourceName = "category";

/** all */
const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const models = await service.getAll();

    return res.status(200).json(models);
  } catch (error) {
    next(error);
  }
};
const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = validateIdDTO(req);
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
    const dto = parseBodyToDTO<CreateCategoryDTO>(req, createCategorySchema);
    await validateNameExist(dto.name);

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
    const id = validateIdDTO(req);
    const dto = parseBodyToDTO<UpdateCategoryDTO>(req, updateProductSchema);

    await validateExisting(id);

    /// Call Services
    const category = await service.update(id, dto);

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
