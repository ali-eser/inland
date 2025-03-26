import express from "express";
import cors from "cors";

import authRouter from "./src/controllers/authRouter";
import userRouter from "./src/controllers/userRouter";
import noteRouter from "./src/controllers/noteRouter";
import loginRouter from "./src/controllers/loginRouter";

const app = express()

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);
app.use("/api/login", loginRouter);

export default app;
