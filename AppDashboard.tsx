import { useState } from 'react';
import { Send, Check, Circle, Loader } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AppDashboardProps {
  onPlanComplete: () => void;
}

export default function AppDashboard({ onPlanComplete }: AppDashboardProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Great! Congratulations on starting your marketing journey. Let's build a campaign that gets your book in front of the right readers. First, tell me about your book. What's the title and genre?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const tasks = [
    { id: 1, title: 'Basic Information about Book', status: 'done' },
    { id: 2, title: 'Build Marketing Plan', status: 'ongoing' },
    { id: 3, title: 'Review and Approve Plan', status: 'todo' },
    { id: 4, title: 'Choose Subscription Plan', status: 'todo' },
    { id: 5, title: 'Launch Campaign', status: 'todo' }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: inputMessage }
    ];
    setMessages(newMessages);
    setInputMessage('');

    setTimeout(() => {
      let response = '';

      if (newMessages.length === 2) {
        response = "Excellent! Now, who is your target audience? Think about age range, interests, and reading preferences.";
      } else if (newMessages.length === 4) {
        response = "Perfect! What's your primary goal for this campaign? (e.g., increase sales, build author brand, launch a new release)";
      } else if (newMessages.length === 6) {
        response = "Great! What's your monthly advertising budget?";
      } else if (newMessages.length === 8) {
        response = "Fantastic! I have all the information I need. Let me build your personalized marketing plan...";
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: "Great! I have built your Marketing Plan, please Review and Approve."
          }]);
          setCurrentStep(3);
        }, 3000);
        return;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col lg:flex-row">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-[#2D2D2D]">Build Your Marketing Plan</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl rounded-lg px-4 sm:px-6 py-3 sm:py-4 ${
                  message.role === 'user'
                    ? 'bg-[#3A4D8F] text-white'
                    : 'bg-white text-gray-800 shadow-md'
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {currentStep === 3 && (
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <button
              onClick={onPlanComplete}
              className="btn-primary w-full text-sm sm:text-base"
            >
              View and Approve Your Book's Marketing Plan
            </button>
          </div>
        )}

        {currentStep < 3 && (
          <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex gap-2 sm:gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your response..."
                className="input-field flex-1"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#3A4D8F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:brightness-110 transition-all flex-shrink-0"
              >
                <Send size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-[#2D2D2D]">Your Progress</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-start gap-2 sm:gap-3">
              <div className="mt-1">
                {task.status === 'done' && (
                  <div className="w-6 h-6 rounded-full bg-[#28a745] flex items-center justify-center">
                    <Check className="text-white" size={16} />
                  </div>
                )}
                {task.status === 'ongoing' && (
                  <div className="w-6 h-6 rounded-full bg-[#3A4D8F] flex items-center justify-center">
                    <Loader className="text-white animate-spin" size={16} />
                  </div>
                )}
                {task.status === 'todo' && (
                  <Circle className="text-gray-300" size={24} />
                )}
              </div>
              <div>
                <p className={`text-sm sm:text-base font-medium ${
                  task.status === 'done' ? 'text-gray-500' :
                  task.status === 'ongoing' ? 'text-[#3A4D8F]' :
                  'text-gray-400'
                }`}>
                  {task.title}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 capitalize">{task.status === 'ongoing' ? 'In Progress' : task.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
