import { useState } from 'react';
import { Send, Mic } from 'lucide-react';

interface ChatInterfaceProps {
  onViewPlan?: () => void;
  showPlanButton?: boolean;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface({ onViewPlan, showPlanButton = true }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi there! I am here to help you create a marketing plan for your book. What is the name of your book?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://ankursaxenaiit.app.n8n.cloud/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: userMessage,
          sessionId: localStorage.getItem('n8n-chat-session') || `session-${Date.now()}`
        })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();

      if (!localStorage.getItem('n8n-chat-session')) {
        localStorage.setItem('n8n-chat-session', data.sessionId || `session-${Date.now()}`);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.output || data.message || 'I received your message!'
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full lg:w-[40%] bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
              message.role === 'user'
                ? 'bg-gray-200 rounded-tr-sm'
                : 'bg-white border border-gray-200 rounded-tl-sm shadow-sm'
            }`}>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <p className="text-sm text-gray-500">Typing...</p>
            </div>
          </div>
        )}

        {showPlanButton && messages.length > 4 && (
          <div className="pt-2">
            <button
              onClick={onViewPlan}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View and Approve Your Book's Marketing Plan
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <Mic size={20} />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
