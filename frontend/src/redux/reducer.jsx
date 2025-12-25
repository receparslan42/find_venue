// Initial state for the Redux reducer
const initialState = {
  isError: false, // Flag to indicate if there was an error
  isLoading: false, // Flag to indicate if data is being loaded
  isSuccess: false, // Flag to indicate if the last operation was successful
  isDeleted: false, // Flag to indicate if a venue was deleted
  isVenueAddedUpdated: false, // Flag to indicate if a venue was added or updated
  authChecked: false, // Flag to indicate if authentication has been checked
  data: [], // Array to hold venue data
  auth: { token: null, user: null }, // Object to hold authentication data
};

// Redux reducer function to manage venue-related state
const venueReducer = (state = initialState, action) => {
  // Handle different action types to update the state accordingly
  switch (action.type) {
    // Handle status reset action
    case "STATUS_RESET":
      return {
        ...state,
        isError: false,
        isLoading: false,
        isSuccess: false,
      };

    // Handle login initiation action
    case "LOGIN_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };

    // Handle login success action
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        auth: {
          token: action.payload.token,
          user: action.payload.user,
        },
      };

    // Handle login failure action
    case "LOGIN_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true, // Set error flag on login failure
        isSuccess: false,
      };

    // Handle signup initiation action
    case "SIGNUP_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };

    // Handle signup success action
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };

    // Handle signup failure action
    case "SIGNUP_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true, // Set error flag on signup failure
        isSuccess: false,
      };

    // Handle logout action
    case "LOGOUT":
      return {
        ...initialState,
        authChecked: state.authChecked,
      }; // Reset state to initial state on logout

    // Handle authentication checked action
    case "AUTH_CHECKED":
      return {
        ...state,
        authChecked: true,
      };

    // Handle data fetch initiation action
    case "FETCH_DATA_INIT":
      return {
        ...state,
        isLoading: true,
        isDeleted: false,
        isSuccess: false,
      };

    // Handle data fetch success action
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: action.payload, // Update data on successful fetch
      };

    // Handle data fetch failure action
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true, // Set error flag on fetch failure
        isSuccess: false,
      };

    // Handle add comment success action
    case "ADD_COMMENT_SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };

    // Handle add comment failure action
    case "ADD_COMMENT_FAILURE":
      return {
        ...state,
        isSuccess: false,
        isError: true, // Set error flag on failure
      };

    // Handle delete comment success action
    case "DELETE_COMMENT_SUCCESS":
      return {
        ...state,
        isSuccess: true,
        data: {
          ...state.data,
          comments: state.data.comments.filter(
            (c) => c.id !== action.payload.commentID
          ),
        },
      };

    // Handle delete comment failure action
    case "DELETE_COMMENT_FAILURE":
      return {
        ...state,
        isSuccess: false,
        isError: true, // Set error flag on failure
      };

    // Handle update comment success action
    case "UPDATE_COMMENT_SUCCESS":
      return {
        ...state,
        isSuccess: true,
      };

    // Handle update comment failure action
    case "UPDATE_COMMENT_FAILURE":
      return {
        ...state,
        isSuccess: false,
        isError: true, // Set error flag on failure
      };

    // Handle add/update venue success action
    case "ADD_UPDATE_VENUE_SUCCESS":
      return {
        ...state,
        isVenueAddedUpdated: true, // Set flag on successful add/update
        isError: false,
      };

    // Handle add/update venue failure action
    case "ADD_UPDATE_VENUE_FAILURE":
      return {
        ...state,
        isVenueAddedUpdated: false, // Set flag on failure
        isError: true,
      };

    // Handle remove venue success action
    case "REMOVE_VENUE_SUCCESS":
      return {
        ...state,
        isDeleted: true, // Set deletion flag to true on success
        data: state.data.filter((venue) => venue.id !== action.payload), // Remove deleted venue from data
      };

    // Handle remove venue failure action
    case "REMOVE_VENUE_FAILURE":
      return {
        ...state,
        isDeleted: false, // Set deletion flag to false on failure
      };

    // Default case to return current state
    default:
      return state; // Return current state for unhandled action types
  }
};

export default venueReducer;
