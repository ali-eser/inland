import authService from "../services/authService";
import express from "express";

const authRouter = express.Router();

authRouter.get("/status", async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    res.status(401).json({ error: "Not logged in" });
  }
  try {
    const decoded = authService.authStatus(accessToken);
    res.status(201).json({ user: accessToken.username, id: accessToken.id });
  } catch (error: any) {
    res.status(401).json({ error: error.message })
  }
});

export default authRouter;
