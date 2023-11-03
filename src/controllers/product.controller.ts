import { NextFunction, Request, Response } from "express";
import { ProductRepository } from "../repositories/product.repository";
import { ProductService } from "../services/product.service";
import { parseBodyToDTO } from "../Dtos/comom.dto";

import { Product } from "../models/product.model";
import {
  validateIdDTO,
  ResourceNotFoundErrorResponse,
  ConflictErrorResponse,
} from "../common/api.error";
import {
  CreateProductDTO,
  createProductSchema,
} from "../Dtos/product/create.dto";
import {
  UpdateProductDTO,
  updateProductSchema,
} from "../Dtos/product/update.dto";

const service = new ProductService(new ProductRepository());
const resourceName = "product";
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
    /// Retrive and validate
    const id: number = validateIdDTO(req.params);

    /// Call Services
    const existing = await validateExisting(id);

    return res.status(200).json(existing);
  } catch (error) {
    next(error);
  }
};

const getByName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// Retrive and validate
    const name: string = req.params.name;

    /// Call Services
    const existing = await service.getByName(name);

    return res.status(200).json(existing);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// Retrive and validate
    const dto = parseBodyToDTO<CreateProductDTO>(req, createProductSchema);
    await validateNameExist(dto.name);

    /// Call Services
    const model = await service.create(dto);

    return res.status(201).json(model);
  } catch (error) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// Retrive and validate
    const dto = parseBodyToDTO<UpdateProductDTO>(req, updateProductSchema);
    await validateExisting(dto.id);

    /// Call Services
    const model = await service.update(dto.id, dto);

    return res.status(204).json(model);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// Retrive and validate
    const id: number = validateIdDTO(req.params);
    await validateExisting(id);

    /// Call Services
    const model = await service.deleteById(id);

    return res.status(200).json(model);
  } catch (error) {
    next(error);
  }
};

const deleteAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// Call Services
    const model = await service.deleteAll();

    return res.status(204).json(model);
  } catch (error) {
    next(error);
  }
};

async function validateNameExist(searchName: string): Promise<void> {
  const existing = await service.getByName(searchName.trim());
  if (existing !== null && existing.length > 0) {
    throw new ConflictErrorResponse();
  }
}

async function validateExisting(id: number): Promise<Product> {
  const existing = await service.getById(id);
  if (existing === null) {
    throw new ResourceNotFoundErrorResponse(resourceName);
  }
  return existing;
}

export default {
  getAll,
  getById,
  getByName,
  create,
  update,
  deleteById,
  deleteAll,
};
