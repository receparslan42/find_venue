import { Navigate } from "react-router";
import { useSelector } from "react-redux";

// AuthProtectedRoute component to protect authenticated routes
export default function AuthProtectedRoute({ children }) {
  // Get auth and authChecked state from Redux store
  const auth = useSelector((state) => state.auth);
  const authChecked = useSelector((state) => state.authChecked);

  // Check if authentication status is still being verified
  if (!authChecked) return <div>Loading...</div>;

  // Redirect to login if user is not authenticated
  if (!auth.user) return <Navigate to="/login" replace />;

  return children;
}
