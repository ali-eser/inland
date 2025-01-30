import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import { AuthenticationError } from "../../exceptions/AuthenticationError";

import { SECRET } from "../utils/config";

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
