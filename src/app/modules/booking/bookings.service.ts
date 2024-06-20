import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { Slot } from "../service/service.model";
import { Booking } from "./bookings.model";
import catchAsync from "../../utils/catchAsync";

const createBookingIntoDB = async (bookingData: any) => {
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = bookingData;

  // Find the slot
  const slot = await Slot.findById(slotId).populate("service");
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  // Check if the slot is available
  if (slot.isBooked !== "available") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Slot is already booked or canceled"
    );
  }

  // Find the customer
  //   const customer = await User.findById(customerId);
  //   if (!customer) {
  //     throw new AppError(httpStatus.NOT_FOUND, "Customer not found");
  //   }

  // Create a new booking
  const booking = await Booking.create({
    // customer: customerId,
    service: serviceId,
    slot: slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  });

  // Update the slot status to booked
  slot.isBooked = "booked";
  await slot.save();

  // Populate the booking with related data
  await booking;
  //   .populate("User")
  // .populate("Service");
  // .populate("Slot")
  // .execPopulate();

  return booking;
};

const getAllBookingsFromDB = async () => {
  const bookings = await Booking.find();
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};
