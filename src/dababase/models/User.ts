import { model, Schema } from "mongoose";

const userSchema = new Schema({
  usrname: {
    type: String,
    require: true,
    unique: true,
  },
  pasword: {
    type: String,
    require: true,
    unique: true,
  },
  image: {
    type: String,
  },
});

const User = model("User", userSchema, "users");

export default User;
