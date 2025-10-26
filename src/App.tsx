import { useState, useRef } from 'react';
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
import BookBriefPage from './BookBriefPage';
import MarketingPlanPage from './MarketingPlanPage';
import OrganicPostPlanPage from './OrganicPostPlanPage';
import FacebookPaidPostsPage from './FacebookPaidPostsPage';
import FacebookSetupPage from './FacebookSetupPage';
import ManageAdsPage from './ManageAdsPage';

type ViewType = 'homepage' | 'dashboard' | 'plan-view' | 'analytics' | 'book-brief' | 'marketing-plan' | 'organic-posts' | 'paid-posts' | 'facebook-setup' | 'manage-ads';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('homepage');

  const heroRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    setCurrentView('dashboard');
  };

  const handleTryDemo = () => {
    setCurrentView('dashboard');
  };

  const handleSelectPlan = (plan: 'monthly' | '6months') => {
    alert(`Selected ${plan} plan. Payment integration would go here.`);
    setCurrentView('plan-view');
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
    }
  };

  const handleViewTask = (task: string) => {
    setCurrentView(task as ViewType);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

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
      <DashboardPage
        onViewTask={handleViewTask}
        onViewPlan={() => setCurrentView('marketing-plan')}
      />
    );
  }

  if (currentView === 'book-brief') {
    return <BookBriefPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'marketing-plan') {
    return (
      <MarketingPlanPage
        onBack={handleBackToDashboard}
        onApprove={() => {
          alert('Marketing plan approved!');
          setCurrentView('dashboard');
        }}
      />
    );
  }

  if (currentView === 'organic-posts') {
    return <OrganicPostPlanPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'paid-posts') {
    return <FacebookPaidPostsPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'facebook-setup') {
    return <FacebookSetupPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'manage-ads') {
    return <ManageAdsPage onBack={handleBackToDashboard} />;
  }

  if (currentView === 'analytics') {
    return (
      <>
        <Header
          onNavigate={handleNavigate}
          onLogin={() => {}}
          onSignUp={() => {}}
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
        onLogin={() => {}}
        onSignUp={() => {}}
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
