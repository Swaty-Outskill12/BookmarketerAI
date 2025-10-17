import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, DollarSign, MousePointer, Eye, Users, Activity, AlertCircle } from 'lucide-react';

interface AdPerformance {
  id: string;
  spends: number;
  impressions: number;
  clicks: number;
  booksSold: number;
  revenue: number;
  cpc: number;
  cpa: number;
  insight: string;
  action: string;
  status: 'good' | 'bad';
}

interface MetricCard {
  label: string;
  value: string;
  icon: any;
  color: string;
}

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState<MetricCard[]>([]);
  const [adPerformance, setAdPerformance] = useState<AdPerformance[]>([]);
  const [roas, setRoas] = useState(0);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);

    setTimeout(() => {
      const mockMetrics: MetricCard[] = [
        { label: 'Impressions', value: '3.5M', icon: Eye, color: 'from-blue-500 to-blue-600' },
        { label: 'Clicks', value: '13.6K', icon: MousePointer, color: 'from-cyan-500 to-cyan-600' },
        { label: 'CTR', value: '13.5K', icon: TrendingUp, color: 'from-teal-500 to-teal-600' },
        { label: 'Conversions', value: '5.2K', icon: Users, color: 'from-green-500 to-green-600' },
        { label: 'Spend', value: '$13,324', icon: DollarSign, color: 'from-orange-500 to-orange-600' },
        { label: 'Revenue', value: '$37K', icon: BarChart3, color: 'from-emerald-500 to-emerald-600' },
        { label: 'CPC', value: '$0.98', icon: Activity, color: 'from-purple-500 to-purple-600' },
        { label: 'ROAS', value: '7.04', icon: TrendingUp, color: 'from-pink-500 to-pink-600' }
      ];

      const mockAds: AdPerformance[] = [
        {
          id: 'AD-001',
          spends: 300,
          impressions: 1233223,
          clicks: 2323,
          booksSold: 25,
          revenue: 800,
          cpc: 0.13,
          cpa: 12,
          insight: 'This is performing great and bringing you $2 profit per sale',
          action: 'Increase Budget by $12 per day',
          status: 'good'
        },
        {
          id: 'AD-002',
          spends: 150,
          impressions: 1233223,
          clicks: 1623,
          booksSold: 25,
          revenue: 800,
          cpc: 0.13,
          cpa: 6,
          insight: 'This is performing BAD and bringing you $4 losses per sale.',
          action: 'Pause this Ad, and deploy another one to test',
          status: 'bad'
        }
      ];

      setMetrics(mockMetrics);
      setAdPerformance(mockAds);
      setRoas(7.04);
      setIsLoading(false);
    }, 1000);
  };

  const generateChartData = (days: number) => {
    return Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      value: Math.floor(Math.random() * 100) + 50
    }));
  };

  const impressionsData = generateChartData(30);
  const clicksData = generateChartData(30);
  const spendData = generateChartData(15);

  const renderBarChart = (data: any[], color: string, label: string) => {
    const maxValue = Math.max(...data.map(d => d.value));

    return (
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">{label}</h3>
        <div className="flex items-end justify-between gap-1 h-48">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t ${color} transition-all hover:opacity-80 cursor-pointer`}
                style={{ height: `${(item.value / maxValue) * 100}%` }}
                title={`Day ${item.day}: ${item.value}`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Day 1</span>
          <span>Day {data.length}</span>
        </div>
      </div>
    );
  };

  const renderAreaChart = (data: any[]) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Spend vs Revenue</h3>
        <div className="h-48 relative">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#22c9a8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#22c9a8" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polyline
              fill="url(#areaGradient)"
              stroke="#22c9a8"
              strokeWidth="0.5"
              points={`0,100 ${points} 100,100`}
            />
          </svg>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Sep 1</span>
          <span>Sep 15</span>
        </div>
      </div>
    );
  };

  const renderGauge = (value: number) => {
    const percentage = Math.min(value / 10, 1);
    const angle = percentage * 180 - 90;

    return (
      <div className="flex justify-center items-center">
        <div className="relative w-48 h-24">
          <svg viewBox="0 0 200 100" className="w-full h-full">
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="20"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 251.2} 251.2`}
            />
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#22c9a8" />
              </linearGradient>
            </defs>
            <line
              x1="100"
              y1="80"
              x2="100"
              y2="30"
              stroke="#1a2332"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${angle} 100 80)`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-800 mt-4">{value.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0077be] mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a2332] mb-1 sm:mb-2">Facebook Paid ADS</h1>
            <p className="text-sm sm:text-base text-gray-600">Real-time campaign performance and insights</p>
          </div>
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white rounded-lg text-sm sm:text-base font-semibold hover:brightness-110 transition-all shadow-md whitespace-nowrap">
            Create More Ads
          </button>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border-2 border-[#0077be]/20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {metrics.slice(0, 4).map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center mb-2`}>
                    <Icon size={16} className="text-white sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{metric.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {metrics.slice(4, 7).map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center mb-2`}>
                    <Icon size={16} className="text-white sm:w-5 sm:h-5" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">{metric.label}</p>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{metric.value}</p>
                </div>
              );
            })}
            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-md">
              <p className="text-xs sm:text-sm text-gray-600 mb-2 text-center">ROAS</p>
              {renderGauge(roas)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {renderBarChart(impressionsData, 'bg-blue-500', 'Impressions & CPM')}
            {renderBarChart(clicksData, 'bg-cyan-500', 'Clicks & CPC')}
          </div>

          {renderAreaChart(spendData)}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 mb-6 sm:mb-8 rounded-r-lg">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
            <p className="text-sm sm:text-base text-gray-800">
              <strong>Suggestion:</strong> You have only 1 ad running fro $15/day. Your budget is $30/day. Deploy Another Ad by Clicking Here
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white">
                <tr>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">AD</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">SPENDS</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">IMPRESSION</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">CLICKS</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">BOOK SOLD</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">REVENUE</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">CPC</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">CPA</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">ACTION</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">INSIGHT</th>
                  <th className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {adPerformance.map((ad, index) => (
                  <tr key={ad.id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-800">{ad.id}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">${ad.spends}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{ad.impressions.toLocaleString()}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{ad.clicks.toLocaleString()}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">{ad.booksSold}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">${ad.revenue}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">${ad.cpc}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">${ad.cpa}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        pause
                      </button>
                    </td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 max-w-xs">{ad.insight}</td>
                    <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                      <button className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-medium transition-colors ${
                        ad.status === 'good'
                          ? 'bg-blue-500 text-white hover:bg-blue-600'
                          : 'bg-gray-700 text-white hover:bg-gray-800'
                      }`}>
                        {ad.status === 'good' ? 'Apply' : 'Pause Ad'}
                      </button>
                      {ad.status === 'bad' && (
                        <button className="mt-2 w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs sm:text-sm">
                          Pause and Deploy Next Ad
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
