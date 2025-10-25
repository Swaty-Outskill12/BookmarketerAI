import { X, Lock } from 'lucide-react';

interface PlanPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'monthly' | '6months') => void;
  bookTitle?: string;
}

export default function PlanPreviewModal({ isOpen, onClose, onSelectPlan, bookTitle = 'Your Book' }: PlanPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-[#2D2D2D]">Marketing Plan for {bookTitle}</h2>

          <div className="relative">
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-3 text-[#2D2D2D]">Executive Summary</h3>
                <p className="text-gray-700 leading-relaxed">
                  This comprehensive marketing plan outlines a strategic approach to promote your book
                  through targeted Meta advertising campaigns...
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 backdrop-blur-sm bg-white/60 flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="text-[#3A4D8F] mx-auto mb-4" size={48} />
                    <p className="text-xl font-semibold text-[#2D2D2D] mb-2">
                      Unlock Your Complete Marketing Plan
                    </p>
                    <p className="text-gray-600">Choose a plan below to view the full document</p>
                  </div>
                </div>

                <div className="filter blur-sm select-none">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-[#2D2D2D]">Target Audience Analysis</h3>
                    <p className="text-gray-700 mb-3">Primary Audience Demographics:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Age Range: 25-45 years old</li>
                      <li>Gender: 65% Female, 35% Male</li>
                      <li>Interests: Contemporary fiction, book clubs, reading communities</li>
                      <li>Online Behavior: Active on social media, frequent Amazon shoppers</li>
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-[#2D2D2D]">Ad Creative Strategy</h3>
                    <p className="text-gray-700 mb-3">We've developed 5 high-converting ad concepts:</p>
                    <div className="space-y-3">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="font-semibold">Concept 1: Emotional Hook</p>
                        <p className="text-sm text-gray-600">Focuses on the transformative journey...</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="font-semibold">Concept 2: Social Proof</p>
                        <p className="text-sm text-gray-600">Highlights reader reviews and ratings...</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-3 text-[#2D2D2D]">30-Day Content Calendar</h3>
                    <p className="text-gray-700">Detailed posting schedule with pre-written content...</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-[#2D2D2D]">Budget Allocation</h3>
                    <p className="text-gray-700">Optimized spend across campaigns for maximum ROI...</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <h3 className="text-2xl font-bold text-center mb-8 text-[#2D2D2D]">
                Choose Your Plan
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h4 className="text-xl font-bold mb-2 text-[#2D2D2D]">Monthly Plan</h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-[#3A4D8F]">$29</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <button
                    onClick={() => onSelectPlan('monthly')}
                    className="btn-primary w-full"
                  >
                    Pay
                  </button>
                </div>

                <div className="border-4 border-[#3A4D8F] rounded-lg p-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#3A4D8F] text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Best Value
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-[#2D2D2D]">6 Month Plan</h4>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-4xl font-bold text-[#3A4D8F]">$99</span>
                    <span className="text-gray-600">/6 months</span>
                  </div>
                  <button
                    onClick={() => onSelectPlan('6months')}
                    className="btn-primary w-full"
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
