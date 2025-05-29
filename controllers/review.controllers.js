const listingModel = require("../models/listing.model.js");
const reviewModel = require("../models/reviews.model.js");


// review route
module.exports.reviewRoute = async (req, res, next) => {
    try {
        let listing = await listingModel.findById(req.params.id);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listing");
        }
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);
        await newReview.save();
        await listing.save();
        req.flash("success", "New Review Created!");
        res.redirect(`/listing/${listing._id}`);
    } catch (err) {
        next(err);
    }
};


// delete review route
module.exports.deleteReviewRoute = async (req, res, next) => {
    try {
        let { id, reviewId } = req.params;
        await listingModel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await reviewModel.findByIdAndDelete(reviewId);
        req.flash("success", "Review Deleted!");
        res.redirect(`/listing/${id}`);
    } catch (err) {
        next(err);
    }
};