import { z } from "zod";

const createSlotValidationSchema = z.object({
  service: z.string().refine((value) => {
    return /^[0-9a-fA-F]{24}$/.test(value); // Validate if it's a valid ObjectId
  }, "Invalid service ID"),
  date: z.string().refine((value) => {
    return !isNaN(Date.parse(value)); // Check if date is valid
  }, "Invalid date format"),
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid start time format (HH:mm)"
    ),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid end time format (HH:mm)"
    ),
});

const updateSlotValidationSchema = z.object({
  service: z
    .string()
    .refine((value) => {
      return /^[0-9a-fA-F]{24}$/.test(value); // Validate if it's a valid ObjectId
    }, "Invalid service ID")
    .optional(),
  date: z
    .string()
    .refine((value) => {
      return !isNaN(Date.parse(value)); // Check if date is valid
    }, "Invalid date format")
    .optional(),
  startTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid start time format (HH:mm)"
    )
    .optional(),
  endTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Invalid end time format (HH:mm)"
    )
    .optional(),
});

export const slotValidation = {
  createSlotValidationSchema,
  updateSlotValidationSchema,
};
