import { useEffect, useRef, useState } from 'react';
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';
import { useAuth } from '../AuthContext';
import { useChatContext } from '../contexts/ChatContext';

interface N8NChatWidgetProps {
  isVisible?: boolean;
}

export default function N8NChatWidget({ isVisible = true }: N8NChatWidgetProps) {
  const { user } = useAuth();
  const { currentPage, marketingPlanId, bookBriefData, conversationId, setConversationId } = useChatContext();
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!user || !isVisible) {
      console.log('N8N Chat Widget: User not authenticated or not visible');
      return;
    }

    if (!chatContainerRef.current) {
      console.log('N8N Chat Widget: Container ref not ready');
      return;
    }

    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('N8N Chat Widget: Webhook URL not configured');
      setError('Chat is not configured. Please check your environment settings.');
      return;
    }

    console.log('N8N Chat Widget: Initializing chat for user:', user.id);
    console.log('N8N Chat Widget: Current page:', currentPage);
    console.log('N8N Chat Widget: Webhook URL:', webhookUrl);

    try {
      const context: Record<string, unknown> = {
        userId: user.id,
        email: user.email,
        currentPage,
        timestamp: new Date().toISOString(),
      };

      if (marketingPlanId) {
        context.marketingPlanId = marketingPlanId;
      }

      if (bookBriefData) {
        context.bookBrief = bookBriefData;
      }

      const getInitialMessage = () => {
        switch (currentPage) {
          case 'book-brief':
            return 'Hello! I can help you create a comprehensive book brief. What would you like to know?';
          case 'marketing-plan':
            return 'Hi! I can assist you with your marketing plan. Feel free to ask any questions!';
          case 'organic-posts':
            return 'Welcome! Need help creating engaging organic posts for your book?';
          case 'paid-posts':
            return 'Hello! I can guide you through creating effective Facebook paid ads.';
          case 'facebook-setup':
            return 'Hi! Let me help you set up your Facebook advertising account.';
          case 'manage-ads':
            return 'Welcome! I can help you optimize and manage your ad campaigns.';
          case 'dashboard':
            return 'Hello! How can I help you with your book marketing today?';
          default:
            return 'Hello! How can I assist you with your book marketing?';
        }
      };

      console.log('N8N Chat Widget: Creating chat instance...');

      const chatInstance = createChat({
        target: '#n8n-chat-container',
        webhookUrl,
        webhookConfig: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Webhook-Auth': import.meta.env.VITE_N8N_WEBHOOK_API_KEY || '',
          },
        },
        initialMessages: [getInitialMessage()],
        i18n: {
          en: {
            title: 'Marketing Assistant',
            subtitle: 'AI-powered help for your book',
            footer: '',
            getStarted: 'New Conversation',
            inputPlaceholder: 'Type your message...',
          },
        },
        metadata: context,
        mode: 'fullscreen',
        chatInputKey: 'message',
        chatSessionKey: 'sessionId',
        defaultLanguage: 'en',
        showWelcomeScreen: false,
      });

      console.log('N8N Chat Widget: Chat instance created successfully');
      chatInstanceRef.current = chatInstance;
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      console.error('Error initializing chat widget:', err);
      setError('Failed to initialize chat. Please refresh the page.');
    }

    return () => {
      if (chatInstanceRef.current && typeof chatInstanceRef.current.destroy === 'function') {
        try {
          console.log('N8N Chat Widget: Destroying chat instance');
          chatInstanceRef.current.destroy();
        } catch (err) {
          console.error('Error destroying chat instance:', err);
        }
      }
      setIsInitialized(false);
    };
  }, [user, isVisible, currentPage, marketingPlanId, bookBriefData]);

  if (!user || !isVisible) {
    return null;
  }

  if (error) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-sm z-50">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="n8n-chat-container"
      ref={chatContainerRef}
      className="n8n-chat-widget-container"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
    </div>
  );
}
