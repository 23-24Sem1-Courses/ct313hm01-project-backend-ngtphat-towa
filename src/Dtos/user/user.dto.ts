import Joi from "joi";
import { Role } from "../../enums/role.enum";
export interface UserDTO {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: Role;
  password?: string;
  createdDate?: Date;
}
export const userSchema = Joi.object({
  id: Joi.number().optional().messages({
    "number.base":
      "The id should be a numerical value. Please check the input.",
  }),
  firstName: Joi.string().optional().messages({
    "string.base":
      "The first name should be a text string. Please check the input.",
  }),
  lastName: Joi.string().optional().messages({
    "string.base":
      "The last name should be a text string. Please check the input.",
  }),
  email: Joi.string().email().optional().messages({
    "string.email":
      "The email should be a valid email address. Please check the input.",
  }),
  role: Joi.alternatives().try(
    Joi.number()
      .valid(...Object.values(Role))
      .messages({
        "any.only":
          "The role should be a valid enum number. Please check the input.",
      }),
    Joi.string()
      .valid(...Object.keys(Role), ...Object.values(Role).map(String))
      .messages({
        "any.only":
          "The role should be a valid enum key. Please check the input.",
      })
  ),
  password: Joi.string().optional().messages({
    "string.base":
      "The password should be a text string. Please check the input.",
  }),
  createdDate: Joi.date().optional().messages({
    "date.base":
      "The created date should be a valid date. Please check the input.",
  }),
}).options({ stripUnknown: true });
