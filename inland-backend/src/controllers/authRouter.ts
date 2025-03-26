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
    const decoded = await authService.authStatus(accessToken);
    res.status(200).json({ user: decoded.username, id: decoded.id });
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

    res.status(200).json({ message: "Access token refreshed" });
    return;
  } catch (error: any) {
    res.status(401).json({ error: error.message });
    return;
  }
});

export default authRouter;
