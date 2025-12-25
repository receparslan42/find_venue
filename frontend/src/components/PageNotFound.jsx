import Header from "./Header";

// Display a 404 Page Not Found message using the Header component
export default function PageNotFound() {
  return (
    <div>
      <Header
        headerText="404 Page Not Found"
        slogan="The page you are looking for does not exist."
      />
    </div>
  );
}
