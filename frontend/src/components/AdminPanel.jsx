import React from "react";
import { useSelector, useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";
import InputWithLabel from "./InputWithLabel";
import VenueList from "./VenueList";
import Header from "./Header";
import useInactivityLogout from "../hooks/useInactivityLogout";

// AdminPanel component for managing venues and comments
export default function AdminPanel() {
  const remainingTime = useInactivityLogout(10000); // Inactivity logout after 10 seconds

  // Get venues data from Redux store
  const venues = useSelector((state) => state.data);

  // State for search input
  const [searchVenue, setSearchVenue] = React.useState("");

  const dispatch = useDispatch(); // Dispatch function for Redux actions

  // Get loading, error, and success states from Redux store
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state.isError);
  const isSuccess = useSelector((state) => state.isSuccess);

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchVenue(event.target.value);
  };

  // Filter venues based on search input
  const filteredVenues = Array.isArray(venues)
    ? venues.filter(
        (venue) =>
          venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
          venue.address.toLowerCase().includes(searchVenue.toLowerCase())
      )
    : [];

  // Fetch all venues on component mount
  React.useEffect(() => {
    dispatch({ type: "FETCH_DATA_INIT" }); // Dispatch fetch data initiation action

    VenueDataService.listAllVenuesByAdmin()
      .then((response) => {
        dispatch({ type: "FETCH_DATA_SUCCESS", payload: response.data });
      })
      .catch(() => {
        dispatch({ type: "FETCH_DATA_FAILURE" });
      });
  }, []);

  return (
    <>
      {/* Header Component for Admin Panel */}
      <Header
        headerText="Admin Panel"
        slogan={`Manage Venues ... (Auto logout in ${remainingTime}s)`}
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

      {/* Add Venue Button */}
      <div className="col-xs-12 col-sm-12">
        <div className="row">
          <div className="column pull-right">
            <span className="btn pull-right">
              <button
                className="btn btn-success pull-right"
                id="add-venue-btn"
                name="add-venue-btn"
                onClick={() => (window.location.href = "/admin/venue/new")}
              >
                Add Venue
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
