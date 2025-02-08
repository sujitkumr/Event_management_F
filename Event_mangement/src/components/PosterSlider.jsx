import { useState, useEffect } from 'react';

function PosterSlider() {
  const posterImages = [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', // Music festival
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80', // Conference
    'https://images.unsplash.com/photo-1598986640623-8b6b57149137?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'  // Sports event
  ]
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posterImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posterImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posterImages.length) % posterImages.length);
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden md:h-[800px]">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {posterImages.map((image, index) => (
          <div key={index} className="relative h-full w-full flex-shrink-0">
            <img
              src={image}
              alt={`Event Slide ${index + 1}`}
              className="h-full w-full object-cover object-center"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            
            {/* Slide Content */}
            <div className="absolute left-8 top-1/2 w-3/4 -translate-y-1/2 text-gray-100 md:left-16 md:w-1/2">
              <h2 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-6xl">
                {[
                  'Experience Unforgettable Moments',
                  'Connect Through Amazing Events',
                  'Celebrate Life Together'
                ][index]}
              </h2>
              <p className="mb-8 text-lg text-gray-300 drop-shadow-lg md:text-xl">
                {[
                  'Join thousands in the most exciting gatherings around the world',
                  'Network, learn, and grow with industry leaders',
                  'Cheer for your favorite teams with fellow fans'
                ][index]}
              </p>
              <button className="btn rounded-lg border border-white bg-transparent px-8 py-3 font-semibold text-white transition hover:btn-primary">
                Explore Events
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 space-x-2">
        {posterImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'w-6 bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-3 text-white backdrop-blur-sm transition hover:bg-white/40"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-3 text-white backdrop-blur-sm transition hover:bg-white/40"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default PosterSlider;