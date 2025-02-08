import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEventStore } from '../store/useEventStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useState } from 'react';
import { Calendar, Loader, MapPin, User, Users } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, joinEvent, leaveEvent, isLoading, deleteEvent } = useEventStore();
  const { authUser, socket } = useAuthStore();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        if (data) {
          setEvent(data);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        setError(err.message || 'Error fetching event details');
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id, getEventById]);

  useEffect(() => {
    if (!socket || !event) return;
    socket.on(`event:${id}:memberUpdate`, (updatedEvent) => {
      setEvent(prev => ({
        ...prev,
        attendees: updatedEvent.attendees
      }));
    });

    return () => {
      socket.off(`event:${id}:memberUpdate`);
    };
  }, [socket, id, event]);

  const handleJoinEvent = async () => {
    try {
      await joinEvent(id);
      const updatedEvent = await getEventById(id);
      setEvent(updatedEvent);
    } catch (error) {
      console.error('Error joining event:', error);
    }
  };

  const handleLeaveEvent = async () => {
    try {
      await leaveEvent(id);
      const updatedEvent = await getEventById(id);
      setEvent(updatedEvent);
    } catch (error) {
      console.error('Error leaving event:', error);
    }
  };

  const isAttending = event?.attendees?.some(
    attendee => attendee._id === authUser?._id
  );

  const isEventFull = event?.attendees?.length >= event?.capacity;

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(id);
      navigate("/dashboard");
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p className="text-lg">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Event Image */}
      {event.imageUrl && (
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg mb-8">
          <img
            src={event.imageUrl}
            alt={event.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
        </div>
      )}

      {/* Event Details */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Event Metadata */}
          <div className="space-y-6">
            <div className="flex items-center text-gray-700">
              <Calendar className="h-6 w-6 mr-3 text-primary" />
              <span>{new Date(event.date).toLocaleString()}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin className="h-6 w-6 mr-3 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="h-6 w-6 mr-3 text-primary" />
              <span>{event.attendees.length} / {event.capacity} attendees</span>
            </div>
            <div className="flex items-center text-gray-700">
              <User className="h-6 w-6 mr-3 text-primary" />
              <span>Hosted by {event.creator.name}</span>
            </div>
          </div>

          {/* Event Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">Description</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          {authUser && authUser._id !== event.creator._id && (
            <button
              onClick={isAttending ? handleLeaveEvent : handleJoinEvent}
              disabled={!isAttending && isEventFull}
              className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold transition-all ${
                isAttending
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : isEventFull
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-primary hover:bg-primary/90 text-white'
              }`}
            >
              {isAttending ? 'Leave Event' : isEventFull ? 'Event Full' : 'Join Event'}
            </button>
          )}

          {authUser && authUser._id === event.creator._id && (
            <div className="flex gap-4 w-full md:w-auto">
              <Link
                to={`/updateevent/${event._id}`}
                className="w-full md:w-auto px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold text-center transition-all"
              >
                Update Event
              </Link>
              <button
                onClick={handleDeleteEvent}
                className="w-full md:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
              >
                Delete Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;