import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { string } from "zod";

const userSchema = new Schema<TUser>(
  {
    // id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<TUser>("User", userSchema);
// export const User = model<TUser, UserModel>("User", userSchema);
