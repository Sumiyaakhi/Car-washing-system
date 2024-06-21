"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
// Define a Zod schema for the booking data
const BookingSchema = zod_1.z.object({
    serviceId: zod_1.z
        .string()
        .refine((val) => mongoose_1.Schema.Types.ObjectId, {
        message: "Invalid serviceId. Must be a valid ObjectId.",
    })
        .optional(),
    slotId: zod_1.z
        .string()
        .refine((val) => mongoose_1.Schema.Types.ObjectId, {
        message: "Invalid slotId. Must be a valid ObjectId.",
    })
        .optional(),
    vehicleType: zod_1.z
        .string()
        .min(1, { message: "Vehicle type is required." })
        .optional(),
    vehicleBrand: zod_1.z
        .string()
        .min(1, { message: "Vehicle brand is required." })
        .optional(),
    vehicleModel: zod_1.z
        .string()
        .min(1, { message: "Vehicle model is required." })
        .optional(),
    manufacturingYear: zod_1.z
        .number()
        .int()
        .min(1900)
        .max(new Date().getFullYear(), {
        message: "Invalid manufacturing year.",
    })
        .optional(),
    registrationPlate: zod_1.z
        .string()
        .min(1, { message: "Registration plate is required." })
        .optional(),
});
exports.default = BookingSchema;
