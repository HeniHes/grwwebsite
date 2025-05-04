// pages/admin/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import supabase from '../../supabase/supabase';

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    logosrc: '',
    url: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [editingEventId, setEditingEventId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const router = useRouter();

  // Authentication check - redirect if not logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('grw_admin_logged_in') === 'true';
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      // If logged in, fetch events
      fetchEvents();
    }
  }, [router]);

  // Debug function to show what's in the database
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching events...");
      
      const { data, error } = await supabase
        .from('events')
        .select('*');
      
      if (error) {
        console.error("Error fetching events:", error);
        throw error;
      }
      
      console.log("Events data:", data);
      setEvents(data || []);
      
      if (data && data.length === 0) {
        showNotification("No events found in database. Add your first event!", 'info');
      }
    } catch (error) {
      console.error("Error in fetchEvents:", error);
      showNotification(`Error fetching events: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Auto-hide after 5 seconds
  };

  // Reset form
  const resetForm = () => {
    setNewEvent({
      name: '',
      date: '',
      location: '',
      description: '',
      logosrc: '',
      url: ''
    });
    setLogoFile(null);
    setLogoPreview(null);
    setEditingEventId(null);
  };

  // Handle changes in input fields
  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file input for logo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload file to Supabase Storage
  const uploadLogo = async (file) => {
    if (!file) return null;
    
    try {
      console.log("Starting file upload...");
      
      // Create a unique file name to avoid collisions
      const fileExt = file.name.split('.').pop();
      const fileName = `event_logo_${Date.now()}.${fileExt}`;
      
      // Upload file - IMPORTANT: We use 'events' bucket now, matching our SQL policies
      console.log("Uploading file to 'events' bucket...", fileName);
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('events')  // This must match the bucket name in your SQL policies
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false  // Don't overwrite existing files with same name
        });
        
      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }
      
      // Get public URL
      const { data } = supabase.storage
        .from('events')  // This must match the bucket name in your SQL policies
        .getPublicUrl(fileName);
      
      const publicUrl = data?.publicUrl;
      console.log("Upload successful, URL:", publicUrl);
      
      if (!publicUrl) {
        throw new Error("Failed to get public URL for uploaded file");
      }
      
      return publicUrl;
    } catch (error) {
      console.error("Error in uploadLogo:", error);
      showNotification(`Error uploading logo: ${error.message}`, 'error');
      return null;
    }
  };

  // Add new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Adding new event...");
      
      // Validate required fields
      if (!newEvent.name || !newEvent.date || !newEvent.location || !newEvent.description) {
        throw new Error('Please fill in all required fields');
      }
      
      // Upload logo if provided
      let logoUrl = newEvent.logosrc;
      if (logoFile) {
        console.log("Uploading logo file...");
        logoUrl = await uploadLogo(logoFile);
        if (!logoUrl) {
          console.error("Failed to upload logo");
          throw new Error('Failed to upload logo. Please check console for details.');
        }
      }
      
      // Prepare event data
      const eventData = {
        name: newEvent.name,
        date: newEvent.date,
        location: newEvent.location,
        description: newEvent.description,
        logosrc: logoUrl,
        url: newEvent.url || ''
      };
      
      console.log("Inserting event data:", eventData);
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select();
        
      if (error) {
        console.error("Insert error:", error);
        throw new Error(`Failed to add event: ${error.message}`);
      }
      
      console.log("Event added successfully:", data);
      
      // Update events list
      fetchEvents(); // Refresh the list
      resetForm();
      showNotification('Event added successfully!');
    } catch (error) {
      console.error("Error in handleAddEvent:", error);
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle opening edit modal
  const handleEditClick = (event) => {
    console.log("Editing event:", event);
    setNewEvent({
      name: event.name,
      date: event.date,
      location: event.location,
      description: event.description,
      logosrc: event.logosrc,
      url: event.url || ''
    });
    setEditingEventId(event.id);
    setLogoPreview(event.logosrc);
  };

  // Update existing event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Updating event...");
      
      // Validate required fields
      if (!newEvent.name || !newEvent.date || !newEvent.location || !newEvent.description) {
        throw new Error('Please fill in all required fields');
      }
      
      // Upload logo if a new one is provided
      let logoUrl = newEvent.logosrc;
      if (logoFile) {
        console.log("Uploading new logo...");
        logoUrl = await uploadLogo(logoFile);
        if (!logoUrl) {
          throw new Error('Failed to upload logo');
        }
      }
      
      // Prepare event data
      const eventData = {
        name: newEvent.name,
        date: newEvent.date,
        location: newEvent.location,
        description: newEvent.description,
        logosrc: logoUrl,
        url: newEvent.url || ''
      };
      
      console.log("Updating event data:", eventData);
      
      // Update in Supabase
      const { error } = await supabase
        .from('events')
        .update(eventData)
        .eq('id', editingEventId);
        
      if (error) {
        console.error("Update error:", error);
        throw new Error(`Failed to update event: ${error.message}`);
      }
      
      console.log("Event updated successfully");
      
      // Refresh events list
      fetchEvents();
      
      // Reset form
      resetForm();
      showNotification('Event updated successfully!');
    } catch (error) {
      console.error("Error in handleUpdateEvent:", error);
      showNotification(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Open delete confirmation
  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setIsDeleteConfirmOpen(true);
  };

  // Delete event
  const confirmDelete = async () => {
    if (!eventToDelete) return;
    setIsLoading(true);
    
    try {
      console.log("Deleting event:", eventToDelete.id);
      
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventToDelete.id);
        
      if (error) {
        console.error("Delete error:", error);
        throw new Error(`Failed to delete event: ${error.message}`);
      }
      
      console.log("Event deleted successfully");
      
      // Update events list
      fetchEvents();
      showNotification('Event deleted successfully!');
    } catch (error) {
      console.error("Error in confirmDelete:", error);
      showNotification(`Error deleting event: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
      setIsDeleteConfirmOpen(false);
      setEventToDelete(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setIsDeleteConfirmOpen(false);
    setEventToDelete(null);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('grw_admin_logged_in');
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>GRW Admin Dashboard</title>
      </Head>
      
      {/* Header */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">GRW Events Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={fetchEvents}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition">
              Refresh Events
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-md shadow-lg text-white ${
          notification.type === 'error' ? 'bg-red-500' : 
          notification.type === 'info' ? 'bg-blue-500' : 'bg-green-500'
        }`}>
          {notification.message}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Loading Indicator */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-center">Processing...</p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add/Edit Event Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingEventId ? 'Edit Event' : 'Add New Event'}
              </h2>
              
              <form onSubmit={editingEventId ? handleUpdateEvent : handleAddEvent}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={newEvent.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="text"
                    value={newEvent.date}
                    onChange={handleChange}
                    placeholder="e.g., June 8-11, 2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={newEvent.location}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    value={newEvent.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                    Event URL
                  </label>
                  <input
                    id="url"
                    name="url"
                    type="url"
                    value={newEvent.url}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="logo" className="block text-sm font-medium text-gray-700 mb-1">
                    Event Logo
                  </label>
                  <input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Logo Preview */}
                {logoPreview && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo Preview</label>
                    <div className="relative h-40 w-full bg-gray-100 rounded-md overflow-hidden">
                      <img 
                        src={logoPreview} 
                        alt="Logo Preview" 
                        className="absolute inset-0 w-full h-full object-contain p-2"
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                    {editingEventId ? 'Update Event' : 'Add Event'}
                  </button>
                  
                  {editingEventId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          
          {/* Events List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Events List</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {events.length} Events
                </span>
              </div>
              
              {events.length === 0 ? (
                <div className="bg-gray-50 p-4 rounded-md text-center text-gray-500">
                  No events found. Add your first event!
                </div>
              ) : (
                <div className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                      <div className="flex flex-col sm:flex-row">
                        {/* Logo */}
                        <div className="sm:w-1/4 p-4 bg-gray-50 flex items-center justify-center">
                          {event.logosrc ? (
                            <div className="relative h-20 w-full">
                              <img 
                                src={event.logosrc}
                                alt={`${event.name} logo`}
                                className="object-contain w-full h-full"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                                }}
                              />
                            </div>
                          ) : (
                            <div className="h-20 w-full flex items-center justify-center bg-gray-100 rounded">
                              <span className="text-gray-400 text-sm">No Logo</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Event Info */}
                        <div className="sm:w-3/4 p-4">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{event.name}</h3>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-gray-600 text-sm">
                                  <span className="font-medium">Date:</span> {event.date}
                                </span>
                                <span className="text-gray-600 text-sm">
                                  <span className="font-medium">Location:</span> {event.location}
                                </span>
                              </div>
                              <p className="text-gray-600 mt-2 line-clamp-2">{event.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleEditClick(event)}
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteClick(event)}
                              className="text-red-600 hover:text-red-800 font-medium text-sm transition">
                              Delete
                            </button>
                            {event.url && (
                              <a 
                                href={event.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-800 font-medium text-sm transition">
                                Visit Website
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete the event "{eventToDelete?.name}"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition">
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}