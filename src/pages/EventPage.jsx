import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  CircularProgress,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useEventById } from "../hooks/useEventById";

const EventPage = () => {
  const { id } = useParams();
  const { event, isLoading, error } = useEventById(id);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!event) {
    return (
      <Typography color="info" align="center">
        Event not found
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card elevation={5}>
        {event.image_url && (
          <CardMedia
            component="img"
            height="300"
            image={event.image_url}
            alt={event.name}
          />
        )}
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1">{event.event_date}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1">
              {event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1">{event.location}</Typography>
          </Box>

          <Typography variant="body1">{event.description}</Typography>

          <Box sx={{ mt: 3 }}>
            <Chip color="primary" label="Join us!" clickable />
          </Box>
          {error && (
            <Typography color="error" align="center">
              Error loading event: {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventPage;
