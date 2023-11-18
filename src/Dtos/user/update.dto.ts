import Joi from "joi";
import { Role } from "../../enums/role.enum";

export interface UpdateUserDTO {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
}
export const updateUserSchema = Joi.object({
  id: Joi.number().optional().messages({
    "number.base": "ID must be a number",
  }),
  firstName: Joi.string().max(225).required().messages({
    "string.empty": "First name must not be empty",
    "string.max": "First name must be no more than 225 characters long",
  }),
  lastName: Joi.string().max(225).required().messages({
    "string.empty": "Last name must not be empty",
    "string.max": "Last name must be no more than 225 characters long",
  }),
  role: Joi.number().required().messages({
    "Role.required": "Role is required",
  }),
}).options({ stripUnknown: true });
