import { ReactNode } from 'react';
import Header from './components/Header';
import ProgressStepper from './ProgressStepper';

interface PageLayoutProps {
  children: ReactNode;
  currentStep: string;
  onNavigate: (section: string) => void;
  onStepClick?: (stepId: string) => void;
}

export default function PageLayout({ children, currentStep, onNavigate, onStepClick }: PageLayoutProps) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

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

      <div className="flex-1 flex flex-col lg:flex-row">
        {children}
      </div>
    </div>
  );
}
