// ConfigureStore: Simplifies store setup with good defaults
import { configureStore } from "@reduxjs/toolkit";
import venueReducer from "./reducer";

// Create and configure the Redux store with the venue reducer
const store = configureStore({
  reducer: venueReducer, // Assign the venueReducer to handle state updates
});

export default store;
