export interface SignInResponseDTO {
  status: string;
  token: string;
  timestamp?: Date;
}

export function validateSignInResponseDto(
  signInResponseDto: SignInResponseDTO
): void {
  if (!signInResponseDto.status) {
    throw new Error("The status property is required.");
  }

  if (!signInResponseDto.token) {
    throw new Error("The token property is required.");
  }
}
