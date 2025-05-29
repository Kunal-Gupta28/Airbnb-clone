if(process.env.NODE_ENV != "production"){require('dotenv').config()}

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.model.js");
const port = process.env.PORT || 3000;
const connectToDB = require("./config/ConnectToDB.js");

connectToDB();

const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SECRET || "mysupersecretcode",
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("Error in MONGO SESSION STORE:", err);
});

const sessionOption = { 
  store,
  secret: process.env.SECRET || "mysupersecretcode",
  resave: false, 
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  } 
};
 
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

// Global middleware for template variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewsRouter);
app.use("/", userRouter);

// 404 handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error", { message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});   