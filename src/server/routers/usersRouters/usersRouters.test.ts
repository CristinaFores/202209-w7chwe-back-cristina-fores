import "../../../loadEnvironment";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDb from "../../../dababase";
import User from "../../../dababase/models/User";
import type { Credentials } from "../../types/types";
import request from "supertest";
import app from "../../app";
import bcrypt from "bcrypt";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDb(server.getUri());
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

const expectUser: Credentials = {
  username: "Cristina",
  password: "0123456789",
};

describe("Given a POST/ register enpoint", () => {
  describe("When it's receives a request with the username: 'Cristina' '0123456789'", () => {
    test("Then its should response status code 201 and the user", async () => {
      const expectSatus = 201;

      const response = await request(app)
        .post("/users/register")
        .send(expectUser)
        .expect(expectSatus);
      expect(response.body).toHaveProperty("username");
    });
  });

  describe("When it receives a request with the username: 'Cristina' '0123456789'and this username exists in the database ", () => {
    test("Then it should respond with a response status 500, and the message 'Something went wrong'", async () => {
      const expectedStatus = 500;

      await User.create(expectUser);

      const response = await request(app)
        .post("/users/register/")
        .send(expectUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", "Something went wrong");
    });
  });
});

describe("Given POST/ login enpoint", () => {
  const registerctUser: Credentials = {
    username: "Cristina",
    password: "0123456789",
  };

  describe("When it recieves a requestthe username: 'Cristina' '0123456789", () => {
    test("Then its should response status code 200 and the user", async () => {
      const expectStatus = 200;
      const hashedPassword = await bcrypt.hash(registerctUser.password, 10);

      await User.create({
        username: registerctUser.username,
        password: hashedPassword,
      });

      const response = await request(app)
        .post("/users/login")
        .send(registerctUser)
        .expect(expectStatus);

      expect(response.body).toHaveProperty("token");
    });
  });

  describe("When it recieves a requestthe username: 'Cristina' '0123456789 ", () => {
    test("Then it should respond with a response status 401, and the message 'Wrong credentials'", async () => {
      const expectedStatus = 401;

      const response = await request(app)
        .post("/users/login/")
        .send(registerctUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("error", "Wrong credentials");
    });
  });
});
