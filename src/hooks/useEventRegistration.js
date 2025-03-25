import { useState, useEffect } from "react";
import supabase from "../supabase-client";

export const useEventRegistration = (eventId, userId) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkRegistration = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("event_id", eventId)
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      if (data) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerForEvent = async () => {
    if (!userId || !eventId) return false;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("event_registrations")
        .insert({ event_id: eventId, user_id: userId });

      if (error) throw error;
      setIsRegistered(true);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const unregisterFromEvent = async () => {
    if (!userId || !eventId) return false;
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("event_registrations")
        .delete()
        .eq("event_id", eventId)
        .eq("user_id", userId);

      if (error) throw error;
      setIsRegistered(false);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && eventId) {
      checkRegistration();
    } else {
      setIsLoading(false);
    }
  }, [eventId, userId]);

  return {
    isRegistered,
    registerForEvent,
    unregisterFromEvent,
    isLoading,
    error,
  };
};

export default useEventRegistration;
