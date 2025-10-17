import { Check, Star } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: 'monthly' | '6months') => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  return (
    <section className="section-container bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#1a2332]">
          Simple, Transparent Pricing for Authors
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card border-2 border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-[#1a2332]">Monthly Plan</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-[#0077be]">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start gap-2 sm:gap-3">
                <Check className="text-[#2fb574] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span className="text-sm sm:text-base text-gray-700">Complete marketing plan for your book</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Check className="text-[#2fb574] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span className="text-sm sm:text-base text-gray-700">AI-powered ad campaign management</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Check className="text-[#2fb574] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span className="text-sm sm:text-base text-gray-700">Monthly performance reports</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Check className="text-[#2fb574] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span className="text-sm sm:text-base text-gray-700">Cancel anytime</span>
              </li>
            </ul>

            <button onClick={() => onSelectPlan('monthly')} className="btn-primary w-full text-sm sm:text-base">
              Get Started
            </button>
          </div>

          <div className="card border-4 border-[#22c9a8] relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white px-4 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                <Star size={16} fill="white" />
                Best Value
              </div>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-[#1a2332]">Author's Pass (6 Months)</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-[#0077be]">$99</span>
                <span className="text-gray-600">/6 months</span>
              </div>
              <p className="text-sm text-[#2fb574] font-semibold mt-2">Save $75 compared to monthly</p>
            </div>

            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start gap-2 sm:gap-3">
                <Check className="text-[#2fb574] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span className="text-sm sm:text-base text-gray-700">Everything in Monthly Plan</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Check className="text-[#2fb574] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span className="text-sm sm:text-base text-gray-700">Priority support</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Check className="text-[#2fb574] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span className="text-sm sm:text-base text-gray-700">Quarterly strategy reviews</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Check className="text-[#2fb574] flex-shrink-0 mt-0.5 sm:mt-1" size={18} />
                <span className="text-sm sm:text-base text-gray-700">Advanced analytics dashboard</span>
              </li>
            </ul>

            <button onClick={() => onSelectPlan('6months')} className="btn-primary w-full text-sm sm:text-base">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
