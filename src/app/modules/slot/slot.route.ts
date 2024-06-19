import { Router } from "express";
import { SlotController } from "./slot.controller";

const router = Router();

router.get("/availability", SlotController.getAvailableSlots);

export const slotRoutes = router;
