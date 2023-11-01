export interface SignInDTO {
  email: string;
  password: string;
}

export function validateSignInDto(signInDto: SignInDTO): void {
  if (!signInDto.email) {
    throw new Error("The email property is required.");
  }

  if (!signInDto.password) {
    throw new Error("The password property is required.");
  }
}
