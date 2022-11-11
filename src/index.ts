import "./loadEnvironment.js";
import debugCreator from "debug";
import environment from "./loadEnvironment.js";
import startServer from "./server/startServer.js";
import app from "./server/app.js";
import chalk from "chalk";
import { connectDb } from "./dababase/index.js";

const debug = debugCreator("items:server");

const { port, mongoDbUrl } = environment;

try {
  await startServer(app, +port);
  debug(chalk.magenta("Start server"));
  await connectDb(mongoDbUrl);
  debug(chalk.blue("Connect data base"));
} catch (error: unknown) {
  console.log(
    chalk.red(`Error connecting to the database ${(error as Error).message}`)
  );
}