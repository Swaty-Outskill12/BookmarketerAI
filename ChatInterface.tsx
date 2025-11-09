import { useEffect, useRef } from 'react';

interface ChatInterfaceProps {
  onViewPlan?: () => void;
  showPlanButton?: boolean;
}

export default function ChatInterface({ onViewPlan, showPlanButton = true }: ChatInterfaceProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

      createChat({
        webhookUrl: 'https://ankursaxenaiit.app.n8n.cloud/webhook/f97b5212-483e-4e5d-a2bc-4760649f187f/chat',
        mode: 'fullscreen',
        chatInputKey: 'chatInput',
        chatSessionKey: 'sessionId',
        metadata: {},
        showWelcomeScreen: false,
        defaultLanguage: 'en',
        initialMessages: [
          'Hi there! I am here to help you create a marketing plan for your book. What is the name of your book?'
        ],
        i18n: {
          en: {
            title: 'Book Marketing Assistant',
            subtitle: 'Let me help you create a marketing plan',
            footer: '',
            getStarted: 'Start Chat',
            inputPlaceholder: 'Type your message...',
          },
        },
      });
    `;

    if (chatContainerRef.current) {
      chatContainerRef.current.appendChild(script);
    }

    return () => {
      if (chatContainerRef.current && script.parentNode) {
        script.remove();
      }
    };
  }, []);

  return (
    <div className="w-full lg:w-[40%] bg-white border-r border-gray-200 flex flex-col relative">
      <div ref={chatContainerRef} className="flex-1 w-full h-full" />

      {showPlanButton && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
          <button
            onClick={onViewPlan}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
          >
            View and Approve Your Book's Marketing Plan
          </button>
        </div>
      )}
    </div>
  );
}
