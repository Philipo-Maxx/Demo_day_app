import { Router } from "express";

import {
  addProductReview,
  getProductReviews,
} from "../../../controllers/client/shop/product-review-controller.js";

const reviewRouter = Router();

reviewRouter.post("/add", addProductReview);
reviewRouter.get("/:productId", getProductReviews);

export { reviewRouter };
