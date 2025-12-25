const router = require("express").Router(); // Create router instance for routing

const authController = require("../controller/AuthController"); // Import authentication controller

// Route for user registration
router.route("/signup").post(authController.signup);

// Route for user login
router.route("/login").post(authController.login);

// Export the router module for use in the main app
module.exports = router;
