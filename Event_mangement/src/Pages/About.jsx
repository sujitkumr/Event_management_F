import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">About Event</h1>

        <div className="space-y-6 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-primary">Event</span>, your go-to platform for discovering, creating, and managing events. Whether you're looking to attend a local meetup, organize a conference, or host a social gathering, Event makes it easy to connect with like-minded individuals.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            Our mission is to bring people together through meaningful events. We believe in the power of community and strive to create a platform that fosters connections, encourages collaboration, and celebrates diversity.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">What We Offer</h2>
          <ul className="list-disc list-inside space-y-3 text-lg">
            <li>Discover events tailored to your interests</li>
            <li>Create and manage your own events with ease</li>
            <li>Connect with attendees and organizers</li>
            <li>Stay updated with real-time notifications</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Join Us</h2>
          <p className="text-lg leading-relaxed">
            Whether you're an event organizer or an attendee, Event is here to make your experience seamless and enjoyable. Join our growing community today and start exploring the world of events!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;