import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div>
        <h1 style={{ color: "yellow", textAlign: "center", margin: "50px 0" }}>
          Loading....
        </h1>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
