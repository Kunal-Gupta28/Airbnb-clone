const User = require("../models/users.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.signUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUsers = new User({ email, username });
      const registeredUser = await User.register(newUsers, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "welcome to wanderlust!");
        let redirectUrl = req.locals.redirectUrl;
        console.log(redirectUrl);
        res.redirect(redirectUrl);
      }); 
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }


  module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to wanderlust , You are logged in!");
    let redirectUrl = req.session.redirectUrl || "/listing" ;
    res.redirect(redirectUrl);
  }

  module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "You are logged out!");
      res.redirect("/listing");
    });
    next();
  }