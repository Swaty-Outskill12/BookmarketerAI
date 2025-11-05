import { Send, Mic, Loader2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { n8nChatService, ChatMessage } from './lib/n8nChatService';
import { saveMessage, loadChatHistory } from './lib/chatStorage';

interface ChatInterfaceProps {
  userId?: string;
  onViewPlan?: () => void;
  showPlanButton?: boolean;
  conversationId?: string;
  marketingPlanId?: string;
}

export default function ChatInterface({
  userId,
  onViewPlan,
  showPlanButton = true,
  conversationId: initialConversationId,
  marketingPlanId
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(initialConversationId);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userId) {
      loadHistory();
    } else {
      setIsLoadingHistory(false);
    }
  }, [userId, initialConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadHistory = async () => {
    if (!userId) return;

    setIsLoadingHistory(true);
    try {
      const history = await loadChatHistory(userId, conversationId);
      const chatMessages: ChatMessage[] = history.map(msg => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        timestamp: new Date(msg.created_at)
      }));
      setMessages(chatMessages);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: n8nChatService.generateMessageId(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    if (userId) {
      await saveMessage(userId, 'user', userMessage.content, conversationId, marketingPlanId);
    }

    try {
      const response = await n8nChatService.sendMessage(
        userMessage.content,
        userId,
        conversationId,
        marketingPlanId ? { marketingPlanId } : undefined
      );

      const newConversationId = response.conversationId || conversationId;
      if (newConversationId && !conversationId) {
        setConversationId(newConversationId);
      }

      const assistantMessage: ChatMessage = {
        id: n8nChatService.generateMessageId(),
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (userId) {
        await saveMessage(userId, 'assistant', assistantMessage.content, newConversationId, marketingPlanId);
      }
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: n8nChatService.generateMessageId(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-full lg:w-[40%] bg-white border-r border-gray-200 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {isLoadingHistory ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="animate-spin text-[#0077be]" size={32} />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <p className="text-lg mb-2">Start a conversation</p>
              <p className="text-sm">Type a message below to begin</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gray-200 rounded-tr-sm'
                      : 'bg-white border border-gray-200 rounded-tl-sm shadow-sm'
                  }`}
                >
                  <p className="text-sm text-gray-800 whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-[#0077be]" size={16} />
                    <p className="text-sm text-gray-600">Thinking...</p>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}

        {showPlanButton && messages.length > 0 && (
          <div className="pt-2">
            <button
              onClick={onViewPlan}
              className="w-full bg-gradient-to-r from-[#0077be] to-[#22c9a8] hover:brightness-110 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View and Approve Your Book's Marketing Plan
            </button>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center gap-2">
          <button
            className="p-2 text-gray-400 hover:text-[#0077be] transition-colors"
            title="Voice input coming soon"
          >
            <Mic size={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type here"
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c9a8] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-gradient-to-r from-[#0077be] to-[#22c9a8] hover:brightness-110 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Send size={18} />
            )}
            <span className="hidden sm:inline">{isLoading ? 'Sending...' : 'Send'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
