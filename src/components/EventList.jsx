import { Box, Typography, Grid2, CircularProgress, Alert } from "@mui/material";
import EventCard from "./EventCard";
import { useEvents } from "../hooks/fetchEvents";

const EventsList = () => {
  const { events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error getting events: {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Upcoming Events
      </Typography>
      <Grid2 container spacing={3}>
        {events.map((event) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={event.id}>
            <EventCard event={event} />
          </Grid2>
        ))}
      </Grid2>
      {events.length === 0 && (
        <Typography>No upcoming events found.</Typography>
      )}
    </Box>
  );
};

export default EventsList;
