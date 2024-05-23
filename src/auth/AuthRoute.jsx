import React from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const { user } = useAuth();
  const location = useLocation;
  console.log(user);
  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to={"/profile"}
      replace
      state={{ path: location.pathname }}
      alert={"User tidak bisa menuju ke halaman admin"}
    />
  );
};

export default AuthRoute;
