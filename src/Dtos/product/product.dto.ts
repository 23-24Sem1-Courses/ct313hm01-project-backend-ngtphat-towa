import Joi from "joi";

export interface ProductDTO {
  id?: number;
  name: string;
  imageUrl?: string;
  price: number;
  description?: string;
  categoryId: number;
}

const productDTOSchema = Joi.object({
  id: Joi.number().optional().messages({
    "number.base": "ID must be a number",
  }),
  name: Joi.string().required().messages({
    "string.empty": "Name is required",
    "string.base": "Name must be a string",
  }),
  imageUrl: Joi.string().optional().uri().messages({
    "string.base": "Image URL must be a string",
  }),
  price: Joi.number().required().min(0).messages({
    "number.empty": "Price is required",
    "number.base": "Price must be a number",
    "number.min": "Price must be greater than or equal to 0",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string",
  }),
  categoryId: Joi.number().required().min(1).messages({
    "number.empty": "Category ID is required",
    "number.base": "Category ID must be a number",
    "number.min": "Category ID must be greater than or equal to 1",
  }),
});
