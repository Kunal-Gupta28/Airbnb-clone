const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    // createdBy:{
    //     type:,
    //     required: true,
    // },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

// Add indexes for better query performance
reviewSchema.index({ author: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ createdAt: -1 });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
 