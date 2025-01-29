import userService from "../services/userService";
import express from "express";

const userRouter = express.Router();

userRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID. ID must be an integer." });
    }

    const user = userService.fetchUser(id);

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({ error: "User with specified ID not found"});
    }
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username.length >= 15) {
      res.status(400).json({error: "Username cannot be longer than 15 characters"})
    }
    const userToAdd = await userService.addUser(username, email, password);
    res.status(201).json(userToAdd);
  } catch (error: any) {
    if (error.message.includes("provided username or email")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: "Invalid user ID. ID must be an integer." });
    }
    await userService.removeUser(id);
    res.status(204).json({message: `User with ID ${id} removed successfully`})
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default userRouter;