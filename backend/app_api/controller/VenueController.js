const mongoose = require("mongoose");
const Venue = mongoose.model("Venue");

// Create a standardized response for API requests
const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

const listAllVenues = async (req, res) => {
  try {
    // Only admin users can access all venues
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Only admin users can access all venues",
      });
    }

    // Retrieve all venues from the database
    const result = await Venue.find().lean().exec();

    // Map the result to a simplified venue object
    const venues = result.map((venue) => {
      return {
        id: venue._id,
        name: venue.name,
        address: venue.address,
        rating: venue.rating,
        menu: venue.menu,
        distance: null,
        comments: venue.comments.map((comment) => ({
          id: comment._id,
          user: comment.user,
          rating: comment.rating,
          text: comment.text,
          date: comment.date,
        })),
      };
    });

    // Send the list of venues as the response
    createResponse(res, 200, venues);
  } catch (error) {
    createResponse(res, 404, {
      status: "error",
      message: "Error retrieving venues",
    });
  }
};

// List venues near a specific location
const listVenuesByLocation = async (req, res) => {
  var long = parseFloat(req.query.long) || 0;
  var lat = parseFloat(req.query.lat) || 0;

  // GeoJSON expects [longitude, latitude]
  var point = { type: "Point", coordinates: [long, lat] };

  // Use kilometers for client-facing API, convert to meters for MongoDB
  var maxDistanceKm = parseFloat(req.query.maxDistance) || 100; // default 10km
  var maxDistanceMeters = maxDistanceKm * 1000;

  var geoOptions = {
    distanceField: "dist",
    spherical: true,
    maxDistance: maxDistanceMeters,
  };

  try {
    // Perform the geospatial query using aggregation
    const result = await Venue.aggregate([
      {
        $geoNear: {
          near: point,
          ...geoOptions,
        },
      },
    ]);

    const venues = result.map((venue) => {
      return {
        id: venue._id,
        name: venue.name,
        address: venue.address,
        rating: venue.rating,
        menu: venue.menu,
        distance: venue.dist / 1000, // convert to kilometers
        comments: venue.comments.map((comment) => ({
          id: comment._id,
          user: comment.user,
          rating: comment.rating,
          text: comment.text,
          date: comment.date,
        })),
      };
    });

    if (venues.length > 0) createResponse(res, 200, venues);
    else
      createResponse(res, 200, {
        status: "error",
        message: "No venues found near the specified location",
        data: [],
      });
  } catch (error) {
    createResponse(res, 404, {
      status: "error",
      message: "Venue not found near the specified location",
    });
  }
};

// Get a specific venue by ID
const getVenue = async (req, res) => {
  try {
    const response = await Venue.findById(req.params.venueid).exec();

    if (response) {
      // Map the response to a simplified venue object
      const venue = {
        id: response._id,
        name: response.name,
        address: response.address,
        rating: response.rating,
        menu: response.menu,
        coordinates: response.coordinates,
        hours: response.hours,
        comments: response.comments.map((comment) => ({
          id: comment._id,
          user: comment.user,
          rating: comment.rating,
          text: comment.text,
          date: comment.date,
        })),
      };

      createResponse(res, 200, venue);
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

// Add a new venue to the database
const addVenue = async (req, res) => {
  try {
    // Only admin users can add new venues
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Only admin users can add new venues",
      });
    }

    // Parse coordinates and hours if they are sent as JSON strings
    let menu = req.body.menu;
    let coordinates = req.body.coordinates;
    let hours = req.body.hours;

    // Allow both JSON strings and already-parsed arrays/objects
    if (typeof menu === "string") {
      try {
        menu = JSON.parse(menu);
      } catch (error) {
        return createResponse(res, 400, {
          status: "error",
          message: "Invalid JSON for menu",
        });
      }
    }

    // Allow both JSON strings and already-parsed arrays/objects
    if (typeof coordinates === "string") {
      try {
        coordinates = JSON.parse(coordinates);
      } catch (error) {
        return createResponse(res, 400, {
          status: "error",
          message: "Invalid JSON for coordinates",
        });
      }
    }

    if (typeof hours === "string") {
      try {
        hours = JSON.parse(hours);
      } catch (error) {
        return createResponse(res, 400, {
          status: "error",
          message: "Invalid JSON for hours",
        });
      }
    }

    const response = await Venue.create({
      ...req.body,
      menu,
      coordinates,
      hours,
    });

    createResponse(res, 201, {
      status: "success",
      message: "Venue added",
      data: response,
    });
  } catch (error) {
    createResponse(res, 400, {
      status: "error",
      message: "Error adding venue because of " + error.message,
    });
  }
};

// Update an existing venue by ID
const updateVenue = async (req, res) => {
  try {
    // Only admin users can update venues
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Only admin users can update venues",
      });
    }

    // Parse coordinates and hours if they are sent as JSON strings
    let menu = req.body.menu;
    let coordinates = req.body.coordinates;
    let hours = req.body.hours;

    // Allow both JSON strings and already-parsed arrays/objects
    if (typeof menu === "string") {
      try {
        menu = JSON.parse(menu);
      } catch (error) {
        return createResponse(res, 400, {
          status: "error",
          message: "Invalid JSON for menu",
        });
      }
    }

    if (typeof coordinates === "string") {
      try {
        coordinates = JSON.parse(coordinates);
      } catch (error) {
        return createResponse(res, 400, {
          status: "error",
          message: "Invalid JSON for coordinates",
        });
      }
    }

    if (typeof hours === "string") {
      try {
        hours = JSON.parse(hours);
      } catch (error) {
        return createResponse(res, 400, {
          status: "error",
          message: "Invalid JSON for hours",
        });
      }
    }

    const updatedVenue = await Venue.findByIdAndUpdate(
      req.params.venueid,
      {
        ...req.body,
        menu,
        coordinates,
        hours,
      },
      { new: true }
    );

    if (updatedVenue) {
      // Map the updated venue to a simplified object
      const venue = {
        id: updatedVenue._id,
        name: updatedVenue.name,
        address: updatedVenue.address,
        rating: updatedVenue.rating,
        menu: updatedVenue.menu,
        coordinates: updatedVenue.coordinates,
        hours: updatedVenue.hours,
        comments: updatedVenue.comments.map((comment) => ({
          id: comment._id,
          user: comment.user,
          rating: comment.rating,
          text: comment.text,
          date: comment.date,
        })),
      };

      createResponse(res, 201, {
        status: "success",
        message: "Venue updated",
        data: venue,
      });
    } else {
      createResponse(res, 400, {
        status: "error",
        message: "Venue update failed: Venue not found",
      });
    }
  } catch (error) {
    createResponse(res, 400, {
      status: "error",
      message: "Venue update failed",
    });
  }
};

// Delete a venue by ID
const deleteVenue = async (req, res) => {
  try {
    // Only admin users can delete venues
    if (req.user.role !== "admin") {
      return res.status(403).json({
        status: "error",
        message: "Only admin users can delete venues",
      });
    }

    // Delete the venue from the database
    const venue = await Venue.findByIdAndDelete(req.params.venueid);
    if (venue) {
      createResponse(res, 200, {
        status: "success",
        message: venue.name + " named venue deleted",
      });
    } else {
      createResponse(res, 404, {
        status: "error",
        message: "Venue not found",
      });
    }
  } catch (error) {
    createResponse(res, 404, {
      status: "error",
      message: "Venue deletion failed",
    });
  }
};

module.exports = {
  listAllVenues,
  listVenuesByLocation,
  addVenue,
  getVenue,
  updateVenue,
  deleteVenue,
};
