import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Do I need any marketing experience to use this?",
      answer: "Not at all! Our AI handles all the complex strategy work. You just answer a few simple questions about your book, and we take care of the rest. The plan comes with a step-by-step implementation guide written in plain English."
    },
    {
      question: "How much should I budget for the ads themselves?",
      answer: "We recommend starting with at least $300/month for your ad spend (separate from the subscription cost). Our AI will optimize your budget to maximize ROI, and you can adjust your spend based on performance."
    },
    {
      question: "Can I use this for multiple books?",
      answer: "Each subscription covers one book's marketing plan. If you have multiple books, you can purchase additional plans at a discounted rate."
    },
    {
      question: "What if I'm not happy with the plan?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied with your marketing plan, just let us know and we'll refund your purchase—no questions asked."
    },
    {
      question: "How is this different from hiring a marketing agency?",
      answer: "Traditional marketing agencies can cost thousands of dollars per month and require long-term contracts. Our AI provides the same strategic value at a fraction of the cost, with no long-term commitment. Plus, you get your plan in minutes, not weeks."
    },
    {
      question: "Will the AI actually run my ads for me?",
      answer: "The AI creates your complete campaign strategy, including ad creatives, targeting, and scheduling. You'll implement the plan through your own Meta Ads account (we provide step-by-step instructions). Our AI then monitors and provides optimization recommendations to improve performance over time."
    }
  ];

  return (
    <section className="section-container bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-[#2D2D2D]">
          Your Questions, Answered.
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-sm sm:text-base md:text-lg text-[#2D2D2D] pr-2 sm:pr-4">{faq.question}</span>
                <ChevronDown
                  className={`flex-shrink-0 text-[#3A4D8F] transition-transform duration-200 w-5 h-5 sm:w-6 sm:h-6 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
