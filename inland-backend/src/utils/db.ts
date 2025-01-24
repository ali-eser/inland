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

console.log(DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USER);

console.log("connecting to the database");

const sequelize = new Sequelize(
  `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`, {
    dialect: "postgres",
    logging: console.log,
    models: [User, Note]
  }
);

console.log("Database models added: ", sequelize.models);

Note.belongsTo(User);
User.hasMany(Note);

Note.sync({alter: true}).then(r => console.log(r));
User.sync({alter: true}).then(r => console.log(r));

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`Connected to DB: ${DATABASE_NAME}`);
  } catch(error) {
    console.error("An error occured: ",error);
    process.exit(1)
  }
};
