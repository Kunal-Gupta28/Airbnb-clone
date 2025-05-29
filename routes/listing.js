const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIN, isOwner, validateListing } = require("../middleware/middleware.js");
const listingController = require("../controllers/listing.controller.js");
const multer = require("multer");
const { storage } = require("../config/cloud.config.js");
const upload = multer({ storage });

// Main routes
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIN,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createRoute)
  );

// Category filter route
router.get("/category/:category", wrapAsync(listingController.index));

// New listing route
router.get("/new", isLoggedIN, listingController.newRoute);

// Search route (must be before /:id)
router.get("/search", wrapAsync(listingController.searchListings));
router.get("/search/suggestions", wrapAsync(listingController.getSearchSuggestions));

// Individual listing routes
router
  .route("/:id")
  .get(wrapAsync(listingController.showRoute))
  .post(
    isLoggedIN,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateRoute)
  )
  .delete(isLoggedIN, isOwner, wrapAsync(listingController.deleteRoute));

// Edit listing route
router.get(
  "/:id/edit",
  isLoggedIN,
  isOwner,
  wrapAsync(listingController.editRoute)
);

// Errors for unwanted routes
router.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

module.exports = router;
