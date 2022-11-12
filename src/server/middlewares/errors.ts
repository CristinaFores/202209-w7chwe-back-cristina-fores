import "../../loadEnvironment.js";

import type { NextFunction, Request, Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(
    "Endpoint not found",
    "Endpoint not found",
    404
  );
  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  const statusCode = error.statusCode ?? 500;
  const publicMessage = error.publicMessage || "Core meltdown";

  res.status(statusCode).json({ error: publicMessage });
};
