const passport = require("passport");

// Middleware to protect routes using JWT authentication
const requireAuth = passport.authenticate("jwt", { session: false });

module.exports = requireAuth;
