import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function EventCard({ event }) {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {event.image_url && (
        <CardMedia
          component="img"
          height="140"
          image={event.image_url}
          alt={event.name}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {event.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {event.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">
            {event.event_date.replace(/-/g, "/") +
              " at " +
              event.start_time.slice(0, 5)}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{event.location}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
export default EventCard;
