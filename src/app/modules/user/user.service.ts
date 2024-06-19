import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { User } from "./user.model";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUserIntoDB = async (userData: TUser) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  const result = await User.create(userData);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // Find user and explicitly select password field
  const user = await User.isUserExists(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Compare passwords

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched!");
  }

  // create token and sent to the user/client

  const jwtPayload = {
    UserEmail: user.email,
    role: user.role,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });
  // Return user details excluding password
  // const { password, ...userWithoutPassword } = user.toObject();
  return {
    token,
  };
};

export const UserServices = {
  createUserIntoDB,
  loginUser,
};
