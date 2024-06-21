"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const updateSlotValidationSchema = zod_1.z.object({
    service: zod_1.z
        .string()
        .refine((value) => {
        return /^[0-9a-fA-F]{24}$/.test(value); // Validate if it's a valid ObjectId
    }, "Invalid service ID")
        .optional(),
    date: zod_1.z
        .string()
        .refine((value) => {
        return !isNaN(Date.parse(value)); // Check if date is valid
    }, "Invalid date format")
        .optional(),
    startTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid start time format (HH:mm)")
        .optional(),
    endTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid end time format (HH:mm)")
        .optional(),
});
