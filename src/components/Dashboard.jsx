import React from "react";
import { Typography, Paper, Grid2, Box } from "@mui/material";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session } = UserAuth();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6">Welcome {session?.user?.email}</Typography>

      <Grid2 container spacing={5} sx={{ mt: 10 }}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              My Profile
            </Typography>
          </Paper>
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Your Upcoming Events
            </Typography>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
