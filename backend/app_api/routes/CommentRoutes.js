const router = require("express").Router(); // Create router instance for routing

const requireAuth = require("../middleware/auth"); // Import authentication middleware

var commentController = require("../controller/CommentController"); // Import comment controller

// Route for adding comments to a specific venue by venue ID
router
  .route("/venues/:venueid/comments")
  .post(requireAuth, commentController.addComment);

// Routes for specific comments on a venue by comment ID and venue ID for getting, updating, deleting comments
router
  .route("/venues/:venueid/comments/:commentid")
  .get(commentController.getComment)
  .put(requireAuth, commentController.updateComment)
  .delete(requireAuth, commentController.deleteComment);

// Export the router module for use in the main app
module.exports = router;
