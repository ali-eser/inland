import loginService from '../services/loginService';
import { AuthenticationError } from '../../exceptions/AuthenticationError';
import express from "express";

const loginRouter: express.Router = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await loginService.login(username, password);
    res.status(200).json(user);
  } catch (error: any) {
    if (error instanceof AuthenticationError) {
      res.status(400).json({ Error: "Invalid Credentials" });
    } else {
      res.status(500).json({ Error: error.message });
    }
  }
});

export default loginRouter;
