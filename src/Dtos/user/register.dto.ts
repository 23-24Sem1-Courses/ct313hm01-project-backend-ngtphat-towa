export interface RegisterDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function validateSignupDTO(registerDto: RegisterDTO): void {
  if (!registerDto.firstName) {
    throw new Error("The firstName property is required.");
  }

  if (!registerDto.lastName) {
    throw new Error("The lastName property is required.");
  }

  if (!registerDto.email) {
    throw new Error("The email property is required.");
  }

  if (!registerDto.password) {
    throw new Error("The password property is required.");
  }
}
