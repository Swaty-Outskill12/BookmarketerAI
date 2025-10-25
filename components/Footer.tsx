import { useState } from 'react';
import { Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribeStatus('Subscribing...');

    setTimeout(() => {
      setSubscribeStatus('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 3000);
    }, 1000);
  };

  const quickLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'About Us', href: '#about' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#1a2332] to-[#2d3748] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          <div className="space-y-4">
            <div className="flex items-start gap-2 sm:gap-3">
              <img
                src="/image copy copy copy.png"
                alt="BookmarketerAI"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold">BookmarketerAI</span>
                <span className="text-xs text-gray-400 font-medium mt-0.5 sm:mt-1">Easy. Automated. Built for Authors</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-powered marketing strategies designed to help authors reach their ideal readers and maximize book sales.
            </p>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22c9a8] focus:border-transparent transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white rounded-lg font-semibold hover:brightness-110 transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Subscribe
              </button>
              {subscribeStatus && (
                <p className="text-sm text-[#22c9a8]">{subscribeStatus}</p>
              )}
            </form>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-[#22c9a8] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 sm:mt-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h3>
              <a
                href="mailto:support@bookmarketerai.com"
                className="text-gray-300 hover:text-[#22c9a8] transition-colors duration-200 text-sm"
              >
                support@bookmarketerai.com
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Follow Us</h3>
            <div className="flex gap-3 sm:gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`text-gray-300 ${social.color} transition-colors duration-200`}
                  aria-label={social.name}
                >
                  <social.icon size={20} className="sm:w-6 sm:h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} BookmarketerAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
