// components/AddEventForm.js
import { useState } from 'react';
import supabase from '../supabase/supabase';

const AddEventForm = ({ setEvents }) => {
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    logoSrc: '', // This will hold the uploaded image URL
    url: ''
  });
  const [logoFile, setLogoFile] = useState(null); // State to hold the file input

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the file upload (logo)
  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (logoFile) {
      // Upload the file to Supabase Storage
      const filePath = `event-logos/${logoFile.name}`;
      const { data, error: uploadError } = await supabase
        .storage
        .from('event-logos') // Make sure the bucket name is correct
        .upload(filePath, logoFile);

      if (uploadError) {
        console.error('Error uploading logo:', uploadError);
        return;
      }

      // Get the public URL of the uploaded file
      const { publicURL, error: urlError } = supabase
        .storage
        .from('event-logos')
        .getPublicUrl(filePath);

      if (urlError) {
        console.error('Error getting public URL:', urlError);
        return;
      }

      // Add the URL to the event data
      newEvent.logoSrc = publicURL;
    }

    // Insert the event data into the Supabase events table
    const { data, error } = await supabase.from('events').insert([newEvent]);

    if (error) {
      console.error('Error adding event:', error);
    } else {
      setEvents((prevEvents) => [...prevEvents, ...data]); // Update events list
      setNewEvent({ name: '', date: '', location: '', description: '', logoSrc: '', url: '' }); // Reset form
      setLogoFile(null); // Reset file input
      alert('Event added successfully!');
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-2xl font-bold text-gray-700 mb-4">Add New Event</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newEvent.name}
          onChange={handleChange}
          placeholder="Event Name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="date"
          value={newEvent.date}
          onChange={handleChange}
          placeholder="Event Date"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="location"
          value={newEvent.location}
          onChange={handleChange}
          placeholder="Event Location"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          required
        />
        <textarea
          name="description"
          value={newEvent.description}
          onChange={handleChange}
          placeholder="Event Description"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
          required
        ></textarea>
        <input
          type="text"
          name="url"
          value={newEvent.url}
          onChange={handleChange}
          placeholder="Event URL"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        />
        
        {/* Logo Upload Field */}
        <div className="mb-4">
          <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Upload Event Logo</label>
          <input
            type="file"
            name="logo"
            id="logo"
            onChange={handleFileChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
            accept="image/*"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Event
        </button>
      </form>
    </div>
  );
};

export default AddEventForm;
