import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthenticationTokenDTO } from "../Dtos/token/token.dto";
import { LogInDTO } from "../Dtos/user/login.dto";
import { RegisterDTO } from "../Dtos/user/register.dto";
import Logging from "../common/Logging";
import {
  AuthTokenNotPresentError,
  AuthTokenNotValidError,
  EmailAlreadyExistsError,
  EmailDoesNotExistsError,
  UnauthorizedAccessErrorResponse,
  WrongPasswordError,
} from "../common/api.error";
import config from "../config/config";
import { Role } from "../enums/role.enum";
import {
  AuthenticationToken,
  mapAuthenticationTokenDTOToModel,
} from "../models/token.model";
import { User } from "../models/user.model";
import TokenRepository from "../repositories/token.repository";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs";

export class AuthenticationService {
  private tokenRepo = TokenRepository;
  private userRepo = UserRepository;
  constructor() {}

  async saveToken(dto: AuthenticationTokenDTO) {
    const saved = await this.tokenRepo.saveToken(dto);
    return saved;
  }

  async getTokenByUser(user: User): Promise<AuthenticationToken | null> {
    const tokenDTO = await this.tokenRepo.getTokenByUser(user.id!);
    if (tokenDTO === null) {
      return null;
    }
    const model = mapAuthenticationTokenDTOToModel(tokenDTO, user);

    return model;
  }

  async getUserByToken(token: string): Promise<User | null> {
    // Get tokenDTO
    const authToken = await this.tokenRepo.findByToken(token);
    // validate dto
    if (authToken === null) {
      return null;
    }
    // Get user data
    const user = this.userRepo.getById(authToken.userId!);

    return user;
  }

  /** Register */
  async register(dto: RegisterDTO): Promise<AuthenticationTokenDTO | null> {
    // validate email exist
    const existing = await this.userRepo.getByName(dto.email);
    if (existing !== null) throw new EmailAlreadyExistsError();

    // Hashed password
    const hashPassword = await this.hashed(dto.password);

    // Create user in our database
    const user: User = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      role: Role.user,
      password: hashPassword,
      createdDate: new Date(),
    };
    const payload = await this.userRepo.create(user);

    const authToken = await this.generateToken(payload);

    return authToken;
  }

  /** Login */
  async login(dto: LogInDTO): Promise<AuthenticationToken | null> {
    // validate email exist
    const existing = await this.userRepo.getByName(dto.email);
    if (existing === null) throw new EmailDoesNotExistsError();

    // Check if password is correct
    const validPass = await bcrypt.compare(dto.password, existing.password!);
    if (!validPass) throw new WrongPasswordError();

    //TODO: If token in still valid in date and time
    let authToken = await this.tokenRepo.getTokenByUser(existing.id!);

    // generate token
    const newToken = (await this.generateToken(existing))!;
    return mapAuthenticationTokenDTOToModel(newToken, existing);
  }

  private async hashed(pwd: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(pwd, salt);

      return hashPassword;
    } catch (error) {
      throw new Error("Failed to hash the password. Please try again.");
    }
  }

  private async generateToken(
    user: User
  ): Promise<AuthenticationTokenDTO | null> {
    try {
      // Create jwt config
      var timeSinceEpoch = new Date().getTime();
      var expirationTime =
        timeSinceEpoch + Number(config.server.token.expireTime) * 10000;
      var expirationTimeInSeconds = Math.floor(expirationTime / 1000);

      // generate token for user
      const token: string = jwt.sign(
        {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: Number(Role.user),
          createdDate: user.createdDate,
        },
        config.server.token.secret,
        {
          issuer: config.server.token.issuer,
          algorithm: "HS256",
          expiresIn: expirationTimeInSeconds,
        }
      );

      // save token in database
      const dto: AuthenticationTokenDTO = {
        token: token,
        createdDate: user.createdDate!,
        expiredTime: new Date(expirationTime),
        userId: user.id,
      };

      const data = await this.tokenRepo.saveToken(dto);
      // success in creating
      dto.id = data.id;
      return dto;
    } catch (error) {
      throw new Error("Failed to generate the token. Please try again.");
    }
  }
  /** Validate */
  async validate(token: string): Promise<User | null> {
    try {
      // validate with jwt
      const authToken = this.tokenRepo.findByToken(token);
      if (authToken === null) throw new AuthTokenNotPresentError();

      const payload = jwt.verify(
        token,
        config.server.token.secret
      ) as JwtPayload;

      const user = await this.userRepo.getById(payload.id);
      if (user === null) {
        throw new UnauthorizedAccessErrorResponse();
      }

      return user;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AuthTokenNotValidError();
      }
      throw error;
    }
  }
}
