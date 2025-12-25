import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import VenueDataService from "../services/VenueDataService";

export default function useInactivityLogout(timeout = 10000) {
  const timerRef = useRef(null); // Ref to store the inactivity timer
  const intervalRef = useRef(null); // Ref to store the interval for checking inactivity

  const [remainingTime, setRemainingTime] = useState(timeout / 1000);

  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Navigation function from react-router

  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // Set up inactivity logout effect
  useEffect(() => {
    if (!user) return; // If no user is logged in, do nothing

    // Logout function to be called on inactivity
    const logout = () => {
      localStorage.removeItem("token");
      VenueDataService.setAuthToken(null);
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    };

    // Function to reset the inactivity timer
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      setRemainingTime(timeout / 1000); // Reset remaining time

      timerRef.current = setTimeout(logout, timeout); // Set new timer for logout

      // Set interval to update remaining time every second
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    };

    resetTimer(); // Initialize the timer on mount

    // List of events to listen for user activity
    const events = ["mousemove", "keydown", "click", "scroll"];

    // Add event listeners to reset the timer on user activity
    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Cleanup function to remove event listeners and clear timer
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [user, dispatch, navigate, timeout]);

  return remainingTime;
}
