import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  if (session === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  return session ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
