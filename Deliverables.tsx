import { Check } from 'lucide-react';

export default function Deliverables() {
  const deliverables = [
    "A complete Meta ad campaign blueprint tailored to your book",
    "5+ ad creative concepts with compelling copy and design suggestions",
    "Audience targeting strategy to reach your ideal readers",
    "A 30-day content calendar with post ideas and scheduling recommendations",
    "Budget allocation plan optimized for maximum ROI",
    "Performance benchmarks and KPIs to track your success",
    "Step-by-step implementation guide (no tech skills required)"
  ];

  return (
    <section className="section-container">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-[#1a2332]">
          Your Complete Marketing Toolkit, Delivered.
        </h2>

        <div className="card">
          <div className="space-y-3 sm:space-y-4">
            {deliverables.map((item, index) => (
              <div key={index} className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#2fb574] flex items-center justify-center mt-0.5 sm:mt-1">
                  <Check className="text-white" size={14} />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
