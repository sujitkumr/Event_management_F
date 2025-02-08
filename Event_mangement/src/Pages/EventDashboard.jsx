import { useEffect, useState } from 'react';
import { Calendar, MapPin, Users, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEventStore } from '../store/useEventStore';
import { useAuthStore } from '../store/useAuthStore';

function EventDashboard() {
  const { events, getAllEvents, isLoading } = useEventStore();
  const { authUser } = useAuthStore();

  const [activeTab, setActiveTab] = useState('hosting');
  const [createdEvents, setCreatedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);

  // Fetch all events on mount
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  // Filter events based on the authenticated user
  useEffect(() => {
    if (events.length > 0 && authUser) {
      const userCreatedEvents = events.filter(
        (event) => event.creator._id === authUser._id
      );
      const userAttendingEvents = events.filter((event) =>
        event.attendees.includes(authUser._id)
      );
      setCreatedEvents(userCreatedEvents);
      setAttendingEvents(userAttendingEvents);
    }
  }, [events, authUser]);

  // While events are loading, show a centered loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  // Render a single event card
  const renderEventCard = (event) => (
    <Link
      key={event._id}
      to={`/events/${event._id}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
    >
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {event.title}
        </h3>
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            {event.location}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-green-500" />
            {event.attendees.length} / {event.capacity} attending
          </div>
        </div>
      </div>
    </Link>
  );

  // Choose which list of events to display based on the active tab
  const tabContent = activeTab === 'hosting' ? createdEvents : attendingEvents;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Dashboard Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          My Event Dashboard
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-6 py-2 mx-2 font-medium border-b-2 transition-colors duration-300 ${
              activeTab === 'hosting'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('hosting')}
          >
            Hosting
          </button>
          <button
            className={`px-6 py-2 mx-2 font-medium border-b-2 transition-colors duration-300 ${
              activeTab === 'attending'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('attending')}
          >
            Attending
          </button>
        </div>

        {/* Event Cards Grid */}
        {tabContent.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabContent.map((event) => renderEventCard(event))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            {activeTab === 'hosting'
              ? "You are not hosting any events."
              : "You are not attending any events."}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDashboard;
