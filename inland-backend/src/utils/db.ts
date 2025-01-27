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

console.log("Connecting to the DB");

const sequelize = new Sequelize(
  `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, {
    dialect: "postgres",
    logging: console.log,
    models: [User, Note]
  }
);

Note.belongsTo(User);
User.hasMany(Note);

Note.sync({alter: true});
User.sync({alter: true});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to DB: ${DATABASE_NAME}`);
  } catch(error) {
    console.error("An error occured: ",error);
    process.exit(1)
  }
};
