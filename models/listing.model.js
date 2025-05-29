const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.model.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    category: {
        type: String,
        required: true,
        enum: ['Trending', 'Rooms', 'Iconic cities', 'Mountains', 'Castles', 'Amazing pools', 'Camping', 'Farms', 'Arctic', 'Domes', 'Boats']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add indexes for better query performance
listingSchema.index({ title: 'text', description: 'text' });
listingSchema.index({ geometry: '2dsphere' });
listingSchema.index({ category: 1 });
listingSchema.index({ price: 1 });

// Middleware to delete associated reviews when a listing is deleted
listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;