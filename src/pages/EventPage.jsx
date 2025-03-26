import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  Modal,
  useTheme,
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  LocationOn as LocationOnIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";
import { useEventById } from "../hooks/useEventById";
import { useEventRegistration } from "../hooks/useEventRegistration";
import { useUserEvents } from "../hooks/useUserEvents";
import { UserAuth } from "../context/AuthContext";
import { deleteEvent } from "../services/eventService";

const EventPage = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, isLoading, error } = useEventById(id);
  const { session, userRole } = UserAuth();
  const userId = session?.user?.id;
  const { isRegistered, registerForEvent, unregisterFromEvent } =
    useEventRegistration(id, userId);
  const { refreshEvents } = useUserEvents(userId);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (isLoading) return <CircularProgress />;
  if (!event)
    return (
      <Typography color="info" align="center">
        Event not found
      </Typography>
    );
  if (error)
    return (
      <Typography color="error" align="center">
        Error loading event: {error}
      </Typography>
    );

  const handleDelete = async () => {
    const result = await deleteEvent(id);
    if (result.success) navigate("/");
  };

  const handleRegister = async () => {
    if (!session) return navigate("/signin");
    const result = isRegistered
      ? await unregisterFromEvent()
      : await registerForEvent();
    if (result) refreshEvents();
  };

  const addToGoogleCalendar = () => {
    const dateStr = event.event_date.replace(/-/g, "");
    const startTime = event.start_time.replace(/:/g, "");
    const endTime = event.end_time.replace(/:/g, "");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.name
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(
      event.location
    )}&dates=${dateStr}T${startTime}00/${dateStr}T${endTime}00`;
    window.open(url, "_blank");
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card
        elevation={5}
        sx={{
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            boxShadow: `0 6px 12px ${theme.palette.primary.light}`,
          },
        }}
      >
        {event.image_url && (
          <CardMedia
            component="img"
            height="300"
            image={event.image_url}
            alt={event.name}
          />
        )}
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h4" component="h1">
              {event.name}
            </Typography>
            {userRole === "staff" && (
              <Box>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/events/${id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon />}
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
          <Box sx={{ mb: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              <CalendarTodayIcon sx={{ mr: 1 }} />
              {event.event_date}
            </Typography>
            <Typography>
              <AccessTimeIcon sx={{ mr: 1 }} />
              {event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)}
            </Typography>
            <Typography>
              <LocationOnIcon sx={{ mr: 1 }} />
              {event.location}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {event.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant={isRegistered ? "outlined" : "contained"}
              color={isRegistered ? "primary" : "success"}
              onClick={handleRegister}
            >
              {isRegistered ? "Unregister" : "Register"}
            </Button>

            <Button
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              onClick={addToGoogleCalendar}
            >
              Add to Google Calendar
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Deletion
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Are you sure you want to delete this event and all registrations?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDelete();
                setShowDeleteModal(false);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default EventPage;
