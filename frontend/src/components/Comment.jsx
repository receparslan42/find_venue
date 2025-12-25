import Rating from "./Rating";
import { formatDate } from "../services/Utils";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import VenueDataService from "../services/VenueDataService";
import Modal from "./Modal";
import React from "react";

// Comment component to display individual comments
const Comment = ({ comment, index }) => {
  // Get user data from Redux store
  const isAdmin = useSelector((state) => state.auth.user)?.role === "admin";

  const dispatch = useDispatch(); // Redux dispatch function

  const navigate = useNavigate(); // Navigation function

  const { venueID } = useParams(); // Get venue ID from URL parameters

  const commentID = comment.id; // Get comment ID

  const [showModal, setShowModal] = React.useState(false); // State for modal visibility

  // Handler for updating a comment
  const handleUpdate = () => {
    navigate(`/admin/venue/${venueID}/comment/${commentID}/update`);
  };

  // Handler for deleting a comment
  const handleDelete = () => {
    // Confirm deletion action
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    VenueDataService.deleteComment(venueID, commentID)
      .then(() => {
        dispatch({
          type: "DELETE_COMMENT_SUCCESS",
          payload: { commentID },
        });
        setShowModal(true);
      })
      .catch(() => {
        dispatch({ type: "DELETE_COMMENT_FAILURE" });
      });
  };

  return (
    <>
      <div key={index} className="row">
        <div className="review">
          <div className="well well-sm review-header">
            {/* Display the rating using the Rating component */}
            <span className="rating">
              <Rating rating={comment.rating} />
            </span>
            {/* Display the comment user's name */}
            &nbsp;
            <span className="review-author">{comment.user}</span>
          </div>

          {/* Display the comment text */}
          <div className="col-xs-12">
            <p className="commentText">{comment.text}</p>

            <div className="reviewFooter">
              <small className="reviewTimestamp">
                {formatDate(comment.date)}
              </small>
            </div>
          </div>

          {/* Admin Controls: Update and Delete Buttons */}
          {isAdmin && (
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
        </div>
      </div>

      {/* Modal for deletion confirmation */}
      {showModal && (
        <Modal
          isOpen={showModal}
          title="Comment Deleted"
          message="The comment has been successfully deleted."
          onClose={() => {
            dispatch({ type: "STATUS_RESET" });
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};

export default Comment;
