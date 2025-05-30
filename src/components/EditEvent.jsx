import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, TextField, Button } from "@mui/material";
import supabase from "../supabase-client";
import { editEvent } from "../services/eventService";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setEventData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = async () => {
    const result = await editEvent(id, {
      name: eventData.name,
      description: eventData.description,
      location: eventData.location,
      event_date: eventData.event_date,
      start_time: eventData.start_time,
      end_time: eventData.end_time,
      image_url: eventData.image_url,
    });

    if (result.success) {
      navigate(`/events/${id}`);
    }

    if (!result.success) {
      setError(result.message);
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Event
        </Typography>

        <Box component="form" sx={{ mt: 3 }} aria-label="Edit an event">
          <TextField
            fullWidth
            label="Event Name"
            name="name"
            value={eventData.name || ""}
            onChange={handleInputChange}
            margin="normal"
            aria-label="Event Name"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={eventData.description || ""}
            onChange={handleInputChange}
            margin="normal"
            multiline
            rows={4}
            aria-label="Event Description"
          />
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={eventData.location || ""}
            onChange={handleInputChange}
            margin="normal"
            aria-label="Event Location"
          />
          <TextField
            fullWidth
            label="Event Date"
            name="event_date"
            type="date"
            value={eventData.event_date || ""}
            onChange={handleInputChange}
            margin="normal"
            aria-label="Event Date"
          />
          <TextField
            fullWidth
            label="Start Time"
            name="start_time"
            type="time"
            value={eventData.start_time || ""}
            onChange={handleInputChange}
            margin="normal"
            aria-label="Event Start Time"
          />
          <TextField
            fullWidth
            label="End Time"
            name="end_time"
            type="time"
            value={eventData.end_time || ""}
            onChange={handleInputChange}
            margin="normal"
            aria-label="Event End Time"
          />
          <TextField
            fullWidth
            label="Event Image URL"
            name="image_url"
            value={eventData.image_url || ""}
            onChange={handleInputChange}
            margin="normal"
            aria-label="Event Image URL"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveClick}
            sx={{ mt: 3 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditEvent;
