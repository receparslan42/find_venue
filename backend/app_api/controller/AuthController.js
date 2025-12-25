const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");

// Create a standardized response for API requests
const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

// User login controller function
const login = async (req, res) => {
  try {
    // Extract user details from request body
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return createResponse(res, 400, {
        status: "error",
        message: "Email and password are required.",
      });
    }

    // Find user by email from the database with password field included
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    // If user not found, return error response
    if (!user)
      return createResponse(res, 401, {
        status: "error",
        message: "Authentication failed. Wrong email or password.",
      });

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match, return error response
    if (!isMatch)
      return createResponse(res, 401, {
        status: "error",
        message: "Authentication failed. Wrong email or password.",
      });

    // Generate JWT token for the authenticated user
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return success response with token and user info
    return createResponse(res, 200, {
      status: "success",
      message: "Authentication successful.",
      token: `Bearer ${token}`,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return createResponse(res, 500, {
      status: "error",
      message: "Internal server error.",
    });
  }
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

    const loweredEmail = email.trim().toLowerCase(); // Normalize email to lowercase

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email: loweredEmail });
    if (existingUser) {
      return createResponse(res, 409, {
        status: "error",
        message: "User already exists.",
      });
    }

    // Hash the user's password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new user to the database
    const newUser = new User({
      username: name + " " + surname,
      email: loweredEmail,
      password: hashedPassword,
    });
    await newUser.save();

    // Return success response upon successful registration
    return createResponse(res, 201, {
      status: "success",
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return createResponse(res, 500, {
      status: "error",
      message: "Internal server error.",
    });
  }
};

module.exports = {
  login,
  signup,
};
