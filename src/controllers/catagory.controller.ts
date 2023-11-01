import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { CategoryRepository } from "../repositories/category.repository";
import { ResponseDTO } from "../Dtos/response.dto";
import { ApiResponse } from "../common/api.response";
import {
  CategoryDTO,
  validateCategoryDTO,
} from "../Dtos/category/category.dto";
import { validateCategory } from "../models/catagory.model";

const categoryService = new CategoryService(new CategoryRepository());

/** all */
const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await categoryService.getAllCategories();
  return res.status(200).json(categories);
};
const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);
  const existingCategory = await categoryService.getCategoryById(id);
  if (existingCategory === null) {
    const err: ApiResponse = {
      message: `Category id ${id} was not found`,
      success: false,
    };
    return res.status(404).json(err);
  }
  return res.status(200).json(existingCategory);
};

/** create */
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /// Retrive and validate
    const catagoryDTO = new CategoryDTO(req.body);
    validateCategoryDTO(catagoryDTO);
    if ((await isCategoryExist(catagoryDTO.name)) === true) {
      const response: ApiResponse = {
        message: `Category ${catagoryDTO.name} was created`,
        success: true,
      };

      return res.status(201).json(response);
    }

    /// Call Services
    const category = await categoryService.createCategory(catagoryDTO);

    //
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

/** update/:id */
const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /// Retrive
    const id = Number(req.params.id);
    const catagoryDTO = new CategoryDTO(req.body);

    // Validate
    validateCategoryDTO(catagoryDTO);

    const existingCategory = await categoryService.getCategoryById(id);
    if (existingCategory === null) {
      const err: ApiResponse = {
        message: `Category id ${id} was not found`,
        success: false,
      };
      return res.status(404).json(err);
    }

    /// Call Services
    const category = await categoryService.updateCategory(id, catagoryDTO);

    //
    return res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

async function isCategoryExist(searchName: string): Promise<boolean> {
  const existingCategory = await categoryService.getCategoryByName(
    searchName.trim()
  );
  return existingCategory !== null;
}

export default {
  getCategories,
  createCategory,
  updateCategory,
  getCategoryById,
};
