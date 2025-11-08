import { ArrowLeft, Check } from 'lucide-react';
import { useState } from 'react';

interface FacebookSetupPageProps {
  onBack: () => void;
}

export default function FacebookSetupPage({ onBack }: FacebookSetupPageProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-4xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0077be] hover:text-[#22c9a8] font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            FACEBOOK SETUP
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            FACEBOOK SETUP TO START
          </h1>

          <div className="space-y-8 text-gray-700">
            <p className="text-base leading-relaxed">
              You need a personal "key" and a "business hub" before you can run ads.
            </p>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Step 1: Create a Personal Facebook Profile
              </h2>
              <p className="mb-3 leading-relaxed">
                You must have a personal Facebook account to create and manage a Business Page and a Business Portfolio. This is your admin access.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  Go to{' '}
                  <a
                    href="http://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0077be] hover:text-[#22c9a8] underline transition-colors"
                  >
                    facebook.com
                  </a>{' '}
                  and click <strong>Create new account</strong>.
                </li>
                <li>Fill in your details (Name, Email/Mobile, Password, Birthday, Gender).</li>
                <li>Complete the sign-up and verification process.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Step 2: Create a Facebook Business Page
              </h2>
              <p className="mb-3 leading-relaxed">
                All ads must run from a Business Page, not a personal profile. This page represents your business or brand.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Log into your personal profile.</li>
                <li>
                  Navigate to the <strong>Pages</strong> section or go to{' '}
                  <a
                    href="http://facebook.com/pages/create"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0077be] hover:text-[#22c9a8] underline transition-colors"
                  >
                    facebook.com/pages/create
                  </a>
                  .
                </li>
                <li>
                  Fill in the required information:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li><strong>Page Name:</strong> Your business or brand name.</li>
                    <li><strong>Category:</strong> The industry your business is in (e.g., "E-commerce", "Local Business").</li>
                    <li><strong>Bio:</strong> A brief description of your business.</li>
                  </ul>
                </li>
                <li>Click <strong>Create Page</strong>.</li>
                <li>
                  <strong>Optimize the Page:</strong> Add a profile picture (usually your logo), a cover photo, contact information, and a clear Call to Action (CTA) button (e.g., "Shop Now," "Contact Us").
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Step 3: Create a Meta Business Portfolio (formerly Business Manager)
              </h2>
              <p className="mb-3 leading-relaxed">
                This is your central control panel for all your Meta assets (Pages, Ad Accounts, Pixel).
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  Go to{' '}
                  <a
                    href="http://business.facebook.com/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0077be] hover:text-[#22c9a8] underline transition-colors"
                  >
                    business.facebook.com/overview
                  </a>{' '}
                  and click <strong>Create account</strong> or <strong>Create a Business Portfolio</strong>.
                </li>
                <li>Enter your business name, your name, and your business email.</li>
                <li>Follow the prompts to finalize the setup.</li>
                <li>
                  <strong>Connect Your Assets:</strong> In your Business Portfolio settings, add the Facebook Business Page you created in Step 2.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Step 4: Create Your Ad Account
              </h2>
              <p className="mb-3 leading-relaxed">
                The Ad Account is where you pay for your ads and track your spend.
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>
                  In your <strong>Meta Business Portfolio</strong>, navigate to <strong>Settings</strong> (or Business Settings).
                </li>
                <li>
                  Find <strong>Accounts → Ad Accounts</strong>.
                </li>
                <li>
                  Click <strong>Add → Create a new Ad Account</strong>.
                </li>
                <li>
                  Provide the account name, time zone, and crucially, <strong>your preferred currency (this cannot be changed later).</strong>
                </li>
                <li>Assign yourself as the admin of the new Ad Account.</li>
                <li>
                  <strong>Add Payment Method:</strong> Navigate to the Payment Settings within the Ad Account and enter your credit card or other payment information. <strong>Your ads will not run without this.</strong>
                </li>
              </ol>
            </section>

            <div className="pt-6 border-t border-gray-200 mt-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setIsCompleted(!isCompleted)}
                  className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-[#0077be] border-[#0077be]'
                      : 'border-gray-300 hover:border-[#6dd4c2]'
                  }`}
                >
                  {isCompleted && <Check size={16} className="text-white" />}
                </div>
                <span className="text-base text-gray-800 select-none">
                  I have Completed the Facebook Business Account Setup
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
  );
}
