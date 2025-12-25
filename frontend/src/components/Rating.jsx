// Rating component to display star ratings
export default function Rating({ rating }) {
  const stars = []; // Create an array to hold star elements

  // Add stars (filled and empty)
  for (let i = 0; i < 5; i++) {
    const className =
      i < rating
        ? "glyphicon glyphicon-star"
        : "glyphicon glyphicon-star-empty";
    stars.push(<span key={i} className={className}></span>);
  }

  return stars;
}
