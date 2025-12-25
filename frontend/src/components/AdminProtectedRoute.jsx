import { Navigate } from "react-router";
import { useSelector } from "react-redux";

// AdminProtectedRoute component to protect admin routes
export default function AdminProtectedRoute({ children }) {
  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  // Get authChecked state from Redux store
  const authChecked = useSelector((state) => state.authChecked);

  // Destructure user from auth state
  if (!authChecked) return <div>Loading...</div>;

  // Destructure user from auth state
  if (!user) return <Navigate to="/login" replace />;

  // Destructure user from auth state
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return children;
}
