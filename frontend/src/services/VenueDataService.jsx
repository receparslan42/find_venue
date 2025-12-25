import http from "./http-common";

// Venue Data Service for interacting with venue-related API endpoints
class VenueDataService {
  // Set authorization token for subsequent requests
  setAuthToken(token) {
    if (token) http.defaults.headers.common["Authorization"] = token;
    else delete http.defaults.headers.common["Authorization"];
  }

  // User login
  login(email, password) {
    return http.post("/login", { email, password });
  }

  // User signup
  signup(name, surname, email, password) {
    return http.post("/signup", { name, surname, email, password });
  }

  // List all venues with authorization
  listAllVenuesByAdmin() {
    return http.get("/admin");
  }

  // Get nearby venues based on latitude and longitude
  nearbyVenues(longitude, latitude) {
    return http.get(`/venues?lat=${latitude}&long=${longitude}`);
  }

  // Get venue by ID
  getVenueByID(venueID) {
    return http.get(`/venues/${venueID}`);
  }

  // Add new venue
  addVenue(venue) {
    return http.post("/venues", venue);
  }

  // Update existing venue
  updateVenue(id, venue) {
    return http.put(`/venues/${id}`, venue);
  }

  // Delete venue by ID
  deleteVenue(id) {
    return http.delete(`/venues/${id}`);
  }

  // Add comment to a venue
  addComment(id, comment) {
    return http.post(`/venues/${id}/comments`, comment);
  }

  // Update comment by ID for a venue
  updateComment(venueID, commentID, comment) {
    return http.put(`/venues/${venueID}/comments/${commentID}`, comment);
  }

  // Delete comment by ID for a venue
  deleteComment(venueID, commentID) {
    return http.delete(`/venues/${venueID}/comments/${commentID}`);
  }
}

export default new VenueDataService(); // Exporting an instance of VenueDataService
