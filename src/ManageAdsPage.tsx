import { ArrowLeft } from 'lucide-react';

import ChatInterface from './ChatInterface';

interface ManageAdsPageProps {
  onBack: () => void;
}

export default function ManageAdsPage({ onBack }: ManageAdsPageProps) {
  return (
    <>
      <ChatInterface showPlanButton={false} />

      <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0077be] hover:text-[#22c9a8] font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            MANAGE ADS
          </button>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Facebook Paid ADS</h1>
            <button className="text-[#0077be] hover:text-[#22c9a8] font-semibold transition-colors">
              Create More Ads
            </button>
          </div>

          <div className="mb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Total Spend</h3>
                <p className="text-3xl font-bold text-gray-900">$450</p>
                <p className="text-sm text-green-600 mt-1">↑ 12% vs last week</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-gray-900">$1,600</p>
                <p className="text-sm text-green-600 mt-1">↑ 18% vs last week</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Books Sold</h3>
                <p className="text-3xl font-bold text-gray-900">50</p>
                <p className="text-sm text-green-600 mt-1">↑ 15% vs last week</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="font-semibold">Performance Chart</p>
                  <p className="text-sm">Impressions, Clicks, and Conversions over time</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-800">
              <strong>Suggestion</strong> - You have only 1 ad running for $15/day. Your budget is $30/day.{' '}
              <button className="text-[#0077be] hover:text-[#22c9a8] font-semibold underline transition-colors">
                Deploy Another Ad by Clicking Here
              </button>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">AD</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">SPENDS</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">IMPRESSION</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">CLICKS</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">BOOK SOLD</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">REVENUE</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">CPC</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">CPA</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">ACTION</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">INSIGHT</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">AD 1</td>
                  <td className="px-4 py-4 text-sm text-gray-700">$300</td>
                  <td className="px-4 py-4 text-sm text-gray-700">1,233,2223</td>
                  <td className="px-4 py-4 text-sm text-gray-700">2,323</td>
                  <td className="px-4 py-4 text-sm text-gray-700">25</td>
                  <td className="px-4 py-4 text-sm text-gray-700">$800</td>
                  <td className="px-4 py-4 text-sm text-gray-700">$0.13</td>
                  <td className="px-4 py-4 text-sm text-gray-700">$12</td>
                  <td className="px-4 py-4">
                    <button className="px-4 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full text-sm font-medium transition-colors">
                      pause
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    This is performing great and bringing you $2 profit per cala
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-700">
                      Increase Budget by $12 per day{' '}
                      <button className="text-[#0077be] hover:text-[#22c9a8] font-semibold ml-2 transition-colors">
                        Apply
                      </button>
                    </div>
                  </td>
                </tr>

                <tr className="border-b border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">AD 2</td>
                  <td className="px-4 py-4 text-sm text-gray-700">$150</td>
                  <td className="px-4 py-4 text-sm text-gray-700">1,233,2223</td>
                  <td className="px-4 py-4 text-sm text-gray-700">1,623</td>
                  <td className="px-4 py-4 text-sm text-gray-700">25</td>
                  <td className="px-4 py-4 text-sm text-gray-700">$800</td>
                  <td className="px-4 py-4 text-sm text-gray-700">$0.13</td>
                  <td className="px-4 py-4 text-sm text-gray-700">$6</td>
                  <td className="px-4 py-4">
                    <button className="px-4 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-full text-sm font-medium transition-colors">
                      pause
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    This is performing BAD and bringing you -$1 losses per cala.
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm space-y-1">
                      <p className="text-gray-700">Pause this Ad, and deploy another one to test</p>
                      <div className="space-x-3">
                        <button className="text-[#0077be] hover:text-[#22c9a8] font-semibold transition-colors">
                          Pause Ad
                        </button>
                        <button className="text-[#0077be] hover:text-[#22c9a8] font-semibold transition-colors">
                          Pause and Deploy Next Ad
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
