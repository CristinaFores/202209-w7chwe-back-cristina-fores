import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import usersRouter from "./routes/users/index.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", usersRouter);

export default app;
