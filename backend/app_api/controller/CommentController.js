const mongoose = require("mongoose"); // Import mongoose
const Venue = mongoose.model("Venue"); // Import Venue model

// Calculate and update the average rating of a venue
const calculateLastRating = (venue, isDeleted) => {
  var i,
    numComments,
    avgRating,
    sumRating = 0;

  var numComments = venue.comments.length;

  if (venue.comments) {
    if (venue.comments.length == 0 && isDeleted) avgRating = 0;
    else {
      for (i = 0; i < venue.comments.length; i++)
        sumRating += venue.comments[i].rating;
      avgRating = sumRating / numComments;
    }
    venue.rating = avgRating;
    venue.save();
  }
};

// Update the venue's rating after a comment is added, updated, or deleted
const updateVenueRating = (venueId, isDeleted) => {
  Venue.findById(venueId)
    .select("rating comments")
    .exec()
    .then((venue) => {
      if (venue) {
        calculateLastRating(venue, isDeleted);
      }
    });
};

// Create a standardized response for API requests
const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

// Create a new comment for a venue
const createComment = (req, res, venue) => {
  try {
    // Add the new comment to the venue's comments array
    req.body.user = req.user.username;
    venue.comments.push(req.body);

    // Save the updated venue with the new comment and update its rating
    venue.save().then((venueUpdated) => {
      var comments = venueUpdated.comments;
      var newComment = comments[comments.length - 1];

      updateVenueRating(venueUpdated._id, false);
      createResponse(res, 201, newComment);
    });
  } catch (error) {
    createResponse(res, 400, { status: "error", message: "Venue not found" });
  }
};

// Add a new comment to a specific venue by venue ID
const addComment = async (req, res) => {
  try {
    // Find the venue by ID and add the comment
    const venue = await Venue.findById(req.params.venueid)
      .select("comments")
      .exec();
    if (venue) {
      createComment(req, res, venue);
    } else {
      createResponse(res, 404, {
        status: "error",
        message: "Venue not found",
      });
    }
  } catch (error) {
    createResponse(res, 400, {
      status: "error",
      message: "Comment add failed",
    });
  }
};

// Get a specific comment by ID for a specific venue
const getComment = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueid)
      .select("name comments")
      .exec();
    if (venue) {
      const comment = venue.comments.id(req.params.commentid);
      const name = venue.name;

      if (comment) {
        const response = {
          venue: { id: req.params.venueid, name: name },
          comment: comment,
        };
        createResponse(res, 200, response);
      } else {
        createResponse(res, 404, {
          status: "error",
          message: "Comment not found",
        });
      }
    } else {
      createResponse(res, 404, {
        status: "error",
        message: "Venue not found",
      });
    }
  } catch (error) {
    createResponse(res, 404, { status: "error", message: "Venue not found" });
  }
};

// Update an existing comment by ID for a specific venue
const updateComment = async (req, res) => {
  try {
    // Find the venue by ID and update the comment by comment ID
    const venue = await Venue.findById(req.params.venueid)
      .select("comments")
      .exec();

    if (!venue) {
      return createResponse(res, 404, {
        status: "error",
        message: "Venue not found",
      });
    }

    const comment = venue.comments.id(req.params.commentid);

    // If comment not found, return 404
    if (!comment) {
      return createResponse(res, 404, {
        status: "error",
        message: "Comment not found",
      });
    }

    // Only admin users can update comments
    if (req.user.role !== "admin") {
      return createResponse(res, 403, {
        status: "error",
        message: "Only admins can modify comments",
      });
    }

    comment.set(req.body); // Update comment fields with request body

    // Save the updated venue and update its rating after comment update
    const venueUpdated = await venue.save();
    updateVenueRating(venueUpdated._id, false);
    createResponse(res, 201, comment);
  } catch (error) {
    createResponse(res, 400, {
      status: "error",
      message: "Comment update failed: " + error.message,
    });
  }
};

// Delete a comment by ID for a specific venue
const deleteComment = async (req, res) => {
  try {
    // Find the venue by ID and delete the comment by comment ID
    const venue = await Venue.findById(req.params.venueid)
      .select("comments")
      .exec();

    if (!venue) {
      return createResponse(res, 404, {
        status: "error",
        message: "Venue not found",
      });
    }

    const comment = venue.comments.id(req.params.commentid);

    // If comment not found, return 404
    if (!comment) {
      return createResponse(res, 404, {
        status: "error",
        message: "Comment not found",
      });
    }

    // Only admin users can delete comments
    if (req.user.role !== "admin") {
      return createResponse(res, 403, {
        status: "error",
        message: "Only admins can modify comments",
      });
    }

    comment.deleteOne(); // Remove the comment from the venue's comments array

    // Save the updated venue and update its rating after comment deletion
    const venueUpdated = await venue.save();
    updateVenueRating(venueUpdated._id, true);
    createResponse(res, 200, {
      status: "success",
      message: comment.user + "'s comment deleted",
    });
  } catch (error) {
    createResponse(res, 400, {
      status: "error",
      message: "Comment deletion failed: " + error.message,
    });
  }
};

module.exports = {
  addComment,
  getComment,
  updateComment,
  deleteComment,
};
