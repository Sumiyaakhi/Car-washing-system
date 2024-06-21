"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const bookings_controller_1 = require("./bookings.controller");
const auth_1 = __importDefault(require("../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const bookings_validation_1 = __importDefault(require("./bookings.validation"));
const router = (0, express_1.Router)();
router.post("/", (0, auth_1.default)(user_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(bookings_validation_1.default), bookings_controller_1.BookingControllers.createBooking);
router.get("/", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), bookings_controller_1.BookingControllers.getAllBookings);
exports.bookingRoutes = router;
