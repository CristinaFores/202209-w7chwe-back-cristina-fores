import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import usersRouter from "./routers/usersRouters/usersRouters.js";
import { generalError, notFoundError } from "./middlewares/errors.js";
import cors from "cors";

const app = express();

app.use(cors());

app.disable("x-powered-by");

app.use(morgan("dev"));
app.use(express.json());
app.use("/users", usersRouter);

app.use(notFoundError);
app.use(generalError);
export default app;
