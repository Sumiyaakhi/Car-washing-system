import { Router } from "express";
import { BookingControllers } from "./bookings.controller";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../middlewares/validateRequest";
import BookingSchema from "./bookings.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BookingSchema),
  BookingControllers.createBooking
);

router.get("/", auth(USER_ROLE.admin), BookingControllers.getAllBookings);

export const bookingRoutes = router;
