import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";

import { SECRET } from "../utils/config";

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
    this.message = message;
  };
}

const login = async (username: string, password: string) => {
  try {
    const user = await User.findOne({ where: { username: username } });

    const isCorrect = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && isCorrect)) {
      throw new AuthenticationError("Invalid Credentials");
    }

    const userToLogin = {
      username: user.username,
      id: user.id
    };

    const token = jwt.sign(userToLogin, SECRET || "default_secret_key");

    return { token, user: username, id: user.id };
  } catch (error) {
    console.error(error);
    throw error;
  }

};

export default { login };
