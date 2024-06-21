import httpStatus from "http-status";
import { TLoginUser, TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../error/AppError";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUserIntoDB = async (password: string, payload: TUser) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: payload.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // Find user and explicitly select password field
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Create token and send to the user/client
  const jwtPayload = {
    sub: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    address: user.address,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  // Return user details excluding password
  const { password, ...userWithoutPassword } = user.toObject();

  return {
    token,
    user: userWithoutPassword,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
