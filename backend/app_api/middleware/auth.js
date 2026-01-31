const jwt = require("express-jwt");

// Middleware to authenticate JWT tokens in incoming requests
const requireAuth = jwt.expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["sha1", "RS256", "HS256"],
});

module.exports = requireAuth;
