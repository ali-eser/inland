import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET } from "../utils/config";

const authStatus = async (accessToken: string) => {
  try {
    const decoded = jwt.verify(accessToken, SECRET as string ) as JwtPayload;
    return decoded;
  } catch (error: any) {
    throw error;
  }
}

export default { authStatus };