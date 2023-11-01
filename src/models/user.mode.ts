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
  if (!user.firstName) {
    throw new Error("The firstName property is required.");
  }

  if (!user.lastName) {
    throw new Error("The lastName property is required.");
  }

  if (!user.email) {
    throw new Error("The email property is required.");
  }

  if (!user.role) {
    throw new Error("The role property is required.");
  }

  if (!user.password) {
    throw new Error("The password property is required.");
  }
}
