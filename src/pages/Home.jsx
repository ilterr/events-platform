import React from "react";
import EventList from "../components/EventList";
import { Box, Typography } from "@mui/material";
const Home = () => {
  return (
    <div>
      <Box
        sx={{
          background: "linear-gradient(135deg, #2A4365 0%, #38A169 100%)",
          color: "white",
          py: 6,
          px: 4,
          mb: 5,
          borderRadius: 2,
          textAlign: "center",
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Community Events
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
          Discover and join local sports events that bring people together
        </Typography>
      </Box>
      <EventList />
    </div>
  );
};

export default Home;
