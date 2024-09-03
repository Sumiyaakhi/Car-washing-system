import express from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidation.createUserValidationSchema),
  UserControllers.createUser
);
router.post(
  "/login",
  validateRequest(userValidation.loginValidationSchema),
  UserControllers.loginUser
);
router.post(
  "/refresh-token",
  validateRequest(userValidation.refreshTokenValidationSchema),
  UserControllers.refreshToken
);

export const UserRoutes = router;
