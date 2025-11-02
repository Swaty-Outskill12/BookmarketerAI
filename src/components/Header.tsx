import { useAuth } from '../AuthContext';
import { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
  showDashboardLink?: boolean;
  isAuthenticated?: boolean;
}

interface Profile {
  full_name: string | null;
  email: string;
}

export default function Header({ onNavigate, onLogin, onSignUp, showDashboardLink = false, isAuthenticated = false }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.user_metadata?.full_name || null,
        email: user.email || ''
      });
    } else {
      setProfile(null);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      onNavigate('home');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const displayName = profile?.full_name || profile?.email || 'User';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4 cursor-pointer" onClick={() => onNavigate('home')}>
            <img
              src="/image copy copy.png"
              alt="BookmarketerAI Logo"
              className="h-10 sm:h-12 md:h-16 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-2xl md:text-3xl font-bold text-[#1a2332]">
                Bookmarketer<span className="text-[#0077be]">AI</span>
              </span>
              <span className="text-xs sm:text-sm text-gray-600 font-medium mt-0.5 sm:mt-1 text-center hidden sm:block">
                Easy. Automated. Built for Authors
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {showDashboardLink && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-[#1a2332] hover:text-[#22c9a8] transition-colors font-medium text-lg"
              >
                Dashboard
              </button>
            )}
            <button
              onClick={() => onNavigate('about')}
              className="text-[#1a2332] hover:text-[#22c9a8] transition-colors font-medium text-lg"
            >
              About Us
            </button>
            <button
              onClick={() => onNavigate('how-it-works')}
              className="text-[#1a2332] hover:text-[#22c9a8] transition-colors font-medium text-lg"
            >
              How It Works
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="text-[#1a2332] hover:text-[#22c9a8] transition-colors font-medium text-lg"
            >
              Pricing
            </button>
            <button
              onClick={() => onNavigate('analytics')}
              className="text-[#1a2332] hover:text-[#22c9a8] transition-colors font-medium text-lg"
            >
              Analytics
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={onLogin}
                  className="text-[#1a2332] hover:text-[#22c9a8] transition-colors font-medium text-sm sm:text-base lg:text-lg"
                >
                  Login
                </button>
                <button
                  onClick={onSignUp}
                  className="bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:brightness-110 hover:shadow-lg"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-sm text-gray-600">
                  {displayName}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[#1a2332] hover:text-[#22c9a8] transition-colors font-medium text-sm sm:text-base"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
