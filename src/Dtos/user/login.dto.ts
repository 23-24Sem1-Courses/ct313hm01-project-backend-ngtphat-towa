import { MissingRequiredParameterErrorResponse } from "../../common/api.error";

export interface LogInDTO {
  email: string;
  password: string;
}
