import { Outlet } from "react-router"; // Outlet: Placeholder for nested routes
import NavBar from "./NavBar";
import Footer from "./Footer";

const Template = () => {
  return (
    <>
      <NavBar /> {/* Navigation bar component */}
      <div className="container">
        {/* Main content area */}
        <Outlet /> {/* Renders the matched child route component */}
        <Footer /> {/* Footer component */}
      </div>
    </>
  );
};

export default Template;
