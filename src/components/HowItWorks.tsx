export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      frontTitle: "Share Your Vision",
      description: "Answer a few simple questions about your book's genre, target audience, and goals. Our AI learns what makes your story unique and crafts a personalized marketing strategy.",
      image: "https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      number: 2,
      frontTitle: "AI-Powered Strategy",
      description: "Within minutes, our AI creates a complete Meta ad campaign tailored to your book—including ad creatives, targeting strategies, and a content calendar optimized for maximum reach.",
      image: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      number: 3,
      frontTitle: "Launch & Scale",
      description: "Review your plan, approve it, and launch. Our AI continuously monitors and optimizes your campaign to maximize your ROI while you focus on writing your next bestseller.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  ];

  return (
    <section className="section-container bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-[#1a2332]">
          Launch Your Automated Ad Campaign in 3 Simple Steps
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="group perspective-1000">
              <div className="relative h-[400px] sm:h-[450px] md:h-[500px] w-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">

                <div className="absolute inset-0 backface-hidden">
                  <div className="relative h-full w-full rounded-2xl shadow-2xl overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.frontTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute top-6 left-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white flex items-center justify-center text-xl font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                        {step.frontTitle}
                      </h3>
                      <p className="text-white/80 mt-2 sm:mt-3 text-xs sm:text-sm hidden sm:block">Hover to learn more</p>
                      <p className="text-white/80 mt-2 text-xs sm:hidden">Tap to learn more</p>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full w-full rounded-2xl shadow-2xl bg-gradient-to-br from-[#0077be] to-[#22c9a8] p-4 sm:p-6 md:p-8 flex flex-col justify-center items-center text-center">
                    <div className="mb-6">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center text-xl font-bold shadow-lg mx-auto">
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight">
                      {step.frontTitle}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-white/95 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
