const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIN, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.controller.js");
const multer = require("multer");
const { storage } = require("../cloud.config.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIN,
    validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingController.createRoute)
  );

// new route
router.get("/new", isLoggedIN, listingController.newRoute);

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

// eidt routr
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
