import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./bookings.service";
import { Request, Response } from "express";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization as string;
  const result = await BookingServices.createBookingIntoDB(
    req.body,
    authorizationHeader
  );

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingServices.getAllBookingsFromDB();
  res.status(200).json({
    status: httpStatus.OK,
    message: "All bookings retrieved successfully",
    success: true,
    data: bookings,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
};
