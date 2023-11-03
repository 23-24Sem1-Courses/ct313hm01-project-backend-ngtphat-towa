import {
  InvalidParameterErrorResponse,
  MissingRequiredParameterErrorResponse,
} from "../common/api.error";
import { Role } from "../enums/role.enum";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
}

export function validateUser(user: User): void {
  if (!(user.email && user.password)) {
    throw new MissingRequiredParameterErrorResponse("email and password");
  }

  if (!user.firstName) {
    throw new InvalidParameterErrorResponse("firstName", user.firstName);
  }

  if (!user.lastName) {
    throw new InvalidParameterErrorResponse("lastName", user.lastName);
  }
}
