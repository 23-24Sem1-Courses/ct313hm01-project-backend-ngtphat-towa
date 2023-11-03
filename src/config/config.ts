import dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_DATABASE = process.env.DB_DATABASE || "ecommercedb";
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "root";
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

const MYSQL = {
  host: DB_HOST,
  port: DB_PORT,
  database: DB_DATABASE,

  user: DB_USERNAME,
  password: DB_PASSWORD,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || "coolIssuer";
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || "superencryptedsecret";

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT ?? 3000,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
  },
};

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const KNEX: Knex.Config = {
  client: "mysql",
  connection: {
    host: MYSQL.host,
    port: MYSQL.port,
    user: MYSQL.user,
    password: MYSQL.password,
    database: MYSQL.database,
  },
};

const config = {
  db: MYSQL,
  server: SERVER,
  knex: KNEX,
};

export default config;
