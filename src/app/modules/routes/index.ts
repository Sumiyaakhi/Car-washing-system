import { Router } from "express";
import { UserRoutes } from "../user/user.route";
import { ServiceRoutes } from "../service/service.route";
import { slotRoutes } from "../slot/slot.route";
import { bookingRoutes } from "../booking/bookings.route";
import { myBookingRoutes } from "../myBooking/myBooking.route";
import { ReviewRoutes } from "../review/review.route";
import { PaymentRoutes } from "../payment/payment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/my-bookings",
    route: myBookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
