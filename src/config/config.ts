import dotenv from "dotenv";

dotenv.config();

export const DbConfig = {
  HOST: process.env.DB_HOST || "",
  USER: process.env.DB_USERNAME || "",
  PASSWORD: process.env.DB_PASSWORD ?? "",

  PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  DATABASE: process.env.DB_DATABASE,
};

export const ServerConfig = {
  port: process.env.PORT ?? 3000,
};
