import { Model, ObjectId } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  // id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  img: string;
  role: "admin" | "user";
  address: string;
}

//
export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
