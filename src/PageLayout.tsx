import { ReactNode, useEffect } from 'react';
import Header from './components/Header';
import ProgressStepper from './ProgressStepper';
import N8NChatWidget from './components/N8NChatWidget';
import { useChatContext } from './contexts/ChatContext';
import { useAuth } from './AuthContext';

interface PageLayoutProps {
  children: ReactNode;
  currentStep: string;
  onNavigate: (section: string) => void;
  onStepClick?: (stepId: string) => void;
}

export default function PageLayout({ children, currentStep, onNavigate, onStepClick }: PageLayoutProps) {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const { setCurrentPage } = useChatContext();

  useEffect(() => {
    setCurrentPage(currentStep);
  }, [currentStep, setCurrentPage]);

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      <Header
        onNavigate={onNavigate}
        onLogin={() => onNavigate('auth')}
        onSignUp={() => onNavigate('auth')}
        showDashboardLink={true}
        isAuthenticated={isAuthenticated}
      />

      <ProgressStepper currentStep={currentStep} onStepClick={onStepClick} />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-[40%] bg-white border-r border-gray-200 flex flex-col">
          <N8NChatWidget isVisible={isAuthenticated} />
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
