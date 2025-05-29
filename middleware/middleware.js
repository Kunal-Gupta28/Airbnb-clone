const listingModel = require("../models/listing.model.js");
const reviewModel = require("../models/reviews.model.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
 

//  authentication
module.exports.isLoggedIN = (req,res,next)=>{
    if(!req.isAuthenticated()){
        console.log(req.user)
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must to logged in to create a listing!")
        return res.redirect("/login");
    }
    next();
}

//  automatic login after signup
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

// authorization 
module.exports.isOwner = async (req,res,next)=>{
    let {id} = req.params;
    let listing = await listingModel.findById(id);
    if(!req.user || !listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to edit");
        return res.redirect(`/listing`);
    }
    next(); 
}
// author of review 
module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let review = await reviewModel.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listing/${id}`);
    }
    next(); 
}

// listing validation
module.exports.validateListing = (req, res, next) => {
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (result.error) {
        let errMsg = result.error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};

//  reviews validation
module.exports.validateReview = (req, res, next) => {
    let result = reviewSchema.validate(req.body);
    console.log(result);
    if (result.error) {
        let errMsg = result.error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    next();
};
  
  