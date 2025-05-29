const userModel = require("../models/users.model.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new userModel({ email, username });
        const registeredUser = await userModel.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect('/listing');
        }); 
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust! You are logged in!");
    res.redirect('/listing');
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listing");
    });
}