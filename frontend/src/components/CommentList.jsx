import Comment from "./Comment";

// Component to render a list of comments
const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return comments.map((comment, index) => {
    const key = comment._id || comment.id || `${comment.user}-${comment.date}-${index}`;
    return <Comment key={key} comment={comment} />;
  });
};

export default CommentList;
