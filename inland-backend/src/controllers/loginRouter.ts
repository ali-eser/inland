import loginService from '../services/loginService';
import { AuthenticationError } from '../../exceptions/AuthenticationError';
import express from "express";

const loginRouter: express.Router = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await loginService.login(username, password);

    res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      user: user.user,
      id: user.id,
      encryptedMasterKey: user.encryptedMasterKey,
      keyDerivationSalt: user.keyDerivationSalt,
      status: user.status
    });
    return;
  } catch (error: any) {
    if (error instanceof AuthenticationError) {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: "An unspecified error occurred" });
      return;
    }
  }
});

export default loginRouter;
