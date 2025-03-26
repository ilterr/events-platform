import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CardActionArea,
  useTheme,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  const theme = useTheme();
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          boxShadow: `0 8px 16px ${theme.palette.primary.main}`,
          transform: "translateY(-5px)",
        },
        transition: "all 0.3s ease",
        borderRadius: { xs: 1, sm: 2 },
      }}
    >
      <CardActionArea
        component={Link}
        to={`/events/${event.id}`}
        aria-label={`View ${event.name}`}
      >
        {event.image_url && (
          <CardMedia
            component="img"
            sx={{
              height: { xs: 200, sm: 250 },
              objectFit: "cover",
            }}
            image={event.image_url}
            alt={event.name}
          />
        )}
        <CardContent
          sx={{
            p: { xs: 2, sm: 1 },
            flexGrow: 1,
            minHeight: { xs: 80, sm: 100 },
          }}
        >
          <Typography
            color="primary"
            gutterBottom
            variant="h5"
            component="h2"
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
          >
            {event.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
            }}
          >
            {event.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
          <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">
            {event.event_date.replace(/-/g, "/") +
              " at " +
              event.start_time.slice(0, 5)}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
          <Typography variant="body2">{event.location}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
export default EventCard;
