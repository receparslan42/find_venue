import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import VenueDataService from "../services/VenueDataService";

// AuthInitializer component to initialize authentication state from local storage
export default function AuthInitializer() {
  const dispatch = useDispatch();

  // On component mount, check for existing auth token in local storage
  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // If token exists, decode it and update Redux store
    if (token) {
      try {
        const decodedUser = jwtDecode(token);

        // Check if the token is expired
        if (decodedUser.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          return;
        }

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { token, user: decodedUser },
        });

        VenueDataService.setAuthToken(token);
      } catch {
        localStorage.removeItem("token");
      }
    }

    // Indicate that the authentication check is complete
    dispatch({ type: "AUTH_CHECKED" });
  }, [dispatch]);

  return null;
}
