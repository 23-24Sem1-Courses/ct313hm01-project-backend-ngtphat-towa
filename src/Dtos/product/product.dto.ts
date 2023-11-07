import Joi from "joi";

export interface ProductDTO {
  id?: number;
  name: string;
  imageUrl?: string;
  price: number;
  description?: string;
  categoryId: number;
}

export const getProductSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "The name should be a text string. Please check the input.",
    "string.empty":
      "It seems like the name field is empty. Please provide a product name.",
    "any.required": "The name is a required field. Don't forget to include it.",
  }),
  imageUrl: Joi.string().optional().uri().messages({
    "string.uri": "The imageUrl should be a valid URL. Please check the input.",
  }),
  price: Joi.number().required().messages({
    "number.base":
      "The price should be a numerical value. Please check the input.",
    "number.empty":
      "It seems like the price field is empty. Please provide a product price.",
    "any.required":
      "The price is a required field. Don't forget to include it.",
  }),
  description: Joi.string().optional().messages({
    "string.base":
      "The description should be a text string. Please check the input.",
  }),
  categoryId: Joi.number().required().messages({
    "number.base":
      "The categoryId should be a numerical value. Please check the input.",
    "number.empty":
      "It seems like the categoryId field is empty. Please provide a category ID.",
    "any.required":
      "The categoryId is a required field. Don't forget to include it.",
  }),
});
