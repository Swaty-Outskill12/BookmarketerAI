import ChatInterface from './ChatInterface';
import { useAuth } from './AuthContext';

interface DashboardPageProps {
  onViewTask: (task: string) => void;
  onViewPlan?: () => void;
}

export default function DashboardPage({ onViewTask, onViewPlan }: DashboardPageProps) {
  const { user } = useAuth();
  const tasks = [
    { id: 1, title: 'Book Brief', status: 'Done', action: 'book-brief' },
    { id: 2, title: 'Build Marketing Plan (1)', status: 'To do', action: 'marketing-plan' },
    { id: 3, title: 'Build Organic Post (6)', status: 'To do', action: 'organic-posts' },
    { id: 4, title: 'Create Facebook Paid Ads (10)', status: 'To do', action: 'paid-posts' },
    { id: 5, title: 'Start on Facebook (Setup)', status: 'To do', action: 'facebook-setup' },
    { id: 6, title: 'Optimize Campaigns', status: 'To do', action: 'manage-ads' }
  ];

  return (
    <>
      <ChatInterface userId={user?.id} onViewPlan={onViewPlan} showPlanButton={true} />

      <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-3xl">
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span
                    className={`text-sm font-semibold ${
                      task.status === 'Done' ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {task.status}
                  </span>
                  <span className="text-base text-gray-800">{task.title}</span>
                </div>
                <button
                  onClick={() => onViewTask(task.action)}
                  className="text-[#0077be] hover:text-[#22c9a8] font-medium text-sm transition-colors"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
