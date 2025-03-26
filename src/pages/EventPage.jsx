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
    <Box
      sx={{
        maxWidth: 800,
        width: { xs: "95%", sm: "90%", md: "100%" },
        mx: "auto",
        p: 3,
        my: 5,
        size: { xs: 12, sm: 6, md: 4 },
      }}
    >
      <Card
        elevation={5}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: { xs: 1, sm: 2, md: 4 },
          "&:hover": {
            boxShadow: `0 6px 12px ${theme.palette.primary.light}`,
          },
        }}
      >
        {event.image_url && (
          <CardMedia
            component="img"
            sx={{
              height: { xs: 200, sm: 300, lg: 400 },
              objectFit: "cover",
              borderRadius: { xs: 1, sm: 2, md: 4 },
            }}
            image={event.image_url}
            alt={event.name}
          />
        )}
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                lineHeight: 1.2,
                mb: 2,
                wordBreak: "break-word",
              }}
            >
              {event.name}
            </Typography>
            {userRole === "staff" && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: { xs: 1, sm: 2 },
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <Button
                  size="small"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/events/${id}/edit`)}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  fullWidth
                  startIcon={<DeleteIcon />}
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <CalendarTodayIcon sx={{ mr: 1, fontSize: "1rem" }} />
              <span>{event.event_date}</span>
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon sx={{ mr: 1, fontSize: "1rem" }} />
              <span>
                {event.start_time.slice(0, 5)} - {event.end_time.slice(0, 5)}
              </span>
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: "1rem" }} />
              <span>{event.location}</span>
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{ mb: 3, fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {event.description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 2,
            }}
          >
            <Button
              fullWidth
              variant={isRegistered ? "outlined" : "contained"}
              color={isRegistered ? "primary" : "success"}
              onClick={handleRegister}
              sx={{
                py: { xs: 1.5, sm: 1 },
                fontSize: { xs: "0.9rem", sm: "1rem" },
              }}
            >
              {isRegistered ? "Unregister" : "Register"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<CalendarTodayIcon />}
              onClick={addToGoogleCalendar}
              sx={{ py: { xs: 1, sm: "inherit" } }}
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
