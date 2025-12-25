const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const mongoose = require("mongoose");
const User = mongoose.model("User");

// JWT strategy options configuration
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Secret key for verifying JWT for signature
};

// Passport.js JWT strategy setup
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Find user by ID from JWT payload
        const user = await User.findById(jwt_payload.id);

        // If user not found, return false
        if (!user) return done(null, false);

        return done(null, user); // User found, return user object
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
