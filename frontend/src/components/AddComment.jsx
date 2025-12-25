import Header from "./Header";
import Modal from "./Modal";
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import VenueDataService from "../services/VenueDataService";
import { formatDate } from "../services/Utils";
import { useDispatch } from "react-redux";

// Component for adding a comment to a venue
export default function AddComment() {
  const { venueID } = useParams(); // Get venue ID from URL parameters

  const location = useLocation(); // Get current location

  const navigate = useNavigate(); // Navigation function for redirection

  const dispatch = useDispatch(); // Redux dispatch function for state management

  const [isOpen, setIsOpen] = React.useState(false); // State for modal visibility

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent refresh on form submission

    const text = e.target.elements.comment.value; // Get comment from form input
    const rating = parseInt(e.target.elements.rating.value); // Get rating from form input
    const date = formatDate(new Date()); // Current date

    // Create comment object
    if (text && rating) {
      const newComment = { text, venueID, rating, date };

      VenueDataService.addComment(venueID, newComment)
        .then(() => {
          // Dispatch success action to Redux store
          dispatch({ type: "ADD_COMMENT_SUCCESS", payload: newComment });
          // Show confirmation modal on successful submission
          setIsOpen(true);
        })
        .catch((e) => {
          dispatch({ type: "ADD_COMMENT_FAILURE" });
        });
    }
  };

  return (
    <>
      {/* Header component with venue name and slogan */}
      <Header
        headerText={location.state.name}
        slogan=" Please leave a comment below"
      />

      {/* Comment Form */}
      <div className="row">
        <div className="col-xs-12 col-md-6">
          <form
            className="form-horizontal"
            id="addComment"
            onSubmit={handleSubmit}
          >
            {/* Rating Select */}
            <div className="form-group">
              <label
                className="col-xs-10 col-sm-2 control-label"
                htmlFor="rating"
              >
                Rate:
              </label>

              <div className="col-xs-12 col-sm-3">
                <select
                  className="form-control form-control-sm"
                  id="rating"
                  name="rating"
                >
                  <option value="">Select...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="comment">
                Comment:
              </label>

              <div className="col-sm-10">
                <textarea
                  className="review form-control"
                  rows="5"
                  id="comment"
                  name="comment"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-default pull-right">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Modal for submission confirmation */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          dispatch({ type: "STATUS_RESET" });
          navigate(`/venue/${venueID}`); // Navigate back to the venue detail page
          setIsOpen(false);
        }}
        title="Comment Submitted"
        message="Thank you for your comment!"
      />
    </>
  );
}
