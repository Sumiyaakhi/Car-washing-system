"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const service_model_1 = require("../service/service.model");
const bookings_model_1 = require("./bookings.model");
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const createBookingIntoDB = (payload, authorizationHeader) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId, slotId, vehicleType, vehicleBrand, vehicleModel, manufacturingYear, registrationPlate, } = payload;
    // Verify and decode the JWT token
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new Error("Authorization token is missing or invalid");
    }
    const token = authorizationHeader.split(" ")[1];
    let loggedInUserId;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        loggedInUserId = decodedToken.sub;
    }
    catch (err) {
        throw new Error("Invalid token");
    }
    // Find the slot
    const slot = yield service_model_1.Slot.findById(slotId);
    if (!slot) {
        throw new Error("Slot not found");
    }
    // Check if the slot is available
    if (slot.isBooked !== "available") {
        throw new Error("Slot is already booked or canceled");
    }
    // Find the service
    const service = yield service_model_1.Service.findById(serviceId);
    if (!service) {
        throw new Error("Service not found");
    }
    // Find the customer (logged-in user)
    const customer = yield user_model_1.User.findById(loggedInUserId);
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
    const booking = yield bookings_model_1.Booking.create(result);
    // Update the slot status to booked
    slot.isBooked = "booked";
    yield slot.save();
    return result;
});
const getAllBookingsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield bookings_model_1.Booking.find();
    return bookings;
});
exports.BookingServices = {
    createBookingIntoDB,
    getAllBookingsFromDB,
};
