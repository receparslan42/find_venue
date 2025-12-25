import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import VenueDataService from "../services/VenueDataService";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Remove token from local storage

    VenueDataService.setAuthToken(null); // Clear auth token in service

    dispatch({ type: "LOGOUT" }); // Dispatch logout action to Redux store

    navigate("/", { replace: true }); // Redirect to home page after logout
  }, [dispatch, navigate]);

  return null;
}
