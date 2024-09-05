const Listing = require("../models/listing");
const reviews = require("../models/reviews.js");


// review route
module.exports.reviewRoute =  async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    listing.review.push(newReview);
    newReview.author = req.user._id;
    await newReview.save();
    await listing.save();
    console.log("new review saved");
    res.redirect(`/listing/${listing._id}`);
};


// delete review route
module.exports.deleteReviewRoute =  async(req,res)=>{
    let {id , reviewId} = req.params;
    await reviews.findByIdAndUpdate(id,{$pull:{reviews:reviewId} })
    await reviews.findById(reviewId)
    res.redirect(`/listing/${id}`);
};