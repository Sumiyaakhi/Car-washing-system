import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { getMyBookingsFromDB } from "./myBooking.service";

export const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const myBookings = await getMyBookingsFromDB(
    req.headers.authorization as string
  );
  res.status(200).json({
    status: httpStatus.OK,
    message: "User bookings retrieved successfully",
    success: true,
    data: myBookings,
  });
});
