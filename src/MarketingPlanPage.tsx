import { ArrowLeft } from 'lucide-react';

interface MarketingPlanPageProps {
  onBack: () => void;
  onApprove?: () => void;
}

export default function MarketingPlanPage({ onBack, onApprove }: MarketingPlanPageProps) {
  return (
    <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#0077be] hover:text-[#22c9a8] font-medium transition-colors"
            >
              <ArrowLeft size={20} />
              MARKETING PLAN
            </button>
            <button
              onClick={onApprove}
              className="text-[#0077be] hover:text-[#22c9a8] font-semibold transition-colors"
            >
              Approve and Proceed
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            FACEBOOK MARKETING PLAN : 80/20 Sales & Marketing
          </h1>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ORGANIC POST PLAN</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Step 1: Optimize Your Business Page</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Profile Setup:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Page Name: "80/20 Sales & Marketing by Perry Marshall" or "Perry Marshall - 80/20 Business Expert"</li>
                      <li>Profile Picture: Professional headshot of Perry Marshall or book cover</li>
                      <li>Cover Photo: High-quality book cover with "Available Now" text overlay</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">About Section:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>"Discover how to get 80% of your results from 20% of your efforts"</li>
                      <li>Include webs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">PAID CAMPAIGN PLAN</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Step 1: Optimize Your Business Page</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Profile Setup:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Page Name: "80/20 Sales & Marketing by Perry Marshall" or "Perry Marshall - 80/20 Business Expert"</li>
                      <li>Profile Picture: Professional headshot of Perry Marshall or book cover</li>
                      <li>Cover Photo: High-quality book cover with "Available Now" text overlay</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">About Section:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>"Discover how to get 80% of your results from 20% of your efforts"</li>
                      <li>Include webs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">CONCLUSION / NEXT STEPS</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">Step 1: Optimize Your Business Page</h3>
                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Profile Setup:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Page Name: "80/20 Sales & Marketing by Perry Marshall" or "Perry Marshall - 80/20 Business Expert"</li>
                      <li>Profile Picture: Professional headshot of Perry Marshall or book cover</li>
                      <li>Cover Photo: High-quality book cover with "Available Now" text overlay</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">About Section:</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>"Discover how to get 80% of your results from 20% of your efforts"</li>
                      <li>Include webs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
  );
}
