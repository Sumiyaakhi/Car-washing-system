import { Schema } from "mongoose";
import { z } from "zod";

// Define a Zod schema for the booking data
const BookingSchema = z.object({
  serviceId: z
    .string()
    .refine((val) => Schema.Types.ObjectId, {
      message: "Invalid serviceId. Must be a valid ObjectId.",
    })
    .optional(),
  slotId: z
    .string()
    .refine((val) => Schema.Types.ObjectId, {
      message: "Invalid slotId. Must be a valid ObjectId.",
    })
    .optional(),
  vehicleType: z
    .string()
    .min(1, { message: "Vehicle type is required." })
    .optional(),
  vehicleBrand: z
    .string()
    .min(1, { message: "Vehicle brand is required." })
    .optional(),
  vehicleModel: z
    .string()
    .min(1, { message: "Vehicle model is required." })
    .optional(),
  manufacturingYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear(), {
      message: "Invalid manufacturing year.",
    })
    .optional(),
  registrationPlate: z
    .string()
    .min(1, { message: "Registration plate is required." })
    .optional(),
});
export default BookingSchema;
