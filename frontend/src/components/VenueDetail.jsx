import { NavLink, useParams } from "react-router";
import Rating from "./Rating";
import Menu from "./Menu";
import Header from "./Header";
import HourList from "./HourList";
import CommentList from "./CommentList";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import VenueDataService from "../services/VenueDataService";

const VenueDetail = () => {
  // Access venue-related state from Redux store
  const isLoading = useSelector((state) => state.isLoading);
  const isError = useSelector((state) => state.isError);

  // Access the venue data from Redux store
  const venue = useSelector((state) => state.data);

  // Redux dispatch function for state management
  const dispatch = useDispatch();

  // Get venue ID from URL parameters
  const { venueID } = useParams();

  // Fetch venue details when venueId changes
  React.useEffect(() => {
    dispatch({ type: "FETCH_DATA_INIT" });
    VenueDataService.getVenueByID(venueID)
      .then((response) => {
        dispatch({ type: "FETCH_DATA_SUCCESS", payload: response.data });
      })
      .catch(() => {
        dispatch({ type: "FETCH_DATA_FAILURE" });
      });
  }, [venueID, dispatch]);

  // Handle loading and error states
  if (isLoading) {
    return (
      <Header
        headerText="Loading venue ..."
        slogan="Please wait while we fetch the venue details."
      />
    );
  }

  if (isError) {
    return (
      <Header
        headerText="An error occurred !"
        slogan="Unable to load the venue details right now."
      />
    );
  }

  // If venue data is missing or not in the expected object shape, display a not-found message
  if (!venue || Array.isArray(venue)) {
    return (
      <Header
        headerText="Venue not found !"
        slogan="Please check the URL and try again."
      />
    );
  }

  return (
    <>
      {/* Header component displaying the venue name */}
      <Header headerText={venue.name} />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                {/* Rating component displaying the venue rating */}
                <p className="rating">
                  <Rating rating={venue.rating} />
                </p>

                {/* Display the venue address */}
                <p>{venue.address}</p>

                {/* Opening Hours card */}
                <div className="panel panel-primary">
                  {/* Panel heading for Opening Hours */}
                  <div className="panel-heading">
                    <h2 className="panel-title">Opening Hours</h2>
                  </div>

                  {/* Panel body containing the HourList component */}
                  <div className="panel-body">
                    <HourList hourList={venue.hours || []} />
                  </div>
                </div>

                {/* Food & Drink card */}
                <div className="panel panel-primary">
                  {/* Panel heading for Food & Drink Menu */}
                  <div className="panel-heading">
                    <h2 className="panel-title">Food & Drink Menu</h2>
                  </div>

                  {/* Panel body containing the Menu component */}
                  <div className="panel-body">
                    <Menu menu={venue.menu || []} />
                  </div>
                </div>
              </div>

              {/* Display the venue location on a static Google Map */}
              <div className="col-xs-12 col-sm-6">
                <div className="panel panel-primary">
                  {/* Panel heading for Location */}
                  <div className="panel-heading">
                    <h2 className="panel-title">Location</h2>
                  </div>

                  {/* Panel body containing the dynamic Google Map */}
                  <div className="panel-body">
                    <iframe
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${venue.coordinates[1]},${venue.coordinates[0]}&hl=es&z=16&output=embed`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Display the comments section */}
          <div className="row">
            <div className="col-xs-12">
              <div className="panel panel-primary">
                {/* Panel heading for Comments */}
                <div
                  className="panel-heading"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Panel title */}
                  <h1 className="panel-title">Comments</h1>

                  {/* NavLink to add a new comment */}
                  <NavLink
                    className="btn btn-default"
                    to={`/venue/${venueID}/comment/new`}
                    state={{ name: venue.name }}
                  >
                    Add Comment
                  </NavLink>
                </div>

                {/* Panel body containing the CommentList component */}
                <div className="panel-body">
                  <CommentList comments={venue.comments || []} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VenueDetail;
