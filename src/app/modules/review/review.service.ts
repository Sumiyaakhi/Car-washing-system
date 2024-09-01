import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReview = async (ewciewData: TReview) => {
  const review = await Review.create(ewciewData);
  return review;
};

const getAllReviews = async () => {
  const review = await Review.find();
  return review;
};

export const RevieweServices = {
  createReview,

  getAllReviews,
};
