const listingModel = require("../models/listing.model.js");


// index 
module.exports.index = async (req, res) => {
    // Use req.params.category for the category filter route
    const { category } = req.params;
    let query = {};
    if (category && category !== 'all') {
        query.category = category;
    }
    const allListings = await listingModel.find(query);
    const categories = await listingModel.distinct('category');
    res.render("listing/index.ejs", { 
        allListings,
        selectedCategory: category || 'all',
        categories
    });
};

// search listings
module.exports.searchListings = async (req, res) => {
    const { q } = req.query;
    let query = {};
    if (q) {
        const searchRegex = new RegExp(q, 'i');
        query.$or = [
            { title: searchRegex },
            { location: searchRegex },
            { country: searchRegex }
        ];
    }
    const listings = await listingModel.find(query);
    const categories = await listingModel.distinct('category');
    res.render("listing/index.ejs", { 
        allListings: listings,
        selectedCategory: 'all',
        categories
    });
};

// get search suggestions
module.exports.getSearchSuggestions = async (req, res) => {
    const { q } = req.query;
    if (!q) {
        return res.json([]);
    }

    const searchRegex = new RegExp(q, 'i');
    const suggestions = await listingModel.find({
        $or: [
            { title: searchRegex },
            { location: searchRegex },
            { country: searchRegex }
        ]
    })
    .select('title location country')
    .limit(5);

    const formattedSuggestions = suggestions.map(item => ({
        title: item.title,
        location: `${item.location}, ${item.country}`
    }));

    res.json(formattedSuggestions);
};

// get all categories
module.exports.getCategories = async (req, res) => {
    const categories = await listingModel.distinct('category');
    res.json(categories);
};

// new route
module.exports.newRoute = (req, res) => {
    res.render("listing/new.ejs");
};

// create route
module.exports.createRoute = async (req, res, next) => {
    try {
        let url = req.file.path;
        let filename = req.file.filename;
        let newListing = new listingModel(req.body.listing);
        newListing.owner = req.user._id;
        newListing.image = { url, filename };
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listing");
    } catch (err) {
        next(err);
    }
};

// show route
module.exports.showRoute = async (req, res, next) => {
    try {
        let { id } = req.params;
        const listing = await listingModel.findById(id)
            .populate({ path: "reviews", populate: { path: "author" } })
            .populate("owner");
        
        if (!listing) {
            req.flash("error", "Listing you requested for does not exist!");
            return res.redirect("/listing");
        }
        res.render('listing/show.ejs', { listing });
    } catch (err) {
        next(err);
    }
};

// edit route
module.exports.editRoute = async (req, res, next) => {
    try {
        const listing = await listingModel.findById(req.params.id);
        if (!listing) {
            req.flash("error", "Listing you requested for does not exist!");
            return res.redirect("/listing");
        }
        res.render('listing/edit.ejs', { listing });
    } catch (err) {
        next(err);
    }
};

// update route
module.exports.updateRoute = async (req, res, next) => {
    try {
        let { id } = req.params;
        let listing = await listingModel.findByIdAndUpdate(id, { ...req.body.listing });

        if (typeof req.file !== "undefined") {
            let url = req.file.path;
            let filename = req.file.filename;
            listing.image = { url, filename };
            await listing.save();
        }
        req.flash("success", "Listing Updated!");
        res.redirect(`/listing/${id}`);
    } catch (err) {
        next(err);
    }
};

// delete route
module.exports.deleteRoute = async (req, res, next) => {
    try {
        let { id } = req.params;
        let deletedListing = await listingModel.findByIdAndDelete(id);
        if (!deletedListing) {
            req.flash("error", "Listing you requested to delete does not exist!");
            return res.redirect("/listing");
        }
        req.flash("success", "Listing Deleted!");
        res.redirect("/listing");
    } catch (err) {
        next(err);
    }
};


