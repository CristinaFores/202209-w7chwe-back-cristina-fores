import express from "express";
import {
  loasUsers,
  loginUser,
  registerUser,
} from "../../controllers/users/users.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/", loasUsers);
export default usersRouter;
