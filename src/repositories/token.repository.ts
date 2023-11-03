import knex from "knex";
import config from "../config/config";
import { AuthenticationToken } from "../models/authenticationToken.model";
import { User } from "../models/user.model";
import { UserRepository } from "./user.repository";
import { AuthenticationTokenDTO } from "../Dtos/token/token.dto";

const TableName = "tokens";
export class TokenRepository {
  private db = knex(config.knex);
  private userRepo: UserRepository;
  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async findTokenByUser(id: number): Promise<AuthenticationToken | null> {
    const authToken = await this.db<AuthenticationToken>(TableName)
      .where("userId", id)
      .first();

    if (authToken) {
      const user = (await this.userRepo.getById(id))!;
      authToken.user = user;
    }

    return authToken ?? null;
  }

  async findTokenByToken(token: string): Promise<AuthenticationToken | null> {
    const authToken = await this.db<AuthenticationToken>(TableName)
      .where("token", token)
      .first();

    if (authToken) {
      const id = authToken.id;
      const user = (await this.userRepo.getById(id))!;
      authToken.user = user;
    }

    return authToken ?? null;
  }
  async saveToken(dto: AuthenticationTokenDTO) {
    const token: AuthenticationToken =
      await this.db<AuthenticationToken>(TableName).insert(dto);

    return token;
  }
}
