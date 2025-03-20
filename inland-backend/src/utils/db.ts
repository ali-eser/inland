import { Sequelize } from "sequelize-typescript";
import Note from "../models/note";
import User from "../models/user";

import {
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PORT
} from "./config";

const sequelize = new Sequelize(
  `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, {
    dialect: "postgres",
    logging: false,
    models: [User, Note]
  }
);

Note.sync({alter: true});
User.sync({alter: true});

export const connectToDB = async () => {
  try {
    console.log("Connecting to DB");
    await sequelize.authenticate();
    console.log(`Connected to DB: ${DATABASE_NAME}`);
  } catch(err) {
    console.error("DB connection error: ",err);
    process.exit(1);
  }
};
