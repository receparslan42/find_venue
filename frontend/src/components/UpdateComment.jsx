import Header from "./Header";
import Modal from "./Modal";
import React from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import VenueDataService from "../services/VenueDataService";
import { formatDate } from "../services/Utils";
import { useDispatch, useSelector } from "react-redux";

// Component for adding a comment to a venue
export default function UpdateComment() {
  const { venueID, commentID } = useParams(); // Get venue ID and comment ID from URL parameters

  const venue = useSelector((state) => state.data); // Get venue data from Redux store

  const navigate = useNavigate(); // Navigation function for redirection

  const dispatch = useDispatch(); // Redux dispatch function for state management

  const [isOpen, setIsOpen] = React.useState(false); // State for modal visibility

  // State for form data
  const [form, setForm] = React.useState({
    text: "",
    rating: "",
  });

  // Fetch venue data on component mount
  React.useEffect(() => {
    VenueDataService.getVenueByID(venueID).then((res) => {
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: res.data,
      });
    });
  }, []);

  // Find the specific comment to be updated
  const comment = venue?.comments?.find((c) => c.id === commentID);

  // Populate form with existing comment data
  React.useEffect(() => {
    if (!comment) return;

    setForm({
      text: comment.text,
      rating: comment.rating.toString(),
    });
  }, [comment]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent refresh on form submission

    const payload = {
      text: form.text,
      rating: Number(form.rating),
    };

    VenueDataService.updateComment(venueID, commentID, payload)
      .then(() => {
        // Dispatch success action to Redux store
        dispatch({ type: "UPDATE_COMMENT_SUCCESS", payload: payload });
        setIsOpen(true); // Show confirmation modal on successful submission
      })
      .catch((e) => {
        dispatch({ type: "UPDATE_COMMENT_FAILURE" });
      });
  };

  return (
    <>
      {/* Header component with venue name and slogan */}
      <Header
        headerText={venue.name}
        slogan=" Please update your comment below"
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
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
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
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
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
        title="Comment Updated"
        message="Comment has been successfully updated!"
      />
    </>
  );
}
