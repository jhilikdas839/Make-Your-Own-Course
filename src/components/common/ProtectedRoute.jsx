import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ROLE_HOME } from "../../utils/auth";

/**
 * Lets a user in only if they are logged in with one of `roles`.
 * The super admin can open every panel.
 */
function ProtectedRoute({ roles, children }) {
  const session = useAuth();
  const location = useLocation();

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const role = session.user.role;
  if (role !== "admin" && !roles.includes(role)) {
    return <Navigate to={ROLE_HOME[role] || "/"} replace />;
  }

  return children;
}

export default ProtectedRoute;
