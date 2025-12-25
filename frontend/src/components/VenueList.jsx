import Venue from "./Venue";

// VenueList component to render a list of venues
const VenueList = ({ venues }) => {
  // Check if venues exist and map through them to render Venue components
  return venues && venues.length > 0 ? (
    venues.map((venue) => <Venue key={venue.id} venue={venue} />)
  ) : (
    <p>No venues available.</p>
  );
};

export default VenueList;
