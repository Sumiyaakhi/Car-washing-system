import { Slot } from "../service/service.model";
import { Booking } from "./bookings.model";
import { User } from "../user/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";

const createBookingIntoDB = async (
  bookingData: any,
  authorizationHeader: any
) => {
  const {
    serviceId,
    slotId,
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  } = bookingData;

  // Verify and decode the JWT token
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    throw new Error("Authorization token is missing or invalid");
  }

  const token = authorizationHeader.split(" ")[1]; // Extract the token part after "Bearer "
  let loggedInUserId;
  try {
    const decodedToken = jwt.verify(token, config.jwt_access_secret as string); // Use your secret key here
    loggedInUserId = decodedToken.sub; // Assuming the user ID is stored in the "sub" field
  } catch (err) {
    throw new Error("Invalid token");
  }

  // Find the slot
  const slot = await Slot.findById(slotId).populate("service");
  if (!slot) {
    throw new Error("Slot not found");
  }

  // Check if the slot is available
  if (slot.isBooked !== "available") {
    throw new Error("Slot is already booked or canceled");
  }

  // Find the customer (logged-in user)
  const customer = await User.findById(loggedInUserId);
  if (!customer) {
    throw new Error("Customer not found");
  }

  // Create a new booking
  const booking = await Booking.create({
    customer: loggedInUserId,
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
  await booking
    .populate("customer")
    .populate("service")
    .populate("slot")
    .execPopulate();

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
