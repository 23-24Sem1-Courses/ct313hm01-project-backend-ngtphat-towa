import express from "express";
import cors from "cors";
import Knex from "knex";
import http from "http";
import config from "./config/config";
import Logging from "./common/Logging";
import Routers from "../src/routes/router";

import {
  handleError,
  handleStripeError,
  methodNotAllowed,
  resourceNotFound,
} from "./controllers/errors.controller";

/* Declare libraries */
const router = express();
const db = Knex(config.knex);
const PORT = config.server.port;

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
    // Log the request body and parameters
    Logging.info_data("Request Body:", req.body);
    Logging.info_data("Request Parameters:", req.params);
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

  router.use("/api", Routers);

  /** Error Handling */
  //  Payment
  router.use(handleStripeError);

  // Apply the "Method Not Allowed" middleware
  router.use(methodNotAllowed);

  // Apply the "Resource Not Found" middleware
  router.use(resourceNotFound);

  // Apply the error handling middleware
  router.use(handleError);

  // Server listenning
  http
    .createServer(router)
    .listen(PORT, () => Logging.info(`Server is running on port ${PORT}`));
};
