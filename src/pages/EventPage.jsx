import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEventById } from "../hooks/useEventById";
import { useEventRegistration } from "../hooks/useEventRegistration";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserEvents } from "../hooks/useUserEvents";
import { deleteEvent } from "../services/eventService";

const EventPage = () => {
  const { id } = useParams();
  const { event, isLoading, error } = useEventById(id);
  const { session } = UserAuth();
  const navigate = useNavigate();
  const userId = session?.user?.id;
  const { isRegistered, registerForEvent, unregisterFromEvent } =
    useEventRegistration(id, userId);
  const { refreshEvents } = useUserEvents(userId);
  const { userRole } = UserAuth();

  const handleDelete = async () => {
    const result = await deleteEvent(id);
    if (result.success) {
      navigate("/");
    }
  };

  const handleRegister = async () => {
    if (!session) {
      navigate("/signin");
      return;
    }

    let result;

    if (isRegistered) {
      result = await unregisterFromEvent();
    } else {
      result = await registerForEvent();
    }
    if (result) {
      refreshEvents();
    }
  };

  const addToGoogleCalendar = () => {
    if (!event) return;

    const dateStr = event.event_date.replace(/-/g, "");
    const startTime = event.start_time.replace(/:/g, "");
    const endTime = event.end_time.replace(/:/g, "");
    const startDateTime = `${dateStr}T${startTime}00`;
    const endDateTime = `${dateStr}T${endTime}00`;
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.name
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(
      event.location
    )}&dates=${startDateTime}/${endDateTime}`;

    window.open(url, "_blank");
  };

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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {event.name}
            </Typography>

            {userRole === "staff" && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/events/${id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1">{event.event_date}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography variant="body1">
              {event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body1">{event.location}</Typography>
          </Box>

          <Typography variant="body1">{event.description}</Typography>

          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              {isRegistered ? "Unregister" : "Register"}
            </Button>
            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              onClick={addToGoogleCalendar}
            >
              Add to GoogleCalendar
            </Button>
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
