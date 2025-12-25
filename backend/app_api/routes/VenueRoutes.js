const router = require("express").Router(); // Create router instance for routing

const requireAuth = require("../middleware/auth"); // Import authentication middleware

var venueController = require("../controller/VenueController"); // Import venue controller

// Route for admin to list all venues, protected by authentication middleware
router.route("/admin").get(requireAuth, venueController.listAllVenues);

// Routes for venues - listing and adding venues
router
  .route("/venues")
  .get(venueController.listVenuesByLocation)
  .post(requireAuth, venueController.addVenue);

// Routes for specific venue by venue ID for getting, updating, deleting venue
router
  .route("/venues/:venueid")
  .get(venueController.getVenue)
  .put(requireAuth, venueController.updateVenue)
  .delete(requireAuth, venueController.deleteVenue);

// Export the router module for use in the main app
module.exports = router;
