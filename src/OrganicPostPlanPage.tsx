import { ArrowLeft } from 'lucide-react';

import ChatInterface from './ChatInterface';
import { useAuth } from './AuthContext';

interface OrganicPostPlanPageProps {
  onBack: () => void;
  onHelp?: () => void;
}

export default function OrganicPostPlanPage({ onBack, onHelp }: OrganicPostPlanPageProps) {
  const { user } = useAuth();
  const posts = [
    {
      id: 1,
      type: 'IMAGE',
      content: 'Great! Congratulations on starting, you are among 1% of people who have written the book after deciding to write. Most people are not even able to finish it.',
      date: '14 Nov 2025'
    },
    {
      id: 2,
      type: 'IMAGE',
      content: 'Great! Congratulations on starting, you are among 1% of people who have written the book after deciding to write. Most people are not even able to finish it.',
      date: '24 Nov 2025'
    },
    {
      id: 3,
      type: 'IMAGE',
      content: 'Great! Congratulations on starting, you are among 1% of people who have written the book after deciding to write. Most people are not even able to finish it.',
      date: null
    }
  ];

  return (
    <>
      <ChatInterface userId={user?.id} showPlanButton={false} />

      <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#0077be] hover:text-[#22c9a8] font-medium transition-colors"
            >
              <ArrowLeft size={20} />
              ORGANIC POST PLAN
            </button>
            <button
              onClick={onHelp}
              className="text-[#0077be] hover:text-[#22c9a8] font-semibold transition-colors"
            >
              HELP - How to Post
            </button>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Facebook Organic Post Plan
          </h1>

          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-xl font-bold text-gray-900 mb-4">POST {post.id}</h3>

                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Type: </span>
                    <span className="text-gray-600">{post.type}</span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Post content</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{post.content}</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-700">Media:</span>
                      <span className="text-gray-500">&lt;images&gt;</span>
                      <button className="text-[#0077be] hover:text-[#22c9a8] font-medium text-sm transition-colors">
                        Generate
                      </button>
                    </div>
                  </div>

                  {post.date && (
                    <div className="flex items-center justify-between pt-2 border-t border-gray-300">
                      <div>
                        <span className="font-semibold text-gray-700">Suggested Posting Date: </span>
                        <span className="text-gray-600">{post.date}</span>
                      </div>
                      <button className="text-[#0077be] hover:text-[#22c9a8] font-medium text-sm transition-colors">
                        I have posted this
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
