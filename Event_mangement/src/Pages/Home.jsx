import { useEffect } from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEventStore } from '../store/useEventStore';
import Footer from '../components/Footer';
import PosterSlider from '../components/PosterSlider';

function Home() {
  const { getAllEvents, events } = useEventStore();

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const eventList = Array.isArray(events) ? events : [];

  return (
    <>
      <PosterSlider />
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Events Around You
        </h1>
        <p className="text-xl text-gray-600">
          Find or create events that matter to you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventList.map((event) => (
          <Link
            key={event._id}
            to={`/events/${event._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg duration-300 hover:scale-105 "
          >
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                  {new Date(event.date).toLocaleDateString()} 
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-2 text-red-500" />
                  {event.location}
                </div>
                <div className="flex items-center text-gray-500">
                  <Users className="h-5 w-5 mr-2 text-green-500" />
                  {event.attendees.length} / {event.capacity} attendees
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
      <Footer/>
      </>
  );
}

export default Home;
