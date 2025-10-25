import { Send, Mic } from 'lucide-react';

interface ChatInterfaceProps {
  onViewPlan?: () => void;
  showPlanButton?: boolean;
}

export default function ChatInterface({ onViewPlan, showPlanButton = true }: ChatInterfaceProps) {
  return (
    <div className="w-full lg:w-[40%] bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-gray-200 rounded-2xl rounded-tr-sm px-4 py-3">
            <p className="text-sm text-gray-800">
              My Book name is AI Course 101, I am trying to get it to sale
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[85%] bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-800">
              Great! Congratulations on starting, you are among 1% of people who have written the book after deciding to write. Most people are not even able to finish it.
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[85%] bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-800">
              Lets get started, I have some questions to make a better marketing Plan
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[85%] bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-800">
              Here are questions : &lt;questions&gt;
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[85%] bg-gray-200 rounded-2xl rounded-tr-sm px-4 py-3">
            <p className="text-sm text-gray-800">
              Here are all the answers
            </p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="max-w-[85%] bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
            <p className="text-sm text-gray-800">
              Great! Have built your Marketing Plan, please Review and Approve. If you want to make any changes, you can make in it directly OR let me know
            </p>
          </div>
        </div>

        {showPlanButton && (
          <div className="pt-2">
            <button
              onClick={onViewPlan}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View and Approve Your Book's Marketing Plan
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
            <Mic size={20} />
          </button>
          <input
            type="text"
            placeholder="Type here"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
            <Send size={18} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
