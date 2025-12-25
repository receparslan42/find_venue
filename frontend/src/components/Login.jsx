import { NavLink, useNavigate } from "react-router";
import VenueDataService from "../services/VenueDataService";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

// Login component with a login form
export default function Login() {
  const dispatch = useDispatch(); // Redux dispatch function for state management

  // Get isError state from Redux store
  const isError = useSelector((state) => state.isError);

  // Handle form submission for login
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    dispatch({ type: "LOGIN_INIT" }); // Dispatch login init action if loading

    const email = event.target.emailInput.value;
    const password = event.target.passwordInput.value;

    if (email && password) {
      VenueDataService.login(email, password)
        .then((response) => {
          const { token } = response.data; // Destructure token and user from response data

          // Dispatch login success action with response data
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data });

          if (token) {
            localStorage.setItem("token", token); // Store token in local storage

            VenueDataService.setAuthToken(token); // Set auth token for future requests
          }
        })
        .catch(() => {
          dispatch({ type: "LOGIN_FAILURE" });
        });
    }
  };

  return (
    <>
      <div>
        <div className="row page-header">
          <div className="col-lg-12 " />
        </div>
        <div className="row" align="center">
          <div className="login col-md-6">
            {/* Login Form */}
            <form
              className="center form-horizontal"
              id="login"
              onSubmit={handleSubmit}
            >
              {/* Email Input */}
              <div className="form-group">
                <label
                  className="col-xs-10 col-sm-2 control-label"
                  id="emailLabel"
                  name="emailLabel"
                  htmlFor="emailInput"
                >
                  E-mail:
                </label>
                <div className="col-xs-12 col-sm-10">
                  <input
                    className="form-control"
                    id="emailInput"
                    name="emailInput"
                    defaultValue="admin@test.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label
                  className="col-xs-10 col-sm-2 control-label"
                  id="passwordLabel"
                  name="passwordLabel"
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
                    defaultValue="123456"
                  />
                </div>
              </div>
              {/* Submit Button and Sign Up Link */}
              <div className="form-group">
                <button
                  className="btn-login btn-default pull-right"
                  id="loginButton"
                  name="loginButton"
                  type="submit"
                >
                  Log In
                </button>

                <NavLink to="/signup" className="pull-right-href">
                  Sign Up
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Error Modal on Login Failure */}
      <Modal
        isOpen={isError}
        title="Login Error"
        message="Invalid email or password. Please try again."
        onClose={() => dispatch({ type: "STATUS_RESET" })}
      />
    </>
  );
}
