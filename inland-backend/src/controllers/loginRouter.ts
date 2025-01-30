import loginService from '../services/loginService';
import { AuthenticationError } from "../services/loginService";
import express from "express";

const loginRouter: express.Router = express.Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)

  try {
    const user = await loginService.login(username, password);
    res.status(200).json(user);
  } catch (e) {
    if (e instanceof AuthenticationError) {
      res.status(400).json({ Error: "Invalid Credentials" });
    } else {
      res.status(500).json({ Error: e });
    }
  }
})

export default loginRouter;
