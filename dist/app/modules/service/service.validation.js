"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlotValidationSchema = exports.updateServiceValidationSchema = exports.createServiceValidationSchema = void 0;
const zod_1 = require("zod");
exports.createServiceValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
    price: zod_1.z.number().positive("Price must be a positive number").optional(),
    duration: zod_1.z
        .number()
        .positive("Duration must be a positive number")
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.updateServiceValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required").optional(),
    description: zod_1.z.string().min(1, "Description is required").optional(),
    price: zod_1.z.number().positive("Price must be a positive number").optional(),
    duration: zod_1.z
        .number()
        .positive("Duration must be a positive number")
        .optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.createSlotValidationSchema = zod_1.z.object({
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
