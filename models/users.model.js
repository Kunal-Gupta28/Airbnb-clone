const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'username',
    errorMessages: {
        UserExistsError: 'A user with the given username is already registered',
        MissingPasswordError: 'No password was given',
        AttemptTooSoonError: 'Account is currently locked. Try again later',
        TooManyAttemptsError: 'Account locked due to too many failed login attempts',
        NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
        IncorrectPasswordError: 'Password or username is incorrect',
        IncorrectUsernameError: 'Password or username is incorrect',
        MissingUsernameError: 'No username was given',
        UserExistsError: 'A user with the given username is already registered'
    }
});

// Add method to check if user is admin
userSchema.methods.isAdmin = function() {
    return this.email === process.env.ADMIN_EMAIL;
};

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model("User", userSchema);

module.exports = User;
