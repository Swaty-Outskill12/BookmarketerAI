import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      quote: "It's scary good.",
      author: "Sarah Mitchell",
      credentials: "New York Times Bestselling Author",
      bookTitle: "The Last Summer",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "This platform absolutely transformed my book launch.",
      author: "Marcus Thompson",
      credentials: "Award-winning Fantasy Author",
      bookTitle: "Realm of Shadows",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "It's amazing how smart it is.",
      author: "Elena Rodriguez",
      credentials: "USA Today Bestselling Author",
      bookTitle: "Hearts in Motion",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "I'm a huge fan. It just works.",
      author: "David Chen",
      credentials: "3-time Hugo Award Nominee",
      bookTitle: "Quantum Dreams",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "The results exceeded every expectation.",
      author: "Amanda Foster",
      credentials: "Bestselling Thriller Author",
      bookTitle: "Dark Waters",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "Finally, marketing that makes sense.",
      author: "James Patterson Jr.",
      credentials: "Mystery Writers of America Member",
      bookTitle: "Silent Witness",
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1;
      if (window.innerWidth < 1024) return 2;
      if (window.innerWidth < 1280) return 3;
    }
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(getItemsPerView());
  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="section-container bg-gradient-to-br from-[#f5f1e8] to-[#ebe5d9]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-[#1a2332]">
          Trusted by Award-Winning Authors
        </h2>

        <div className="relative">
          <button
            onClick={handlePrevious}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="text-[#1a2332]" size={20} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all hover:scale-110"
            aria-label="Next testimonials"
          >
            <ChevronRight className="text-[#1a2332]" size={20} />
          </button>

          <div className="overflow-hidden px-2 sm:px-4">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 sm:px-4"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col items-center text-center">
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 sm:border-4 border-[#0077be]/20 shadow-md grayscale">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-r from-[#0077be] to-[#22c9a8] rounded-full flex items-center justify-center text-white text-sm sm:text-base md:text-xl shadow-lg">
                        "
                      </div>
                    </div>

                    <p className="text-sm sm:text-base md:text-lg lg:text-xl italic text-gray-800 mb-4 sm:mb-6 leading-relaxed font-serif">
                      {testimonial.quote}
                    </p>

                    <div className="mt-auto">
                      <h4 className="text-base sm:text-lg md:text-xl font-bold text-[#1a2332] mb-1">
                        {testimonial.author}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mb-1 font-medium">
                        {testimonial.credentials}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 italic">
                        {testimonial.bookTitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-[#0077be] to-[#22c9a8] w-8'
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial group ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
