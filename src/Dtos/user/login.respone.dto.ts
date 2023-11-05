export interface LogInResponseDTO {
  status: string;
  token: string;
  timestamp?: Date;
  expireTime?: Date;
}
