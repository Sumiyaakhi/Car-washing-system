import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { BookingServices } from "./bookings.service";
import { Request, Response } from "express";

const createBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createBookingIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking succesful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const bookings = await BookingServices.getAllBookingsFromDB();
  res.status(200).json({
    status: httpStatus.OK,
    success: true,
    data: bookings,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
};
