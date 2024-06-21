"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../user/user.route");
const service_route_1 = require("../service/service.route");
const slot_route_1 = require("../slot/slot.route");
const bookings_route_1 = require("../booking/bookings.route");
const myBooking_route_1 = require("../myBooking/myBooking.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/services",
        route: service_route_1.ServiceRoutes,
    },
    {
        path: "/slots",
        route: slot_route_1.slotRoutes,
    },
    {
        path: "/bookings",
        route: bookings_route_1.bookingRoutes,
    },
    {
        path: "/my-bookings",
        route: myBooking_route_1.myBookingRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
