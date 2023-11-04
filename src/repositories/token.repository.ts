import knex from "knex";
import { AuthenticationTokenDTO } from "../Dtos/token/token.dto";
import config from "../config/config";

const TableName = "tokens";
class TokenRepository {
  private db = knex(config.knex);
  constructor() {}

  async getTokenByUser(id: number): Promise<AuthenticationTokenDTO | null> {
    const authToken = await this.db<AuthenticationTokenDTO>(TableName)
      .where("userId", id)
      .first();
    return authToken ?? null;
  }

  async findByToken(token: string): Promise<AuthenticationTokenDTO | null> {
    const authToken = await this.db<AuthenticationTokenDTO>(TableName)
      .where("token", token)
      .first();

    return authToken ?? null;
  }
  async saveToken(dto: AuthenticationTokenDTO) {
    const token: AuthenticationTokenDTO =
      await this.db<AuthenticationTokenDTO>(TableName).insert(dto);

    return token;
  }
}

export default new TokenRepository();
