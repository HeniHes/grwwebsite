// components/EventList.js
import { useState } from "react";
import supabase from "../supabase/supabase";

const EventList = ({ events, setEvents }) => {
  const handleDelete = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) {
      console.error("Error deleting event:", error);
    } else {
      setEvents(events.filter((event) => event.id !== id)); // Remove deleted event from the list
    }
  };

  const handleEdit = (event) => {
    // For simplicity, we will just log the event. In a real app, you would show a modal or form to edit.
    console.log("Edit event:", event);
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-2xl font-bold text-gray-700 mb-4">Event List</h3>
      <ul>
        {events.map((event) => (
          <li
            key={event.id}
            className="flex justify-between items-center mb-4 p-4 border border-gray-300 rounded-md"
          >
            <div>
              <h4 className="font-semibold text-gray-700">{event.name}</h4>
              <p className="text-gray-600">{event.date}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(event)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
