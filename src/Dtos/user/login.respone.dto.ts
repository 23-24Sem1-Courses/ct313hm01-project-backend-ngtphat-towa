export interface LogInResponseDTO {
  status: string;
  token: string;
  timestamp?: Date;
  expireTime?: Date;
}


export function validateLogInResponseDto(
  logInResponseDTO: LogInResponseDTO
): void {
  if (!logInResponseDTO.status) {
    throw new Error("The status property is required.");
  }

  if (!logInResponseDTO.token) {
    throw new Error("The token property is required.");
  }
}
