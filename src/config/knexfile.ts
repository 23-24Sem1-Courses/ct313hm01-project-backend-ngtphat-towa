// Update with your config settings.
import { DbConfig } from "./config";
import { Knex } from "knex";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const knexConfig: Knex.Config = {
  client: "mysql",
  connection: {
    host: DbConfig.HOST,
    port: DbConfig.PORT,
    user: DbConfig.USER,
    password: DbConfig.PASSWORD,
    database: DbConfig.DATABASE,
  },
};
