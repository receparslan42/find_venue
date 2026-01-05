// Utility function for formatting dates
export function formatDate(d) {
  var date = new Date(d);

  return {
    time: date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };
}

// Utility function for formatting distances
export function formatDistance(distance) {
  var newDistance, unit;

  // Kilometers and Meters conversion
  if (distance >= 1) {
    newDistance = parseFloat(distance).toFixed(1);
    unit = " km";
  } else {
    newDistance = parseInt(distance * 1000, 10);
    unit = " m";
  }

  return newDistance + unit;
}
