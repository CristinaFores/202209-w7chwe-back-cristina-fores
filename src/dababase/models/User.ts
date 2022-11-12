import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    usrname: {
      type: String,
      require: true,
      unique: true,
    },
    pasword: {
      type: String,
      require: true,
    },
    bio: {
      type: String,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    enemies: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema, "users");

export default User;
