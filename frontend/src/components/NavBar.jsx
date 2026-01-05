import { NavLink } from "react-router";
import { useSelector } from "react-redux";

// Navigation bar component (Bootstrap 4 compatible)
export default function NavBar() {
  // Get user information from Redux store
  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="navbar-default navbar">
      <div className="container">
        <div className="navbar-header">
          {/* Brand link to home page */}
          <ul className="nav navbar-nav navbar-left">
            <li className="mr-30">
              <NavLink className="navbar-brand" to="/">
                Find Venue
              </NavLink>
            </li>

            {/* Mobile menu toggle button */}
            <button
              className="navbar-toggle"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-main"
            >
              {/* Hamburger icon for mobile view */}
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </ul>
        </div>

        {/* Collapsible menu items */}
        <div className="navbar-collapse collapse" id="navbar-main">
          {/* Left-aligned items */}
          <ul className="nav navbar-nav navbar-left">
            {/* Link to About page */}
            <li>
              <NavLink className="navbar-brand" to="/about">
                {" "}
                About{" "}
              </NavLink>
            </li>
          </ul>

          {/* Right-aligned items */}
          <ul className="nav navbar-nav navbar-right">
            {/* Admin link */}
            {user?.role === "admin" && (
              <li>
                <NavLink className="navbar-brand" to="/admin">
                  Admin Panel
                </NavLink>
              </li>
            )}

            {/* User authentication links */}
            {user ? (
              <>
                <li>
                  <p
                    className="navbar-text"
                    style={{ margin: 0, padding: "15px" }}
                  >
                    {user.email}
                  </p>
                </li>
                <li>
                  <NavLink className="navbar-brand" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink className="navbar-brand" to="/login">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
