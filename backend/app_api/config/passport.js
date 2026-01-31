const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.trim().toLowerCase() });

        // Check if user exists and password is correct
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        return done(null, user); // Success
      } catch (err) {
        return done(err);
      }
    }
  )
);
