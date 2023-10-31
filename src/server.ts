import express from "express";
import cors from "cors";
import Knex from "knex";
import { knexConfig } from "./config/knexfile";
import Logging from "./common/Logging";

/* Declare libraries */
const router = express();
const db = Knex(knexConfig);

/** Middlewares **/
/* Express  */
router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

/* Connect to Database */
db.raw("SELECT 1")
  .then((result) => {
    Logging.info("Connected to MySQL successfully!");
  })
  .catch((err) => {
    Logging.error("Unable to connect");
  });

/* Define router */
