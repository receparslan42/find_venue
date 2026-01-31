const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Environment variables
const dotenv = require("dotenv");
dotenv.config();

require("./app_api/models/db"); // Database connection

const AuthRouter = require("./app_api/routes/AuthRoutes");
const VenueRouter = require("./app_api/routes/VenueRoutes");
const CommentRouter = require("./app_api/routes/CommentRoutes");

// Passport.js setup
const passport = require("passport");
require("./app_api/config/passport");

const app = express();

app.use(passport.initialize()); // Initialize Passport.js

// Middleware to allow CORS
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
};

app.use(allowCrossDomain);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", [AuthRouter, VenueRouter, CommentRouter]);

app.use("/", indexRouter);
app.use("/users", usersRouter);

// Error handling for unauthorized access
app.use((err, _req, res, _next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  }
});

module.exports = app;
