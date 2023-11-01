import { Role } from "../../enums/role.enum";

export interface UserCreateDTO {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  password: string;
}

export function validateUserCreateDto(userCreateDto: UserCreateDTO): void {
  if (!userCreateDto.firstName) {
    throw new Error("The firstName property is required.");
  }

  if (!userCreateDto.lastName) {
    throw new Error("The lastName property is required.");
  }

  if (!userCreateDto.email) {
    throw new Error("The email property is required.");
  }

  if (!userCreateDto.role) {
    throw new Error("The role property is required.");
  }

  if (!userCreateDto.password) {
    throw new Error("The password property is required.");
  }
}