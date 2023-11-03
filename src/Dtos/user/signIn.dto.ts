import { MissingRequiredParameterErrorResponse } from "../../common/api.error";

export interface SignInDTO {
  email: string;
  password: string;
}

export function validateSignInDto(signInDto: SignInDTO): void {
  if (!signInDto.email) {
    throw new MissingRequiredParameterErrorResponse("email");
  }

  if (!signInDto.password) {
    throw new MissingRequiredParameterErrorResponse("password");
  }
}
