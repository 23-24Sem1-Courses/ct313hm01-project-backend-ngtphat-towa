import { Request } from "express";
import { Category } from "../../models/catagory.model";
import { Product } from "../../models/product.model";
import { InvalidParameterErrorResponse } from "../../common/api.error";

export interface ProductDTO {
  id?: number;
  name: string;
  imageUrl?: string;
  price: number;
  description?: string;
  categoryId: number;
}

// CreateProductDTO for creating a new product
export interface CreateProductDTO {
  name: string;
  imageUrl?: string;
  price: number;
  description?: string;
  categoryId: number;
}

// UpdateProductDTO for updating an existing product
export interface UpdateProductDTO {
  id: number;
  name?: string;
  imageUrl?: string;
  price?: number;
  description?: string;
  categoryId?: number;
}

// ReadProductDTO for reading product data
export interface ReadProductDTO {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
  category: Category;
}

// DeleteProductDTO for deleting a product
export interface DeleteProductDTO {
  id: number;
}
export function validateCreateProductDTO(dto: CreateProductDTO): void {
  if (!dto.name) {
    throw new InvalidParameterErrorResponse("name", dto.name);
  }

  if (!dto.price) {
    throw new InvalidParameterErrorResponse("price", dto.price);
  }

  if (!dto.categoryId) {
    throw new InvalidParameterErrorResponse("categoryId", dto.categoryId);
  }
}

export function validateUpdateProductDTO(dto: UpdateProductDTO): void {
  if (!dto.id) {
    throw new InvalidParameterErrorResponse("id", dto.id);
  }
  if (!dto.name) {
    throw new InvalidParameterErrorResponse("name", dto.name);
  }
  if (!dto.price) {
    throw new InvalidParameterErrorResponse("price", dto.price);
  }

  if (!dto.categoryId) {
    throw new InvalidParameterErrorResponse("categoryId", dto.categoryId);
  }
}

export function validateReadProductDTO(dto: ReadProductDTO): void {
  if (!dto.id) {
    throw new InvalidParameterErrorResponse("id", dto.id);
  }

  if (!dto.name) {
    throw new InvalidParameterErrorResponse("name", dto.name);
  }
  if (!dto.price) {
    throw new InvalidParameterErrorResponse("price", dto.price);
  }
  if (!dto.imageUrl) {
    throw new InvalidParameterErrorResponse("imageUrl", dto.imageUrl);
  }

  if (!dto.description) {
    throw new InvalidParameterErrorResponse("description", dto.description);
  }

  if (!dto.category) {
    throw new InvalidParameterErrorResponse("category", dto.category);
  }
}

export function validateDeleteProductDTO(dto: DeleteProductDTO): void {
  if (!dto.id) {
    throw new Error("The id property is required.");
  }
}

export function mapCreateProductDTOToProduct(dto: CreateProductDTO): Product {
  return {
    name: dto.name,
    imageUrl: dto.imageUrl,
    price: dto.price,
    description: dto.description,
    category: { id: dto.categoryId },
    wishListList: [],
    carts: [],
  };
}

export function mapUpdateProductDTOToProduct(dto: UpdateProductDTO): Product {
  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dto.imageUrl,
    price: dto.price,
    description: dto.description,
    category: dto.categoryId ? { id: dto.categoryId } : undefined,
    wishListList: [],
    carts: [],
  };
}
export function parseBodyToCreateProductDTO(req: Request): CreateProductDTO {
  return {
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
    categoryId: req.body.categoryId,
  };
}

export function parseBodyToUpdateProductDTO(req: Request): UpdateProductDTO {
  return {
    id: req.body.id,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
    categoryId: req.body.categoryId,
  };
}

export function parseBodyToReadProductDTO(req: Request): ReadProductDTO {
  return {
    id: req.body.id,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
  };
}

export function parseBodyToDeleteProductDTO(req: Request): DeleteProductDTO {
  return {
    id: req.body.id,
  };
}

export function validateProductDTO(productDto: ProductDTO): void {
  if (!productDto.name) {
    throw new Error("The name property is required.");
  }

  if (!productDto.price) {
    throw new Error("The price property is required.");
  }

  if (!productDto.description) {
    throw new Error("The description property is required.");
  }

  if (!productDto.categoryId) {
    throw new Error("The categoryId property is required.");
  }
}
