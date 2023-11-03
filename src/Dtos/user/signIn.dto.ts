import { MissingRequiredParameterErrorResponse } from "../../common/api.error";

export interface SignInDTO {
  email: string;
  password: string;
}

