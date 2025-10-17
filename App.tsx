import { useState, useRef } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
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
import LoginModal from './components/LoginModal';
import AppDashboard from './components/AppDashboard';
import PlanPreviewModal from './components/PlanPreviewModal';
import FullPlanView from './components/FullPlanView';
import Analytics from './components/Analytics';

type ViewType = 'homepage' | 'dashboard' | 'plan-view' | 'analytics';

function AppContent() {
  const { user, signInWithEmail, signInWithGoogle } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('homepage');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPlanPreview, setShowPlanPreview] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    if (user) {
      setCurrentView('dashboard');
    } else {
      setShowLoginModal(true);
    }
  };

  const handleTryDemo = () => {
    setCurrentView('dashboard');
  };

  const handleLogin = async (email: string) => {
    try {
      await signInWithEmail(email);
      alert('Check your email for the login link!');
      setShowLoginModal(false);
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      setShowLoginModal(false);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Error signing in with Google. Please try again.');
    }
  };

  const handlePlanComplete = () => {
    setShowPlanPreview(true);
  };

  const handleSelectPlan = (plan: 'monthly' | '6months') => {
    alert(`Selected ${plan} plan. Payment integration would go here.`);
    setShowPlanPreview(false);
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
      <>
        <AppDashboard onPlanComplete={handlePlanComplete} />
        <PlanPreviewModal
          isOpen={showPlanPreview}
          onClose={() => setShowPlanPreview(false)}
          onSelectPlan={handleSelectPlan}
          bookTitle="Your Amazing Book"
        />
      </>
    );
  }

  if (currentView === 'analytics') {
    return (
      <>
        <Header
          onNavigate={handleNavigate}
          onLogin={() => setShowLoginModal(true)}
          onSignUp={() => setShowLoginModal(true)}
        />
        <Analytics />
        <Footer />
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onGoogleLogin={handleGoogleLogin}
        />
      </>
    );
  }

  return (
    <>
      <Header
        onNavigate={handleNavigate}
        onLogin={() => setShowLoginModal(true)}
        onSignUp={() => setShowLoginModal(true)}
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
        <Pricing onSelectPlan={(plan) => {
          if (user) {
            handleSelectPlan(plan);
          } else {
            setShowLoginModal(true);
          }
        }} />
      </div>
      <Testimonials />
      <FAQ />
      <FinalCTA onGetStarted={handleGetStarted} />
      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
