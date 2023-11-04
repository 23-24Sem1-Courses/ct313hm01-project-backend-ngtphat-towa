import Joi from "joi";
import { Role } from "../../enums/role.enum";

export interface UpdateUserDTO {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
}
export const createUserSchema = Joi.object({
  firstName: Joi.string().max(225).required().messages({
    "string.empty": "First name must not be empty",
    "string.max": "First name must be no more than 225 characters long",
  }),
  lastName: Joi.string().max(225).required().messages({
    "string.empty": "Last name must not be empty",
    "string.max": "Last name must be no more than 225 characters long",
  }),
  email: Joi.string().min(6).max(225).required().email().messages({
    "string.empty": "Email address must not be empty",
    "string.min": "Email address must be at least 6 characters long",
    "string.max": "Email address must be no more than 225 characters long",
    "string.email": "Email address is not valid",
  }),
  role: Joi.number().required().messages({
    "Role.required": "Role is required",
  }),
  password: Joi.string()
    .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$/)
    .required()
    .messages({
      "string.empty": "Password must not be empty",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      "string.min": "Password must be at least 6 characters long",
      "string.max": "Password must be no more than 20 characters long",
    }),
});
