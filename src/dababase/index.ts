import mongoose from "mongoose";
import "../loadEnvironment.js";

export const connectDb = async (mongoUrl: string) => {
  await mongoose.connect(mongoUrl);
};
