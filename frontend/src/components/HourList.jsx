// Component to display a list of operating hours
const HourList = ({ hourList }) => {
  return hourList.map((hour, index) => (
    <p key={index}>
        {/* Display day and operating hours like Monday: 9:00 AM - 5:00 PM */}
      {hour.days}: {hour.open} - {hour.close}
    </p>
  ));
};

export default HourList;