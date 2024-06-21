import { Service, Slot } from "../service/service.model";
import { Booking } from "./bookings.model";
import { User } from "../user/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TBooking } from "./bookings.interface";

const createBookingIntoDB = async (
  payload: TBooking,
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
  } = payload;

  // Verify and decode the JWT token
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    throw new Error("Authorization token is missing or invalid");
  }

  const token = authorizationHeader.split(" ")[1];
  let loggedInUserId;
  try {
    const decodedToken = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    loggedInUserId = decodedToken.sub;
  } catch (err) {
    throw new Error("Invalid token");
  }

  // Find the slot
  const slot = await Slot.findById(slotId);
  if (!slot) {
    throw new Error("Slot not found");
  }

  // Check if the slot is available
  if (slot.isBooked !== "available") {
    throw new Error("Slot is already booked or canceled");
  }

  // Find the service
  const service = await Service.findById(serviceId);
  if (!service) {
    throw new Error("Service not found");
  }

  // Find the customer (logged-in user)
  const customer = await User.findById(loggedInUserId);
  if (!customer) {
    throw new Error("Customer not found");
  }
  const { name, email, _id, phone, address } = customer;

  const result = {
    _id,
    customer: {
      _id,
      name: name,
      email: email,
      phone,
      address,
    },
    service: {
      _id: service._id,
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      isDeleted: service.isDeleted,
    },
    slot: {
      _id: slot._id,
      service: slot.service,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      isBooked: slot.isBooked,
    },
    vehicleType,
    vehicleBrand,
    vehicleModel,
    manufacturingYear,
    registrationPlate,
  };
  // Create a new booking
  const booking = await Booking.create(result);

  // Update the slot status to booked
  slot.isBooked = "booked";
  await slot.save();

  return result;
};

const getAllBookingsFromDB = async () => {
  const bookings = await Booking.find();
  return bookings;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
};
