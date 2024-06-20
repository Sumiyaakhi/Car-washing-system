import { Router } from "express";
import { UserRoutes } from "../user/user.route";
import { ServiceRoutes } from "../service/service.route";
import { slotRoutes } from "../slot/slot.route";
import { bookingRoutes } from "../booking/bookings.route";

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
    path: "/slots",
    route: slotRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
