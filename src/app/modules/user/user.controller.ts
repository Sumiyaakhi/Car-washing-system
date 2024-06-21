import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const password = user.password;
    const result = await UserServices.createUserIntoDB(password, user);

    res.status(200).json({
      success: true,
      statusCode: httpStatus.OK,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const { token } = result;
  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully!",
    token,
    data: result.user,
  });
});
export const UserControllers = {
  createUser,
  loginUser,
};
