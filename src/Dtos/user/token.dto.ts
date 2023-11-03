export interface AuthenticationTokenDTO {
  id: number;
  token: string;
  createdDate: Date;
  expiredTime: Date;
  userId: number;
}
