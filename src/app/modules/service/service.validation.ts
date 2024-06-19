import { z } from "zod";

const createServiceValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be a positive number"),
  duration: z.number().positive("Duration must be a positive number"),
  isDeleted: z.boolean().optional(),
});

const updateServiceValidationSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().positive("Price must be a positive number").optional(),
  duration: z
    .number()
    .positive("Duration must be a positive number")
    .optional(),
  isDeleted: z.boolean().optional(),
});
