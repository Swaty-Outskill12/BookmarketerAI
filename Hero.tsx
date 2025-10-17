import { Send, Sparkles, Target, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeroProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
}

export default function Hero({ onGetStarted, onTryDemo }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const fullText = "Tell about your book - name, genre, summary";

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typedText, fullText]);

  return (
    <section className="relative section-container text-center pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] animate-orb-1">
          <Sparkles className="text-[#0077be] opacity-[0.15]" size={80} />
        </div>
        <div className="absolute top-[20%] right-[10%] animate-orb-2">
          <Sparkles className="text-[#22c9a8] opacity-[0.12]" size={100} />
        </div>
        <div className="absolute bottom-[15%] left-[15%] animate-orb-3">
          <Sparkles className="text-[#2fb574] opacity-[0.1]" size={90} />
        </div>
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 animate-orb-4">
          <Sparkles className="text-[#0077be] opacity-[0.08]" size={120} />
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[8%] left-[12%] w-2 h-2 bg-[#0077be] rounded-full opacity-40 animate-particle-1"></div>
        <div className="absolute top-[15%] right-[18%] w-1.5 h-1.5 bg-[#22c9a8] rounded-full opacity-50 animate-particle-2"></div>
        <div className="absolute top-[25%] left-[25%] w-2 h-2 bg-[#2fb574] rounded-full opacity-30 animate-particle-3"></div>
        <div className="absolute top-[35%] right-[8%] w-1 h-1 bg-[#0077be] rounded-full opacity-60 animate-particle-4"></div>
        <div className="absolute top-[45%] left-[8%] w-1.5 h-1.5 bg-[#22c9a8] rounded-full opacity-40 animate-particle-5"></div>
        <div className="absolute top-[55%] right-[28%] w-2 h-2 bg-[#2fb574] rounded-full opacity-50 animate-particle-6"></div>
        <div className="absolute top-[65%] left-[35%] w-1 h-1 bg-[#0077be] rounded-full opacity-40 animate-particle-1"></div>
        <div className="absolute top-[75%] right-[15%] w-1.5 h-1.5 bg-[#22c9a8] rounded-full opacity-50 animate-particle-3"></div>
        <div className="absolute top-[18%] left-[45%] w-1 h-1 bg-[#2fb574] rounded-full opacity-60 animate-particle-5"></div>
        <div className="absolute top-[38%] right-[42%] w-2 h-2 bg-[#0077be] rounded-full opacity-30 animate-particle-2"></div>
        <div className="absolute top-[58%] left-[22%] w-1.5 h-1.5 bg-[#22c9a8] rounded-full opacity-50 animate-particle-4"></div>
        <div className="absolute top-[68%] right-[35%] w-1 h-1 bg-[#2fb574] rounded-full opacity-40 animate-particle-6"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[12%] left-[8%] animate-float-icon-1">
          <BookOpen className="text-[#0077be] opacity-40" size={18} />
        </div>
        <div className="absolute top-[28%] right-[15%] animate-float-icon-2">
          <Sparkles className="text-[#22c9a8] opacity-35" size={20} />
        </div>
        <div className="absolute top-[48%] left-[18%] animate-float-icon-3">
          <Target className="text-[#2fb574] opacity-40" size={22} />
        </div>
        <div className="absolute top-[68%] right-[12%] animate-float-icon-1">
          <BookOpen className="text-[#0077be] opacity-35" size={19} />
        </div>
        <div className="absolute top-[22%] right-[35%] animate-float-icon-2">
          <Sparkles className="text-[#22c9a8] opacity-40" size={17} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="animate-fade-in-up">
          <div className="inline-block mb-4 animate-bounce-slow">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0077be]/10 to-[#22c9a8]/10 rounded-full border border-[#22c9a8]/30">
              <Sparkles className="text-[#22c9a8]" size={18} />
              <span className="text-sm font-semibold text-[#0077be]">AI-Powered Marketing</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-[#1a2332] animate-fade-in-up animation-delay-200">
            Focus on Your Next Chapter.
            <br />
            <span className="bg-gradient-to-r from-[#0077be] to-[#22c9a8] bg-clip-text text-transparent animate-gradient">
              We'll Handle the Marketing.
            </span>
          </h1>
        </div>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-gray-600 leading-relaxed animate-fade-in-up animation-delay-400 px-4">
          Our AI builds and manages a complete Meta ad campaign for your book in minutes.
          Go from writer to bestselling author, without the marketing guesswork.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 md:mb-12 animate-fade-in-up animation-delay-600 px-4">
          <button
            onClick={onGetStarted}
            className="btn-primary group relative overflow-hidden"
          >
            <span className="relative z-10">Create Your Marketing Plan</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#22c9a8] to-[#0077be] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <button
            onClick={onTryDemo}
            className="text-[#0077be] px-6 sm:px-8 py-3 sm:py-4 font-semibold hover:underline transition-all hover:scale-105"
          >
            Or try the demo
          </button>
        </div>

        <div className="max-w-2xl mx-auto animate-fade-in-up animation-delay-800 px-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0077be] to-[#22c9a8] rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
            <div className="relative">
              <textarea
                placeholder={typedText}
                className="input-field resize-none h-32 pr-12 transition-all duration-300 focus:scale-[1.02]"
                rows={4}
              />
              <button className="absolute bottom-4 right-4 text-[#22c9a8] hover:text-[#0077be] transition-all hover:scale-110 hover:rotate-12">
                <Send size={24} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-2 animate-fade-in animation-delay-1000">
              <div className="w-2 h-2 rounded-full bg-[#2fb574] animate-pulse"></div>
              <span>AI Ready</span>
            </div>
            <div className="flex items-center gap-2 animate-fade-in animation-delay-1200">
              <div className="w-2 h-2 rounded-full bg-[#0077be] animate-pulse"></div>
              <span>5min Setup</span>
            </div>
            <div className="flex items-center gap-2 animate-fade-in animation-delay-1400">
              <div className="w-2 h-2 rounded-full bg-[#22c9a8] animate-pulse"></div>
              <span>Free Trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
