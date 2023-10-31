import express from "express";
import cors from "cors";
import Knex from "knex";
import http from "http";
import { knexConfig } from "./config/knexfile";
import { ServerConfig } from "./config/config";
import Logging from "./common/Logging";

/* Declare libraries */
const router = express();
const db = Knex(knexConfig);
const PORT = ServerConfig.port;

/** Middlewares **/
/* Express  */
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/* Connect to Database */
db.raw("SELECT 1")
  .then((result) => {
    Logging.info("Connected to MySQL successfully!");
    StartServer();
  })
  .catch((err) => {
    Logging.error("Unable to connect");
    Logging.error(err);
  });

/* Start server */
const StartServer = () => {
  /** Log the request */
  router.use((req, res, next) => {
    /** Log the req */
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  /** Heath check */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "Run ok, mate!" })
  );

  /** Routes  */

  /** Default  */
  router.get("/", (req, res, next) => {
    res.json({ message: "Welcome to ecomerce API." });
  });

  /** Error Handling */
  router.use((req, res, next) => {
    const err = new Error("not found");

    Logging.error(err);

    return res.status(404).json({ message: err.message });
  });

  // Server listenning
  http
    .createServer(router)
    .listen(PORT, () => Logging.info(`Server is running on port ${PORT}`));
};

/* Define router */
