import express from "express";
import cors from "cors";
import userRouter from "./src/controllers/userRouter";
import noteRouter from "./src/controllers/noteRouter";
import loginRouter from "./src/controllers/loginRouter";

const app = express()

app.use(express.json());
app.use(cors({
  credentials: true
}));
app.use("/api/user", userRouter);
app.use("/api/note", noteRouter);
app.use("/api/login", loginRouter);

export default app;
