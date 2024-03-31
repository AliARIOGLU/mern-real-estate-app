import "./layout.scss";

import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { Navbar } from "../../components/navbar/navbar";
import { useAuth } from "../../context/auth-context";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useAuth();

  return !currentUser ? (
    <Navigate to="login" />
  ) : (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export { Layout, RequireAuth };
