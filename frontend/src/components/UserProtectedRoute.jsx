import { Navigate } from "react-router";
import { useSelector } from "react-redux";

// UserProtectedRoute component to protect routes for unauthenticated users
export default function UserProtectedRoute({ children }) {
  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // Get authChecked state from Redux store
  const authChecked = useSelector((state) => state.authChecked);

  // Destructure user from auth state
  if (!authChecked) return <div>Loading...</div>;

  // Destructure user from auth state
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;

    return <Navigate to="/" replace />;
  }

  return children;
}
