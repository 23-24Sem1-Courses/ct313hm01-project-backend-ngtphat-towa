import { AuthenticationTokenDTO } from "../Dtos/token/token.dto";
import { User } from "./user.model";

export interface AuthenticationToken {
  id: number;
  token: string;
  createdDate: Date;
  expiredTime?: Date;
  user?: User;
}

export function mapAuthenticationTokenDTOToModel(
  dto: AuthenticationTokenDTO | null,
  user?: User
): AuthenticationToken | null {
  return dto !== null
    ? {
        id: dto.id!,
        token: dto.token,
        createdDate: dto.createdDate,
        expiredTime: dto.expiredTime,
        user: user,
      }
    : null;
}

export function validateAuthenticationToken(
  authenticationToken: AuthenticationToken
): void {
  if (!authenticationToken.token) {
    throw new Error("The token property is required.");
  }

  if (!authenticationToken.createdDate) {
    throw new Error("The createdDate property is required.");
  }

  if (!authenticationToken.user) {
    throw new Error("The user property is required.");
  }
}
