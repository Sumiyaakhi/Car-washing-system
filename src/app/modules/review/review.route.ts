import { Router } from "express";

import validateRequest from "../middlewares/validateRequest";

import auth from "../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import { ReviewController } from "./review.controller";
import { createReviewValidationSchema } from "./review.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(createReviewValidationSchema),
  ReviewController.createReview
);

router.get("/", ReviewController.getAllReviews);

export const ReviewRoutes = router;
