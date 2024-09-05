const Listing = require("../models/listing");


// index 
module.exports.index  =  async(req,res)=>{
    const allListings = await Listing.find();
    res.render("listing/index.ejs",{allListings});
  };

  // new route
  module.exports.newRoute = async(req,res)=>{
    res.render("listing/new.ejs");
  };

// create route
  module.exports.createRoute =async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url , filename}
    console.log(newListing);
    await newListing.save();
    req.flash("success", " New Listing Created!");
    res.redirect("/listing");
    next();
  };


// show route
  module.exports.showRoute = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
      req.flash("error", " Listing you requested for does not exist!");
      res.redirect("/listing")
      }
    res.render('listing/show.ejs', { listing });
console.log(listing)
  };


// edit route
  module.exports.editRoute = async (req,res)=>{
    const listing = await Listing.findById(req.params.id);
    res.render('listing/edit.ejs', { listing });
  };


// update route
  module.exports.updateRoute = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!== "undefined"){
      let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url , filename}
    await listing.save();
    }
    req.flash("success", "Listing Updated!")
    res.redirect(`/listing`);
  };


// delete route
  module.exports.deleteRoute = async(req,res)=>{
    let {id} = req.params;
    console.log(req.params.id);
    let deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "  Listing Deleted!")

    console.log(deleteListing);
    res.redirect("/listing");
  };


