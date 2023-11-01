export interface SignupDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export function validateSignupDTO(signupDto: SignupDTO): void {
  if (!signupDto.firstName) {
    throw new Error("The firstName property is required.");
  }

  if (!signupDto.lastName) {
    throw new Error("The lastName property is required.");
  }

  if (!signupDto.email) {
    throw new Error("The email property is required.");
  }

  if (!signupDto.password) {
    throw new Error("The password property is required.");
  }
}
