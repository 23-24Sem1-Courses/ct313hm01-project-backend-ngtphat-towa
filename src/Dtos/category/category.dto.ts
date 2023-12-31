import Joi from "joi";
import { Category } from "../../models/category.model";

export interface CategoryDTO {
  id?: number;
  name: string;
  description: string;
  imageUrl?: string;
}

export const CategoryDTOSchema = Joi.object({
  id: Joi.number().integer().optional().messages({
    "number.base": "id must be a number",
    "number.integer": "id must be an integer",
  }),
  name: Joi.string().required().messages({
    "string.base": "name must be a string",
    "string.empty": "name cannot be an empty field",
    "any.required": "name is a required field",
  }),
  description: Joi.string().required().messages({
    "string.base": "description must be a string",
    "string.empty": "description cannot be an empty field",
    "any.required": "description is a required field",
  }),
  imageUrl: Joi.string().uri().optional().messages({
    "string.base": "imageUrl must be a string",
    "string.uri": "imageUrl must be a valid URI",
  }),
});

export function mapCategoryDTOToCategory(categoryDTO: CategoryDTO): Category {
  return {
    ...categoryDTO,
    products: [],
  };
}
