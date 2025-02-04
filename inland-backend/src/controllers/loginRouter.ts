import loginService from '../services/loginService';
import { AuthenticationError } from '../../exceptions/AuthenticationError';
import express from "express";

const loginRouter: express.Router = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await loginService.login(username, password);

    res.cookie("token", user.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", user.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Logged in successfully", user: user.user, id: user.id });
  } catch (error: any) {
    if (error instanceof AuthenticationError) {
      res.status(400).json({ error: "Invalid username or password" });
    } else {
      res.status(500).json({ error: "An unspecified error occurred" });
    }
  }
});

loginRouter.post("/refresh" , async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ error: "No refresh token provided" });
  }

  try {
    const newAccessToken = await loginService.refresh(refreshToken);

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000
    });
  } catch (error: any) {
    console.error(error, error.message);
    throw error;
  }
});

export default loginRouter;
