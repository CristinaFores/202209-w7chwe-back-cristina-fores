import express from "express";
import {
  loadUsers,
  loginUser,
  registerUser,
} from "../../controllers/users/users.js";
import { auth } from "../../middlewares/auth/auth.js";

// eslint-disable-next-line new-cap
const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/", auth, loadUsers);
export default usersRouter;
