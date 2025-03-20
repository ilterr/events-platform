import { useEvents } from '../hooks/fetchEvents';
import EventCard from './EventCard';

const EventsList = () => {
  const { events, isLoading, error } = useEvents();

  if (isLoading) {return <section>Is loading...</section>}
  if (error) { return <section>Error fetching events: {error}</section>}

  return (
    <div>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventsList;
