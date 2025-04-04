import React from "react";
import {
  Typography,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useUserEvents } from "../hooks/useUserEvents";

const Dashboard = () => {
  const theme = useTheme();
  const { session, userRole } = UserAuth();
  const userId = session?.user?.id;
  const { events: myEvents, isLoading, error } = useUserEvents(userId);
  const navigate = useNavigate();

  const navigateToEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: theme.palette.primary.main,
          fontSize: { xs: "1.5rem", md: "2rem" },
          mb: 1,
        }}
      >
        Dashboard
      </Typography>
      <Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
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
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: `0 8px 16px ${theme.palette.primary.main}`,
                transform: "translateY(-5px)",
              },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
              }}
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
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: `0 8px 16px ${theme.palette.primary.main}`,
                transform: "translateY(-5px)",
              },
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
              <Box
                sx={{ display: "flex", justifyContent: "center" }}
                role="status"
                aria-live="polite"
              >
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
                    onClick={() => navigateToEvent(event.id)}
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              sx={{
                p: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
                boxShadow: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: `0 8px 16px ${theme.palette.primary.main}`,
                  transform: "translateY(-5px)",
                },
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
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: theme.palette.secondary.main,
                  },
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
