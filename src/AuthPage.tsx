import { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './AuthContext';

interface AuthPageProps {
  onAuthenticated: () => void;
  onBackToHome: () => void;
}

export default function AuthPage({ onAuthenticated, onBackToHome }: AuthPageProps) {
  const { signInWithPassword, signUpWithPassword, signInWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithPassword(formData.email, formData.password);
        onAuthenticated();
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        await signUpWithPassword(formData.email, formData.password, formData.fullName);
        setError('Account created! Please check your email to verify your account.');
        setFormData({ email: '', password: '', fullName: '', confirmPassword: '' });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message || 'An error occurred with Google sign-in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9F9F9] to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4 cursor-pointer" onClick={onBackToHome}>
            <img
              src="/image copy copy.png"
              alt="BookmarketerAI Logo"
              className="h-12 w-auto object-contain"
            />
            <span className="text-3xl font-bold text-[#1a2332]">
              Bookmarketer<span className="text-[#0077be]">AI</span>
            </span>
          </div>
          <h1 className="text-3xl font-bold text-[#1a2332] mb-2">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to continue your marketing journey' : 'Create your account and start marketing'}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                isLogin
                  ? 'bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                !isLogin
                  ? 'bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className={`mb-4 p-3 rounded-lg ${error.includes('created') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-300 rounded-lg px-6 py-3 font-semibold hover:bg-gray-50 transition-all duration-200 hover:shadow-md mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your full name"
                  className="input-field"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter your password"
                  className="input-field pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm your password"
                  className="input-field"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#0077be] focus:ring-[#22c9a8]" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-[#0077be] hover:text-[#22c9a8] font-semibold transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail size={20} />
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {!isLogin && (
            <p className="text-xs text-gray-500 text-center mt-4">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={onBackToHome}
            className="text-gray-600 hover:text-[#0077be] font-medium transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
