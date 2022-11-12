import bcrypt from "bcrypt";
import type { NextFunction, Response, Request } from "express";
import CustomError from "../../../CustomError/CustomError.js";

import User from "../../../dababase/models/User.js";
import type { Credentials } from "../../types/types";
import { loginUser, registerUser } from "./users";

beforeEach(() => {
  jest.clearAllMocks();
});

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a register controller", () => {
  const register = {
    username: "cristina",
    password: "12345678910",
  };

  describe("When it receives username 'cristina' and password 1234567890", () => {
    test("Then it should invoke its method status with 201 and its method json with the received user id and the username", async () => {
      const expectedStatus = 201;

      const req: Partial<Request> = {
        body: register,
      };

      User.create = jest.fn().mockResolvedValueOnce(register);

      await registerUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });

    describe("When it receives incorrect username and password with 12345", () => {
      test("Then it should call next", async () => {
        const registerIncorrect: Credentials = {
          username: "cristina",
          password: "12345",
        };
        const req: Partial<Request> = {
          body: register,
        };
        User.create = jest.fn().mockRejectedValue(registerIncorrect);

        await registerUser(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalled();
      });
    });
  });
});

describe("Given a register loginUser", () => {
  const login = {
    username: "cristina",
    password: "12345678910",
  };

  describe("When it receives username 'cristina' and password 1234567890", () => {
    test("Then it should invoke its method status with 200 , to login a username 'cristina' and password 1234567890", async () => {
      const expectedStatus = 200;

      const req: Partial<Request> = {
        body: login,
      };
      User.findOne = jest.fn().mockResolvedValueOnce(login);
      bcrypt.compare = jest.fn().mockResolvedValueOnce(true);

      await loginUser(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalled();
    });

    describe("When it receives incorrect username and password with 12345", () => {
      test("Then it should call next", async () => {
        const req: Partial<Request> = {
          body: login,
        };

        User.findOne = jest.fn().mockResolvedValueOnce(login);
        const passwordError = new CustomError(
          "Password is incorrect",

          "Wrong credentials",
          401
        );

        bcrypt.compare = jest.fn().mockResolvedValueOnce(false);

        await loginUser(req as Request, res as Response, next as NextFunction);

        expect(next).toBeCalledWith(passwordError);

        expect(next).toHaveBeenCalled();
      });
    });

    describe("When it receives incorrect username and correct password with 12345", () => {
      test("Then it should call next", async () => {
        const req: Partial<Request> = {
          body: login,
        };

        User.findOne = jest.fn().mockResolvedValueOnce(false);

        await loginUser(req as Request, res as Response, next as NextFunction);

        expect(next).toBeCalled();
      });
    });
  });
});
