import { Router } from "express";
import { ServiceController } from "./service.controller";

const router = Router();

router.post("/", ServiceController.createService);
router.get("/:id", ServiceController.getServiceById);
router.get("/", ServiceController.getAllServices);
router.put("/:id", ServiceController.updateService);
router.delete("/:id", ServiceController.deleteService);
router.post("/slots", ServiceController.createSlot);

export const ServiceRoutes = router;

// import { Router } from "express";
// import { ServiceController } from "./service.controller";
// import { authenticate, authorizeAdmin } from "../../middleware/auth.middleware";

// const router = Router();

// router.post("/", authenticate, authorizeAdmin, ServiceController.createService);
// router.get("/:id", ServiceController.getServiceById);
// router.get("/", ServiceController.getAllServices);
// router.put("/:id", authenticate, authorizeAdmin, ServiceController.updateService);
// router.patch("/:id/isDeleted", authenticate, authorizeAdmin, ServiceController.updateServiceIsDeleted);
// router.post("/slots", authenticate, authorizeAdmin, ServiceController.createSlot);

// export default router;
