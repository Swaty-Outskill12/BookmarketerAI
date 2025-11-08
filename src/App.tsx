import { useState, useRef, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useChatContext } from './contexts/ChatContext';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import HowItWorks from './components/HowItWorks';
import Deliverables from './components/Deliverables';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FullPlanView from './components/FullPlanView';
import Analytics from './components/Analytics';
import DashboardPage from './DashboardPage';
import BookBriefPageEnhanced from './BookBriefPageEnhanced';
import MarketingPlanPage from './MarketingPlanPage';
import OrganicPostPlanPage from './OrganicPostPlanPage';
import FacebookPaidPostsPage from './FacebookPaidPostsPage';
import FacebookSetupPage from './FacebookSetupPage';
import ManageAdsPage from './ManageAdsPage';
import AuthPage from './AuthPage';
import HelpPage from './HelpPage';
import PageLayout from './PageLayout';

type ViewType = 'homepage' | 'auth' | 'dashboard' | 'plan-view' | 'analytics' | 'book-brief' | 'marketing-plan' | 'organic-posts' | 'paid-posts' | 'facebook-setup' | 'manage-ads' | 'help';

function App() {
  const { user, loading } = useAuth();
  const { setCurrentPage } = useChatContext();
  const [currentView, setCurrentView] = useState<ViewType>('homepage');

  useEffect(() => {
    setCurrentPage(currentView);
  }, [currentView, setCurrentPage]);

  const heroRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = !!user;

  const handleGetStarted = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('auth');
    }
  };

  const handleTryDemo = () => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('auth');
    }
  };

  const handleSelectPlan = (plan: 'monthly' | '6months') => {
    if (isAuthenticated) {
      alert(`Selected ${plan} plan. Payment integration would go here.`);
      setCurrentView('plan-view');
    } else {
      setCurrentView('auth');
    }
  };

  const handleApprovePlan = () => {
    alert('Plan approved! Campaign setup would begin here.');
    setCurrentView('homepage');
  };

  const handleBackToHomepage = () => {
    setCurrentView('homepage');
  };

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      setCurrentView('homepage');
      setTimeout(() => {
        heroRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (section === 'how-it-works') {
      setCurrentView('homepage');
      setTimeout(() => {
        howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (section === 'pricing') {
      setCurrentView('homepage');
      setTimeout(() => {
        pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (section === 'about') {
      setCurrentView('homepage');
      setTimeout(() => {
        heroRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (section === 'analytics') {
      setCurrentView('analytics');
    } else if (section === 'dashboard') {
      setCurrentView('dashboard');
    } else if (section === 'auth') {
      setCurrentView('auth');
    }
  };

  const handleViewTask = (task: string) => {
    setCurrentView(task as ViewType);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleAuthenticated = () => {
    setCurrentView('dashboard');
  };

  const handleStepClick = (stepId: string) => {
    setCurrentView(stepId as ViewType);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077be] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'auth') {
    return (
      <AuthPage
        onAuthenticated={handleAuthenticated}
        onBackToHome={handleBackToHomepage}
      />
    );
  }

  if (currentView === 'help') {
    return <HelpPage onBack={() => setCurrentView('organic-posts')} />;
  }

  if (currentView === 'plan-view') {
    return (
      <FullPlanView
        onApprove={handleApprovePlan}
        onBack={handleBackToHomepage}
        bookTitle="Your Amazing Book"
      />
    );
  }

  if (currentView === 'dashboard') {
    return (
      <PageLayout
        currentStep="dashboard"
        onNavigate={handleNavigate}
        onStepClick={handleStepClick}
      >
        <DashboardPage
          onViewTask={handleViewTask}
          onViewPlan={() => setCurrentView('marketing-plan')}
        />
      </PageLayout>
    );
  }

  if (currentView === 'book-brief') {
    return (
      <PageLayout
        currentStep="book-brief"
        onNavigate={handleNavigate}
        onStepClick={handleStepClick}
      >
        <BookBriefPageEnhanced
          onBack={handleBackToDashboard}
          onSave={(data) => {
            console.log('Book brief saved:', data);
            alert('Book brief saved successfully!');
          }}
        />
      </PageLayout>
    );
  }

  if (currentView === 'marketing-plan') {
    return (
      <PageLayout
        currentStep="marketing-plan"
        onNavigate={handleNavigate}
        onStepClick={handleStepClick}
      >
        <MarketingPlanPage
          onBack={handleBackToDashboard}
          onApprove={() => {
            alert('Marketing plan approved!');
            setCurrentView('dashboard');
          }}
        />
      </PageLayout>
    );
  }

  if (currentView === 'organic-posts') {
    return (
      <PageLayout
        currentStep="organic-posts"
        onNavigate={handleNavigate}
        onStepClick={handleStepClick}
      >
        <OrganicPostPlanPage
          onBack={handleBackToDashboard}
          onHelp={() => setCurrentView('help')}
        />
      </PageLayout>
    );
  }

  if (currentView === 'paid-posts') {
    return (
      <PageLayout
        currentStep="paid-posts"
        onNavigate={handleNavigate}
        onStepClick={handleStepClick}
      >
        <FacebookPaidPostsPage onBack={handleBackToDashboard} />
      </PageLayout>
    );
  }

  if (currentView === 'facebook-setup') {
    return (
      <PageLayout
        currentStep="facebook-setup"
        onNavigate={handleNavigate}
        onStepClick={handleStepClick}
      >
        <FacebookSetupPage onBack={handleBackToDashboard} />
      </PageLayout>
    );
  }

  if (currentView === 'manage-ads') {
    return (
      <PageLayout
        currentStep="manage-ads"
        onNavigate={handleNavigate}
        onStepClick={handleStepClick}
      >
        <ManageAdsPage onBack={handleBackToDashboard} />
      </PageLayout>
    );
  }

  if (currentView === 'analytics') {
    return (
      <>
        <Header
          onNavigate={handleNavigate}
          onLogin={() => setCurrentView('auth')}
          onSignUp={() => setCurrentView('auth')}
          showDashboardLink={isAuthenticated}
          isAuthenticated={isAuthenticated}
        />
        <Analytics />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header
        onNavigate={handleNavigate}
        onLogin={() => setCurrentView('auth')}
        onSignUp={() => setCurrentView('auth')}
        isAuthenticated={isAuthenticated}
      />
      <div ref={heroRef}>
        <Hero onGetStarted={handleGetStarted} onTryDemo={handleTryDemo} />
      </div>
      <div ref={howItWorksRef}>
        <HowItWorks />
      </div>
      <Problem />
      <Solution />
      <Deliverables />
      <div ref={pricingRef}>
        <Pricing onSelectPlan={handleSelectPlan} />
      </div>
      <Testimonials />
      <FAQ />
      <FinalCTA onGetStarted={handleGetStarted} />
      <Footer />
    </>
  );
}

export default App;
