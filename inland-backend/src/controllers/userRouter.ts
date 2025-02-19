import userService from "../services/userService";
import express from "express";
import { NotFoundError } from "../../exceptions/NotFoundError";

const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID. ID must be an integer." });
      return;
    }

    const user = await userService.fetchUser(id);
    res.status(201).json(user);
    return;
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
    return;
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { username, email, password, passwordConf } = req.body;

    if (username.length >= 15) {
      res.status(400).json({error: "Username cannot be longer than 15 characters"});
      return;
    }
    const userToAdd = await userService.addUser(username, email, password, passwordConf);
    res.status(201).json(userToAdd);
    return;
  } catch (error: any) {
    if (error.message.includes("provided username or email")) {
      res.status(400).json({ error: error.message });
      return;
    } else {
      res.status(500).json({ error: error.message });
      return;
    }
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID. ID must be an integer." });
      return;
    }
    await userService.removeUser(id);
    res.status(204).json({message: `User with ID ${id} removed successfully`})
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message });
    return;
  }
});

export default userRouter;
