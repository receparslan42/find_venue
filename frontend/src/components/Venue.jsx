import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import Menu from "./Menu";
import { formatDistance } from "../services/Utils";
import VenueDataService from "../services/VenueDataService";
import Modal from "./Modal";
import React from "react";

// Venue component to display individual venue details
const Venue = ({ venue }) => {
  const location = useLocation(); // Get current location

  const dispatch = useDispatch(); // Redux dispatch function

  const navigate = useNavigate(); // Navigation function

  const [showModal, setShowModal] = React.useState(false); // State for modal visibility

  // Get user data from Redux store
  const isAdmin = useSelector((state) => state.auth.user)?.role === "admin";

  const isAdminPage = location.pathname.startsWith("/admin"); // Check if current page is admin page

  const showAdminControls = isAdmin && isAdminPage; // Determine if admin controls should be shown

  // Handler for updating a venue
  const handleUpdate = () => {
    navigate(`/admin/venue/${venue.id}/update`);
  };

  // Handler for deleting a venue
  const handleDelete = () => {
    // Confirm deletion action
    if (!window.confirm("Are you sure you want to delete this venue?")) return;

    VenueDataService.deleteVenue(venue.id)
      .then(() => {
        dispatch({
          type: "REMOVE_VENUE_SUCCESS",
          payload: venue.id,
        });

        setShowModal(true); // Show success modal
      })
      .catch(() => {
        dispatch({ type: "REMOVE_VENUE_FAILURE" });
      });
  };

  return (
    <>
      <div className="list-group">
        <div className="col-xs-12 col-sm-12">
          <div className="col-xs-12 list-group-item">
            <h4>
              {/* Venue Name as NavLink */}
              <NavLink to={`/venue/${venue.id}`}>{venue.name} &nbsp;</NavLink>

              {/* Venue Rating */}
              <Rating rating={venue.rating} />
            </h4>

            {/* Venue Distance Badge for non-admin users */}
            {!showAdminControls && (
              <span className="badge pull-right badge-default">
                {formatDistance(venue.distance)}
              </span>
            )}

            {/* Admin Controls: Update and Delete Buttons */}
            {showAdminControls && (
              <>
                <span className="btn pull-right">
                  <button
                    className="btn btn-info pull-right"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </span>

                <span className="btn pull-right">
                  <button
                    className="btn btn-primary pull-right"
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </span>
              </>
            )}

            {/* Venue Address */}
            <p className="mb-2 address">{venue.address}</p>

            {/* Food and Drink List */}
            <Menu menu={venue.menu} />
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          dispatch({ type: "STATUS_RESET" });
          setShowModal(false);
        }}
        title="Success"
        message="Venue deleted successfully."
      />
    </>
  );
};

export default Venue;
