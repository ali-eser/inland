import authService from "../services/authService";
import express from "express";

const authRouter = express.Router();

authRouter.get("/status", async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }
  try {
    const decoded = authService.authStatus(accessToken);
    res.status(201).json({ user: accessToken.username, id: accessToken.id });
    return;
  } catch (error: any) {
    res.status(401).json({ error: error.message });
    return;
  }
});

authRouter.post("/refresh" , async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ error: "No refresh token provided" });
    return;
  }

  try {
    const newAccessToken = await authService.refresh(refreshToken);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000
    });
    return;
  } catch (error: any) {
    console.error(error, error.message);
    throw error;
  }
});

export default authRouter;
