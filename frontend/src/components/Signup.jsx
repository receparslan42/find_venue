import { NavLink, useNavigate } from "react-router";
import VenueDataService from "../services/VenueDataService";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

// Signup component with a registration form
export default function Signup() {
  const dispatch = useDispatch(); // Redux dispatch function for state management

  const navigate = useNavigate(); // Navigation function from react-router

  // Select relevant state from Redux store
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.isLoading);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    dispatch({ type: "SIGNUP_INIT" }); // Dispatch signup initiation action

    // Get form input values
    const name = event.target.nameInput.value;
    const surname = event.target.surnameInput.value;
    const email = event.target.emailInput.value;
    const password = event.target.passwordInput.value;

    // Proceed with signup if all fields are filled
    if (name && surname && email && password) {
      VenueDataService.signup(name, surname, email, password)
        .then((response) => {
          dispatch({ type: "SIGNUP_SUCCESS" });

          // On successful signup, navigate to login page
          if (response.data) navigate("/login");
        })
        .catch(() => {
          dispatch({ type: "SIGNUP_FAILURE" });
        });
    }
  };

  return (
    <>
      <div className="row page-header">
        <div className="col-lg-12 " />
      </div>
      <div className="row" align="center">
        <div className="login col-md-6">
          {/* Signup Form */}
          <form
            className="center form-horizontal"
            id="login"
            onSubmit={handleSubmit}
          >
            {/* Name Input */}
            <div className="form-group">
              <label
                className="col-xs-10 col-sm-2 control-label"
                id="nameLabel"
                htmlFor="nameInput"
              >
                Name:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  id="nameInput"
                  name="nameInput"
                />
              </div>
            </div>

            {/* Surname Input */}
            <div className="form-group">
              <label
                className="col-xs-10 col-sm-2 control-label"
                id="surnameLabel"
                htmlFor="surnameInput"
              >
                Surname:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  id="surnameInput"
                  name="surnameInput"
                />
              </div>
            </div>

            {/* E-mail Input */}
            <div className="form-group">
              <label
                className="col-xs-10 col-sm-2 control-label"
                id="emailLabel"
                htmlFor="emailInput"
              >
                E-mail:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  id="emailInput"
                  name="emailInput"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label
                className="col-xs-10 col-sm-2 control-label"
                id="passwordLabel"
                htmlFor="passwordInput"
              >
                Password:
              </label>
              <div className="col-xs-12 col-sm-10">
                <input
                  className="form-control"
                  id="passwordInput"
                  name="passwordInput"
                  type="password"
                />
              </div>
            </div>
            {/* Submit Button and Log In Link */}
            <div className="form-group">
              {/* Sign Up Button */}
              <button
                className="btn-login btn-default pull-right"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>

              {/* Link to Log In page */}
              <NavLink to="/login" className="pull-right-href">
                Log In
              </NavLink>
            </div>
          </form>
        </div>
      </div>

      {/* Error Modal */}
      {isError && (
        <Modal
          isOpen={true}
          title="Signup Error"
          message="An error occurred during signup. Please try again."
          onClose={() => {
            dispatch({ type: "STATUS_RESET" });
          }}
        />
      )}
    </>
  );
}
