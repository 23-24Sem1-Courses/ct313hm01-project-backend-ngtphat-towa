import { Request } from "express";
import Joi from "joi";
import { MissingRequiredParameterErrorResponse } from "../../common/api.error";

// DeleteProductDTO for deleting a product
export interface DeleteProductDTO {
  id: number;
}
// Joi schema for DeleteProductDTO
export const deleteProductSchema = Joi.object({
  id: Joi.number().required(),
});

export function validateDeleteProductDTO(dto: DeleteProductDTO): void {
  if (!dto.id) {
    throw new MissingRequiredParameterErrorResponse("product");
  }
}
export function parseBodyToDeleteProductDTO(req: Request): DeleteProductDTO {
  return {
    id: req.body.id,
  };
}
