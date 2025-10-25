import { Sparkles } from 'lucide-react';

export default function Solution() {
  return (
    <section className="section-container">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 mb-4">
            <Sparkles className="text-[#22c9a8]" size={32} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2332]">
              Your Personal AI Marketing Strategist
            </h2>
          </div>
        </div>

        <div className="card">
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 mb-4 sm:mb-6">
            Our AI analyzes your book's genre, target audience, and unique selling points to create
            a data-driven Meta ad campaign designed specifically for your story. No more guesswork,
            no more wasted budget—just proven strategies that connect your book with readers who
            will love it.
          </p>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-700">
            Think of it as having a dedicated marketing team that works 24/7 to optimize your campaign,
            so you can focus on what you do best—writing.
          </p>
        </div>
      </div>
    </section>
  );
}
