import express from "express";
import { registerUser } from "../../controllers/users/index.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

export default usersRouter;
