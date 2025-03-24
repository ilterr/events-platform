import React, { useState } from "react";
import { Typography, Paper, Box, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import supabase from "../supabase-client";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    location: "",
    event_date: null,
    start_time: "",
    end_time: "",
    image_url: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setNewEvent((prev) => ({ ...prev, event_date: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedDate = newEvent.event_date
        ? newEvent.event_date.toISOString().split("T")[0]
        : null;

      const { error } = await supabase.from("events").insert({
        name: newEvent.name,
        description: newEvent.description,
        location: newEvent.location,
        event_date: formattedDate,
        start_time: newEvent.start_time,
        end_time: newEvent.end_time,
        image_url: newEvent.image_url || null,
        status: "upcoming",
      });

      if (error);
      setError(error.message);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create an Event
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Event Name"
            name="name"
            margin="normal"
            required
            value={newEvent.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="normal"
            multiline
            rows={4}
            value={newEvent.description}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Location"
            name="location"
            margin="normal"
            required
            value={newEvent.location}
            onChange={handleChange}
          />

          <DatePicker
            label="Event Date"
            value={newEvent.event_date}
            required
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />

          <TextField
            fullWidth
            label="Start Time (HH:MM)"
            name="start_time"
            margin="normal"
            placeholder="14:00"
            required
            value={newEvent.start_time}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="End Time (HH:MM)"
            name="end_time"
            margin="normal"
            placeholder="16:00"
            required
            value={newEvent.end_time}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Image URL (optional)"
            name="image_url"
            margin="normal"
            value={newEvent.image_url}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 3 }}
          >
            {isLoading ? "Creating..." : "Create Event"}
          </Button>
          {error && (
            <Typography
              color="error"
              align="center"
              sx={{ mt: 2 }}
              role="alert"
            >
              Error creating event: {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateEvent;
