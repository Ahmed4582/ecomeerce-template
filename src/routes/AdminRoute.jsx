import { Navigate, Outlet } from "react-router-dom";

function getStoredAuth() {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function hasToken() {
  return !!localStorage.getItem("token");
}

function isAdminRole() {
  const auth = getStoredAuth();
  const role = auth?.user?.role ?? auth?.user?.role_Name ?? auth?.role;
  return String(role || "")
    .toLowerCase()
    .includes("admin");
}

const AdminRoute = () => {
  if (!hasToken()) return <Navigate to="/login" replace />;
  if (!isAdminRole()) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default AdminRoute;

