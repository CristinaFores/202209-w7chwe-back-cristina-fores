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
  const expectUserLogin: Credentials = {
    username: "cris",
    password: await bcrypt.hash("1234567890", 10),
  };

  await User.create(expectUserLogin);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});

describe("Given POST/ login enpoint", () => {
  describe("When it recieves a requestthe username: 'Cristina' '0123456789", () => {
    test("Then its should response status code 201 and the user", async () => {
      const expectStatus = 200;
      const expectUserLogin: Credentials = {
        username: "cris",
        password: "1234567890",
      };

      await request(app)
        .post("/users/login")
        .send(expectUserLogin)
        .expect(expectStatus);
    });
  });
});

describe("Given a POST/ register enpoint", () => {
  describe("When it's receives a request with the username: 'Cristina' '0123456789'", () => {
    test("Then its should response status code 201 and the user", async () => {
      const expectSatus = 201;
      const expectUserRegister: Credentials = {
        username: "Cristina",
        password: "0123456789",
      };

      await request(app)
        .post("/users/register")
        .send(expectUserRegister)
        .expect(expectSatus);
    });
  });
});
