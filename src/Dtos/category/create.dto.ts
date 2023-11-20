import Joi from "joi";

export interface CreateCategoryDTO {
  name: string;
  description: string;
  imageUrl?: string;
}

export const createCategorySchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "name must be a string",
    "string.empty": "name cannot be an empty field",
    "any.required": "name is a required field",
  }),
  description: Joi.string().required().messages({
    "string.base": "description must be a string",
    "string.empty": "description cannot be an empty field",
    "any.required": "name is a required field",
  }),
  imageUrl: Joi.string().uri().optional().messages({
    "string.base": "imageUrl must be a string",
    "string.uri": "imageUrl must be a valid URI",
  }),
}).options({ stripUnknown: true });
