import React from "react";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useUserEvents } from "../hooks/useUserEvents";

const Dashboard = () => {
  const { session, userRole } = UserAuth();
  const userId = session?.user?.id;
  const { events: myEvents, isLoading, error } = useUserEvents(userId);
  const navigate = useNavigate();

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <Box sx={{ p: 4, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Welcome
      </Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              My Profile
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Paper
            sx={{
              p: 3,
              height: "auto",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Your Upcoming Events
            </Typography>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={24} />
              </Box>
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : myEvents.length > 0 ? (
              <List>
                {myEvents.map((event) => (
                  <ListItem
                    key={event.id}
                    sx={{
                      cursor: "pointer",
                      mb: 2,
                    }}
                    onClick={() => handleEventClick(event.id)}
                  >
                    <ListItemText
                      primary={event.name}
                      secondary={
                        <Typography variant="body2">
                          {event.event_date.replace(/-/g, "/") +
                            " at " +
                            event.start_time.slice(0, 5)}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No upcoming events</Typography>
            )}
          </Paper>
        </Grid>

        {userRole === "staff" && (
          <Grid xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography
                component={Link}
                to="/createevent"
                variant="h6"
                gutterBottom
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontWeight: "bold",
                  flexGrow: 1,
                }}
              >
                Create an Event
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Dashboard;
