import Joi from "joi";

export interface SessionDTO {
  sessionId: string;
}
export const sessionSchema = Joi.object({
  sessionId: Joi.string().required().messages({
    "string.base": "The id should be a string value.",
    "string.empty": "Session Id  cannot be an empty field",
    "any.required": "Session Id is a required field",
  }),
}).options({ stripUnknown: true });
