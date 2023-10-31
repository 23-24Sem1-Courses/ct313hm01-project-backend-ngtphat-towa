// Update with your config settings.
import { DbConfig } from "./src/config/config";
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: DbConfig.HOST,
      port: DbConfig.PORT,
      user: DbConfig.USER,
      password: DbConfig.PASSWORD,
      database: DbConfig.DATABASE,
    },
  },
};
