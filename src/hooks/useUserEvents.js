import { useState, useEffect } from "react";
import supabase from "../supabase-client";

export const useUserEvents = (userId) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const refreshEvents = () => {
    setRefresh((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("event_registrations")
          .select("events(*)")
          .eq("user_id", userId);

        if (error) throw error;
        setEvents(data.map((registration) => registration.events));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEvents();
  }, [userId, refresh]);

  return { events, isLoading, error, refreshEvents };
};
