const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");

// Create a standardized response for API requests
const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

// User signup controller function
const signup = async (req, res) => {
  try {
    // Extract user details from request body
    const { name, surname, email, password } = req.body;

    // Validate required fields
    if (!name || !surname || !email || !password) {
      return createResponse(res, 400, {
        status: "error",
        message: "All fields are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase(); // Normalize email to lowercase

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return createResponse(res, 409, {
        status: "error",
        message: "User already exists.",
      });
    }

    // Create new user instance
    const newUser = new User({
      username: name + " " + surname,
      email: normalizedEmail,
    });
    newUser.setPassword(password); // Set hashed password

    const user = await newUser.save(); // Save user

    // Respond with success message
    return createResponse(res, 201, {
      status: "success",
      message: "User registered successfully.",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (saveError) {
    return createResponse(res, 500, {
      status: "error",
      message: "An error occurred during registration.",
    });
  }
};

// User login controller function
const login = (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return createResponse(res, 400, {
      status: "error",
      message: "Email and password are required.",
    });
  }

  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();
  req.body.email = normalizedEmail;

  // Authenticate user using Passport.js
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return createResponse(res, 500, {
        status: "error",
        message: "An error occurred during authentication.",
      });
    }
    if (!user) {
      return createResponse(res, 401, {
        status: "error",
        message: info.message || "Invalid email or password.",
      });
    }

    // Generate JWT token
    const token = user.generateJWT();

    // Respond with token and user info
    return createResponse(res, 200, {
      status: "success",
      message: "Login successful.",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  })(req, res);
};

module.exports = {
  signup,
  login,
};
