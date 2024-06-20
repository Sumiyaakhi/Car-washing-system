import { Router } from "express";
import { ServiceController } from "./service.controller";
import validateRequest from "../middlewares/validateRequest";
import {
  createServiceValidationSchema,
  createSlotValidationSchema,
  updateServiceValidationSchema,
} from "./service.validation";
import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(createServiceValidationSchema),
  ServiceController.createService
);
router.get("/:id", ServiceController.getServiceById);
router.get("/", ServiceController.getAllServices);
router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(updateServiceValidationSchema),
  ServiceController.updateService
);
router.delete("/:id", auth(USER_ROLE.admin), ServiceController.deleteService);
router.post(
  "/slots",
  auth(USER_ROLE.admin),
  validateRequest(createSlotValidationSchema),
  ServiceController.createSlot
);

export const ServiceRoutes = router;
