const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const reviewController = require("../controllers/review.controllers.js");
const {
  validateReview,
  isLoggedIN,
  isReviewAuthor,
} = require("../middleware.js");

// reviews
router.post(
  "/",
  isLoggedIN,
  validateReview,
  wrapAsync(reviewController.reviewRoute)
);

// delete reviews
router.post(
  "/:reviewId",
  isLoggedIN,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReviewRoute)
);

module.exports = router;
