import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import ChatInterface from './ChatInterface';

interface FacebookPaidPostsPageProps {
  onBack: () => void;
}

export default function FacebookPaidPostsPage({ onBack }: FacebookPaidPostsPageProps) {
  return (
    <>
      <ChatInterface showPlanButton={false} />

      <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0077be] hover:text-[#22c9a8] font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            ORGANIC POST PLAN
          </button>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Facebook Paid Posts</h1>

            <div className="flex items-center gap-4">
              <span className="text-xl font-bold text-gray-800">AD1</span>
              <span className="text-gray-600">status: Not Deployed / Live / Pause</span>
              <div className="flex items-center gap-2 ml-auto">
                <button className="p-1 text-gray-600 hover:text-[#0077be] transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-1 text-gray-600 hover:text-[#0077be] transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">SETUP</h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <span className="font-semibold">Budget: </span>
                <span>$100</span>
              </div>
              <div>
                <span className="font-semibold">Dates: </span>
                <span>12 Sep - 12 Nov</span>
              </div>
              <div>
                <span className="font-semibold">Audience Targeting: </span>
                <span>Define demographics, interests, behaviors, location. (pre suggested)</span>
              </div>
              <div>
                <span className="font-semibold">Placements: </span>
                <span>All</span>
              </div>
              <div>
                <span className="font-semibold">Optimization and Delivery: </span>
                <span>Conversions</span>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">AD CONTENT</h2>
            <div className="space-y-3 text-gray-700">
              <div>
                <span className="font-semibold">Media: </span>
                <span>&lt;image for ad&gt;</span>
              </div>
              <div>
                <span className="font-semibold">Primary Text: </span>
                <span>The main body copy or description.</span>
              </div>
              <div>
                <span className="font-semibold">Headline: </span>
                <span>A short, attention-grabbing text displayed below the media.</span>
              </div>
              <div>
                <span className="font-semibold">Description: </span>
                <span>Additional detailed text about the ad.</span>
              </div>
              <div>
                <span className="font-semibold">Call-to-Action (CTA): </span>
                <span>"Learn More," OR "Shop Now,"</span>
              </div>
              <div>
                <span className="font-semibold">Website URL: </span>
                <span>The destination link users go to after clicking the ad.</span>
              </div>
              <div>
                <span className="font-semibold">Display Link: </span>
                <span>The link text shown on the ad, which can be simplified or shortened.</span>
              </div>
              <div className="pt-2">
                <span className="font-semibold">Media (links): </span>
                <button className="text-[#0077be] hover:text-[#22c9a8] font-medium ml-2 transition-colors">
                  Generate
                </button>
                <button className="text-[#0077be] hover:text-[#22c9a8] font-medium ml-4 transition-colors">
                  Upload Own
                </button>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview of Ad</h2>
            <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm max-w-md">
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#22c9a8] to-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-sm">AI ML</div>
                    <div className="text-xs text-gray-500">sponsored</div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 flex items-center justify-center mb-3">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-[#0077be] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full"></div>
                    </div>
                    <div className="text-4xl mb-2">🎁</div>
                    <div className="font-bold text-lg">5 MILLION</div>
                    <div className="text-sm">TOKENS</div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <h3 className="font-bold text-base mb-1">Are you an AI App Developer?</h3>
                <p className="text-sm text-gray-600">
                  Are you an AI App Developer? Get 5 million tokens to sign up to...
                </p>
              </div>

              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md mb-3 transition-colors">
                SIGN UP NOW
              </button>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-xs text-gray-600 mb-2">
                  AI ML. Sign up today and get Free Credits...
                </p>
                <button className="text-sm font-semibold text-gray-700 hover:text-[#0077be] transition-colors">
                  Join Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
