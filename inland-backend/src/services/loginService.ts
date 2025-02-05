import jwt, { JwtPayload } from "jsonwebtoken";
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
      throw new AuthenticationError("Invalid username or password");
    }

    const userToLogin = {
      username: user.username,
      id: user.id
    };

    const accessToken = jwt.sign(userToLogin, SECRET as string, {
      expiresIn: "1h"
    });

    const refreshToken = jwt.sign(userToLogin, SECRET as string, {
      expiresIn: "7d"
    });

    return { accessToken, refreshToken, user: username, id: user.id };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const refresh = async (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, SECRET as string) as JwtPayload;

    const newAccessToken = jwt.sign({ user: decoded.user, id: decoded.id }, SECRET as string, {
      expiresIn: "1h"
    });

    return newAccessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default { login, refresh };
