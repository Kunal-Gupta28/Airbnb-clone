const mongoose= require("mongoose");
const schema = mongoose.Schema;
const Review = require("./reviews");

const listingSchema = new schema({
    title:{ 
        type: String,
        required: true
    },
    description:{ 
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    price:{ 
        type: Number,
        required: true
    },
    location:{ 
        type: String,
        required: true
    },
    country:{ 
        type: String,
        required: true
    },
    reviews:[{
        type: schema.Types.ObjectId,
        ref:"review"
    }],
    owner:{
        type: schema.Types.ObjectId,
        ref:"User"
    }
});

listingSchema.post("findOneAndDelete",async(lisiting)=>{

    if(lisiting){
    await Review.deleteMany({ _id: {$in : listing.reviews}})
    }
})

const Listing = mongoose.model("listing",listingSchema);
module.exports= Listing;