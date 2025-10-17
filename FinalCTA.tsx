interface FinalCTAProps {
  onGetStarted: () => void;
}

export default function FinalCTA({ onGetStarted }: FinalCTAProps) {
  return (
    <section className="section-container">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="card bg-gradient-to-br from-[#3A4D8F] to-[#2D2D2D] text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed opacity-95">
            Stop guessing and start growing. Let our AI build a marketing plan that turns your
            book into a bestseller—so you can get back to doing what you love most: writing.
          </p>
          <button onClick={onGetStarted} className="bg-white text-[#3A4D8F] px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 hover:shadow-2xl hover:-translate-y-0.5">
            Get Your Free Marketing Blueprint
          </button>
        </div>
      </div>
    </section>
  );
}
