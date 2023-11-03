import { Role } from "../../enums/role.enum";

export interface UpdateUserDTO {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
}

export function validateUpdateUserDTO(updateUserDTO: UpdateUserDTO): void {
  if (!updateUserDTO.firstName) {
    throw new Error("The firstName property is required.");
  }

  if (!updateUserDTO.lastName) {
    throw new Error("The lastName property is required.");
  }

  if (!updateUserDTO.role) {
    throw new Error("The role property is required.");
  }
}
