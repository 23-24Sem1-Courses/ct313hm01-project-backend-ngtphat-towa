import Joi from "joi";

export interface ValidateTokenDTO {
  token: string;
}

export const validateTokenSchema = Joi.object({
  token: Joi.string().required().min(10).max(512).messages({
    "string.base": "Token must be a string",
    "string.empty": "Token must not be empty",
    "string.min": "Token must be at least 10 characters long",
    "string.max": "Token must be at most 512 characters long",
  }),
});
