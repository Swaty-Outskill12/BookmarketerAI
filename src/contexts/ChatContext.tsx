import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  currentPage: string;
  marketingPlanId?: string;
  bookBriefData?: Record<string, unknown>;
  setCurrentPage: (page: string) => void;
  setMarketingPlanId: (id: string | undefined) => void;
  setBookBriefData: (data: Record<string, unknown> | undefined) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<string>('homepage');
  const [marketingPlanId, setMarketingPlanId] = useState<string | undefined>();
  const [bookBriefData, setBookBriefData] = useState<Record<string, unknown> | undefined>();

  return (
    <ChatContext.Provider
      value={{
        currentPage,
        marketingPlanId,
        bookBriefData,
        setCurrentPage,
        setMarketingPlanId,
        setBookBriefData,
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
