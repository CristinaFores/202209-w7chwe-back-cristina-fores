import "../../../loadEnvironment.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../dababase/models/User.js";
import CustomError from "../../../CustomError/CustomError.js";
import type { Credentials, CustomRequest } from "../../types/types.js";
import environment from "../../../loadEnvironment.js";
import type { NextFunction, Request, Response } from "express";

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

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body as Credentials;

  const user = await User.findOne({ username });

  if (!user) {
    next(new CustomError("Username not found", "Wrong credentials", 401));
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    next(new CustomError("Password is incorrect", "Wrong credentials", 401));
    return;
  }

  const tokenPayload = {
    id: user._id,
  };

  const token = jwt.sign(tokenPayload, environment.jwtSecret, {
    expiresIn: "1d",
  });

  res.status(200).json({ token });
};

export const loasUsers = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req;
  try {
    const users = await User.find({
      _id: { $ne: userId },
    }).select("-password");

    if (!users?.length) {
      res.status(404).json({ message: "No users found" });
      return;
    }

    res.status(200).json({ users });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      "Database doesn't work",
      500
    );
    next(customError);
  }
};
