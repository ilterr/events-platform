import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session, userRole } = UserAuth();
  console.log(userRole);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6">Welcome {session?.user?.email}</Typography>

      <Grid container spacing={5} sx={{ mt: 5 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Profile
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Upcoming Events
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {userRole === "staff" && (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography
              component={Link}
              to="/createevent"
              variant="h6"
              gutterBottom
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              Create an Event
            </Typography>
          </Paper>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
