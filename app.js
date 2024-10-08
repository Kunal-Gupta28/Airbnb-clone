if(process.env.NODE_ENV != "produnction"){require('dotenv').config()}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.js");
const port = 3000;
const dbUrl = process.env.ATLASDB_URL;

const store =   MongoStore.create({
  mongoUrl: dbUrl,
  crypto:{
    secret: process.env.SECRECT, 
  },
  touchAfter: 24 *3600,
});

store.on("error",()=>{
  console.log("error in MONGO SESSION STORE",err);
})

const sessionOption = { 
  store,
  secret: process.env.SECRECT, 
  resave: false, 
  saveUninitialized: true,
cookies:{
  expries: Date.now() + 7*24*60*60*1000,
  maxAge: 7*24*60*60*1000,
  httpOnly: true
} };


 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));



app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})


async function main() {
  await mongoose.connect(dbUrl);
}

main().then(() => {
  console.log("connected to database.......");
}).catch((err) => {
  console.log(err);
});


app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewsRouter);
app.use("/", userRouter);

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found!"));
})

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message });
});

app.listen(port, () => {
  console.log("server is working on port: " + port);
});  