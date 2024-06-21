"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().min(8).optional(),
    phone: zod_1.z.string().min(10).optional(),
    role: zod_1.z.enum(["admin", "user"]).optional(),
    address: zod_1.z.string().min(1).optional(),
    isDeleted: zod_1.z.boolean().optional(),
});
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: "Email is required" }),
        password: zod_1.z.string({ required_error: "Password is required" }),
    }),
});
exports.userValidation = {
    createUserValidationSchema,
    loginValidationSchema,
};
