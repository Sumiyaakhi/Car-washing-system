import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { Request, Response } from "express";

// const createUser = catchAsync(async (req, res) => {
//   const { data: userData } = req.body;

//   const result = await UserService.createUserIntoDB(userData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: "User is created succesfully",
//     data: result,
//   });
// });

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await UserService.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const UserControllers = {
  createUser,
};
