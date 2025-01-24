import { config } from "dotenv";

config();

export const DATABASE_NAME = process.env.DB_NAME;
export const DATABASE_PASSWORD = process.env.DB_PASSWORD;
export const DATABASE_HOST = process.env.DB_HOST;
export const DATABASE_USER = process.env.DB_USER;
export const DATABASE_PORT = process.env.DB_PORT;

export const PORT = process.env.PORT;
