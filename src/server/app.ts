import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import usersRouter from "./routes/users/index.js";
import { generalError, notFoundError } from "./middlewares/errors.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);
export default app;
