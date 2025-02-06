import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "../utils/config";

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

const authStatus = async (accessToken: string) => {
  try {
    const decoded = jwt.verify(accessToken, SECRET as string ) as JwtPayload;
    return decoded;
  } catch (error: any) {
    throw error;
  }
}

export default { authStatus, refresh };