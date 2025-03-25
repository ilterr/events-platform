import supabase from "../supabase-client";

export const editEvent = async (eventId, updatedEventData) => {
  try {
    const { error } = await supabase
      .from("events")
      .update(updatedEventData)
      .eq("id", eventId);

    if (error) {
      throw error;
    }
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const { error } = await supabase.from("events").delete().eq("id", eventId);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
