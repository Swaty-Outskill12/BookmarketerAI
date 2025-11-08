import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../AuthContext';
import { getLatestConversationId } from '../lib/chatService';

interface ChatContextType {
  currentPage: string;
  marketingPlanId?: string;
  bookBriefData?: Record<string, unknown>;
  conversationId?: string;
  setCurrentPage: (page: string) => void;
  setMarketingPlanId: (id: string | undefined) => void;
  setBookBriefData: (data: Record<string, unknown> | undefined) => void;
  setConversationId: (id: string | undefined) => void;
  resetConversation: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<string>('homepage');
  const [marketingPlanId, setMarketingPlanId] = useState<string | undefined>();
  const [bookBriefData, setBookBriefData] = useState<Record<string, unknown> | undefined>();
  const [conversationId, setConversationId] = useState<string | undefined>();

  useEffect(() => {
    if (user && !conversationId) {
      (async () => {
        const latestConvId = await getLatestConversationId(user.id);
        if (latestConvId) {
          console.log('ChatContext: Loaded latest conversation ID:', latestConvId);
          setConversationId(latestConvId);
        }
      })();
    }
  }, [user, conversationId]);

  const resetConversation = () => {
    console.log('ChatContext: Resetting conversation');
    setConversationId(undefined);
  };

  return (
    <ChatContext.Provider
      value={{
        currentPage,
        marketingPlanId,
        bookBriefData,
        conversationId,
        setCurrentPage,
        setMarketingPlanId,
        setBookBriefData,
        setConversationId,
        resetConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
