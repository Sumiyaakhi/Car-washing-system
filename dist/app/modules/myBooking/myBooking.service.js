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
exports.getMyBookingsFromDB = void 0;
const config_1 = __importDefault(require("../../config"));
const bookings_model_1 = require("../booking/bookings.model");
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getMyBookingsFromDB = (authorizationHeader) => __awaiter(void 0, void 0, void 0, function* () {
    // Verify and decode the JWT token
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        throw new Error("Authorization token is missing or invalid");
    }
    const token = authorizationHeader.split(" ")[1];
    let userEmail;
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        userEmail = decodedToken.email;
    }
    catch (err) {
        throw new Error("Invalid token");
    }
    // Find the user by email
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new Error("User not found");
    }
    // Find the bookings for the logged-in user
    const myBookings = yield bookings_model_1.Booking.find({ "customer.email": userEmail }).select({
        service: 1,
        slot: 1,
        vehicleType: 1,
        vehicleBrand: 1,
        vehicleModel: 1,
        manufacturingYear: 1,
        registrationPlate: 1,
        createdAt: 1,
        updatedAt: 1,
    });
    return myBookings;
});
exports.getMyBookingsFromDB = getMyBookingsFromDB;
