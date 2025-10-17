import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Problem() {
  const problems = [
    {
      header: "Audience Targeting",
      content: "Struggling to find your ideal readers in a crowded marketplace. Finding the right audience for your book can feel like searching for a needle in a haystack.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      header: "Budget Waste",
      content: "Wasting your budget on ads that don't convert. Every dollar spent on ineffective advertising is a dollar that could have been invested in reaching your true readers.",
      image: "https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      header: "Platform Complexity",
      content: "Overwhelmed by marketing jargon and complex ad platforms. The technical maze of digital advertising shouldn't stand between you and your readers.",
      image: "https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      header: "Time Management",
      content: "Spending more time promoting than writing your next book. Your creativity deserves protection from the endless demands of marketing tasks.",
      image: "https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextPage();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPageIndex]);

  const handleNextPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPageIndex((prev) => (prev + 2) % problems.length);
      setIsFlipping(false);
    }, 600);
  };

  const handlePrevPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPageIndex((prev) => (prev - 2 + problems.length) % problems.length);
      setIsFlipping(false);
    }, 600);
  };

  const leftPage = problems[currentPageIndex];
  const rightPage = problems[(currentPageIndex + 1) % problems.length];

  return (
    <section className="section-container bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-[#1a2332]">
          Do not Let a Bad Marketing Plan kill Your Book Sales
        </h2>

        <div className="relative flex items-center justify-center">
          <button
            onClick={handlePrevPage}
            disabled={isFlipping}
            className="absolute left-0 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} className="text-[#1a2332] sm:w-7 sm:h-7" />
          </button>

          <div className="open-book-container">
            <div className={`open-book ${isFlipping ? 'flipping' : ''}`}>
              <div className="book-spine"></div>

              <div className="book-page-left">
                <div className="page-content">
                  <h3 className="page-header">{leftPage.header}</h3>
                  <div className="page-image-container">
                    <img
                      src={leftPage.image}
                      alt={leftPage.header}
                      className="page-image"
                    />
                  </div>
                  <p className="page-text">{leftPage.content}</p>
                </div>
              </div>

              <div className="book-page-right">
                <div className="page-content">
                  <h3 className="page-header">{rightPage.header}</h3>
                  <div className="page-image-container">
                    <img
                      src={rightPage.image}
                      alt={rightPage.header}
                      className="page-image"
                    />
                  </div>
                  <p className="page-text">{rightPage.content}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleNextPage}
            disabled={isFlipping}
            className="absolute right-0 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight size={20} className="text-[#1a2332] sm:w-7 sm:h-7" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {[0, 2].map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => {
                if (!isFlipping) {
                  setIsFlipping(true);
                  setTimeout(() => {
                    setCurrentPageIndex(pageIndex);
                    setIsFlipping(false);
                  }, 600);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentPageIndex === pageIndex
                  ? 'bg-[#0077be] w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${pageIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
