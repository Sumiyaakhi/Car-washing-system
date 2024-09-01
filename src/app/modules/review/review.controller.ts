import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from "http-status";
import { RevieweServices } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const reviewData = req.body;
  console.log("Received review data:", reviewData);
  const review = await RevieweServices.createReview(reviewData);
  console.log("Created review:", review);

  if (!review) {
    return res.status(500).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Failed to create review",
    });
  }

  res.status(200).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Review created successfully",
    data: review,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const reviews = await RevieweServices.getAllReviews();
  console.log("Retrieved reviews:", reviews);

  if (!reviews) {
    return res.status(404).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No reviews found",
    });
  }

  res.status(200).json({
    success: true,
    status: httpStatus.OK,
    message: "Reviews retrieved successfully",
    data: reviews,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
};
