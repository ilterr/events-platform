function EventCard({ event }) {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
    </div>
  );
}

export default EventCard;
