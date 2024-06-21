"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    customerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    serviceId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Service",
        // required: true,
    },
    slotId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Slot",
        // required: true,
    },
    customer: {
        type: Object(),
    },
    slot: {
        type: Object(),
    },
    service: {
        type: Object(),
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleBrand: {
        type: String,
        required: true,
    },
    vehicleModel: {
        type: String,
        required: true,
    },
    manufacturingYear: {
        type: Number,
        required: true,
    },
    registrationPlate: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.Booking = (0, mongoose_1.model)("Booking", BookingSchema);
