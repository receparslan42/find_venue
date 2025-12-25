import InputWithLabel from "../components/InputWithLabel";
import VenueList from "../components/VenueList";
import Header from "../components/Header";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";

const Home = () => {
  // Get venues data from Redux store
  const venues = useSelector((state) => state.data);

  // State for user's geolocation coordinates
  const [coordinates, setCoordinates] = React.useState({ long: 1, lat: 1 });

  // State for search input
  const [searchVenue, setSearchVenue] = React.useState("");

  // Redux dispatch function
  const dispatch = useDispatch();

  // Get loading, error, and success states from Redux store
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchVenue(event.target.value);
  };

  // Get user's current geolocation on component mount
  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          long: position.coords.longitude,
          lat: position.coords.latitude,
        });
      });
    }
  }, []);

  // Fetch nearby venues when coordinates change
  React.useEffect(() => {
    dispatch({ type: "FETCH_DATA_INIT" });
    VenueDataService.nearbyVenues(coordinates.long, coordinates.lat)
      .then((response) => {
        dispatch({ type: "FETCH_DATA_SUCCESS", payload: response.data });
      })
      .catch(() => {
        dispatch({ type: "FETCH_DATA_FAILURE" });
      });
  }, [coordinates]);

  // Filter venues based on search input
  const filteredVenues = Array.isArray(venues)
    ? venues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
          venue.address.toLowerCase().includes(searchVenue.toLowerCase())
      )
    : [];

  return (
    <div>
      {/* Header Component */}
      <Header
        headerText="Find A Venue"
        slogan="The easiest way to find the right venue ..."
      />

      {/* Search Input */}
      <InputWithLabel
        id="search-venue"
        label="Search Venue:"
        type="search"
        isFocused
        value={searchVenue}
        onInputChange={handleSearchChange}
      />

      <hr />

      {/* Venue List */}
      <div className="row">
        {isError ? (
          <p>
            <strong>Something went wrong ...</strong>
          </p>
        ) : isLoading ? (
          <p>
            <strong>Venues are loading ...</strong>
          </p>
        ) : (
          isSuccess && (
            <div className="row">
              <VenueList venues={filteredVenues} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
