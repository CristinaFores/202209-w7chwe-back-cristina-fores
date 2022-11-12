import "../../../loadEnvironment.js";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../dababase/models/User.js";

interface Credentials {
  username: string;
  password: string;
}

export const registerUser = async (
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const { username, password } = req.body as Credentials;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    password: hashedPassword,
  });

  res.status(201).json({ id: newUser._id, username });
};
