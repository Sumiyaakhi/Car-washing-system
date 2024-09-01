import { Router } from "express";
import { SlotController } from "./slot.controller";

const router = Router();

router.get("/availability", SlotController.getAvailableSlots);
router.post("/selectedSlot", SlotController.createSelectedSlot);
router.get("/selectedSlots", SlotController.getAllSelectedSlots);

export const slotRoutes = router;
