// Import components
import Template from "./components/Template";
import Home from "./components/Home";
import VenueDetail from "./components/VenueDetail";
import AddComment from "./components/AddComment";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminPanel from "./components/AdminPanel";
import Logout from "./components/Logout";
import AuthInitializer from "./components/AuthInitializer";
import UserProtectedRoute from "./components/UserProtectedRoute";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import AddVenue from "./components/AddVenue";
import UpdateVenue from "./components/UpdateVenue";
import UpdateComment from "./components/UpdateComment";

// Importing react-router-dom components for routing
import { BrowserRouter as Router } from "react-router-dom";

// Importing Routes from react-router for defining application routes
import { Route, Routes } from "react-router";

// Importing Redux store and Provider to connect the app with Redux store for state management
import store from "./redux/store";

// Importing Provider from react-redux to make the Redux store available to the app components
import { Provider } from "react-redux";

// Main App component definition
function App() {
  return (
    <>
      {/* Wrapping the application with Provider to connect it to the Redux store*/}
      <Provider store={store}>
        {/* BrowserRouter provides the routing context for the application */}
        <Router
          future={{
            // Enable the new relative routing features in React Router v7
            v7_relativeSplatPath: true,
            v7_startTransition: true,
          }}
        >
          {/* Initialize authentication state on app load */}
          <AuthInitializer />

          {/* Define application routes */}
          <Routes>
            {/* Main route with Template component as the layout */}
            <Route path="/" element={<Template />}>
              {/* Index route for the home page */}
              <Route index element={<Home />} />

              {/* Route for user login page */}
              <Route
                path="login"
                element={
                  <UserProtectedRoute>
                    <Login />
                  </UserProtectedRoute>
                }
              />

              {/* Route for user signup page */}
              <Route
                path="signup"
                element={
                  <UserProtectedRoute>
                    <Signup />
                  </UserProtectedRoute>
                }
              />

              {/* Route for user logout */}
              <Route path="logout" element={<Logout />} />

              {/* Route for admin panel */}
              <Route
                path="admin"
                element={
                  <AdminProtectedRoute>
                    <AdminPanel />
                  </AdminProtectedRoute>
                }
              />

              {/* Route for adding a new venue */}
              <Route
                path="admin/venue/new"
                element={
                  <AdminProtectedRoute>
                    <AddVenue />
                  </AdminProtectedRoute>
                }
              />

              {/* Route for updating an existing venue */}
              <Route
                path="admin/venue/:venueID/update"
                element={
                  <AdminProtectedRoute>
                    <UpdateVenue />
                  </AdminProtectedRoute>
                }
              />

              {/* Dynamic route for venue details */}
              <Route path="venue/:venueID" element={<VenueDetail />} />

              {/* Route for adding comments to a specific venue */}
              <Route
                path="venue/:venueID/comment/new"
                element={
                  <AuthProtectedRoute>
                    <AddComment />
                  </AuthProtectedRoute>
                }
              />

              {/* Route for updating a specific comment */}
              <Route
                path="admin/venue/:venueID/comment/:commentID/update"
                element={
                  <AdminProtectedRoute>
                    <UpdateComment />
                  </AdminProtectedRoute>
                }
              />

              {/* Route for the About page */}
              <Route path="about" element={<About />} />

              {/* Catch-all route for handling 404 - Page Not Found */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
