import { RegisterDTO } from "../Dtos/user/register.dto";
import { LogInDTO } from "../Dtos/user/login.dto";
import { LogInResponseDTO } from "../Dtos/user/login.respone.dto";
import { User } from "../models/user.model";
import UserRepository from "../repositories/user.repository";
import { AuthenticationService } from "./authenticate.service";
import { AuthenticationTokenDTO } from "../Dtos/token/token.dto";
import ApiError, {
  AuthTokenNotValidError,
  EmailAlreadyExistsError,
  EmailDoesNotExistsError,
  WrongPasswordError,
} from "../common/api.error";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, decode } from "jsonwebtoken";
import Logging from "../common/Logging";
import { Role } from "../enums/role.enum";
import config from "../config/config";
import {
  AuthenticationToken,
  mapAuthenticationTokenDTOToModel,
} from "../models/token.model";
import { string } from "joi";

export class UserService {
  private userRepository = UserRepository;
  private authenticationService: AuthenticationService;
  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = new AuthenticationService();
  }
}
