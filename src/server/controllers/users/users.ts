import "../../../loadEnvironment.js";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../../../dababase/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import type { Credentials } from "../../types/types.js";

export const registerUser = async (
  req: Request,
  res: Response,

  next: NextFunction
) => {
  const { username, password } = req.body as Credentials;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ id: newUser._id, username });
  } catch (error: unknown) {
    next(
      new CustomError((error as Error).message, "Something went wrong", 500)
    );
  }
};
