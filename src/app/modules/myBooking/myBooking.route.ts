import { Router } from "express";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { getMyBookings } from "./myBooking.controller";

const router = Router();

router.get("/", auth(USER_ROLE.user), getMyBookings);

export const myBookingRoutes = router;
