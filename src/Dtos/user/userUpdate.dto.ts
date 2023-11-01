import { Role } from "../../enums/role.enum";

export interface UserUpdateDTO {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
}

export function validateUserUpdateDto(userUpdateDto: UserUpdateDTO): void {
  if (!userUpdateDto.firstName) {
    throw new Error("The firstName property is required.");
  }

  if (!userUpdateDto.lastName) {
    throw new Error("The lastName property is required.");
  }

  if (!userUpdateDto.role) {
    throw new Error("The role property is required.");
  }
}
