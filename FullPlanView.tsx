import { Check, Download, ArrowLeft } from 'lucide-react';

interface FullPlanViewProps {
  onApprove: () => void;
  onBack: () => void;
  bookTitle?: string;
}

export default function FullPlanView({ onApprove, onBack, bookTitle = 'Your Book' }: FullPlanViewProps) {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-[#2D2D2D]">Marketing Plan for {bookTitle}</h1>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download size={20} />
              Download PDF
            </button>
            <button onClick={onApprove} className="btn-primary flex items-center gap-2">
              <Check size={20} />
              Approve Plan
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-10">
          <section>
            <h2 className="text-3xl font-bold mb-4 text-[#2D2D2D]">Executive Summary</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              This comprehensive marketing plan outlines a strategic approach to promote your book
              through targeted Meta advertising campaigns. Our AI-driven analysis has identified key
              opportunities to reach your ideal readers and maximize your return on investment.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#2D2D2D]">Target Audience Analysis</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#2D2D2D]">Primary Audience Demographics</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="text-[#28a745] flex-shrink-0 mt-1" size={20} />
                      <div>
                        <span className="font-semibold">Age Range:</span> 25-45 years old
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#28a745] flex-shrink-0 mt-1" size={20} />
                      <div>
                        <span className="font-semibold">Gender Distribution:</span> 65% Female, 35% Male
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#28a745] flex-shrink-0 mt-1" size={20} />
                      <div>
                        <span className="font-semibold">Primary Interests:</span> Contemporary fiction, book clubs, reading communities, character-driven stories
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="text-[#28a745] flex-shrink-0 mt-1" size={20} />
                      <div>
                        <span className="font-semibold">Online Behavior:</span> Active on Facebook and Instagram, frequent Amazon shoppers, engage with book-related content
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3 text-[#2D2D2D]">Psychographic Profile</h3>
                <p className="text-gray-700 leading-relaxed">
                  Your ideal readers are passionate about storytelling and emotional connections. They value
                  authenticity, character development, and narratives that resonate with their personal experiences.
                  They actively seek book recommendations from trusted sources and are influenced by reader reviews
                  and social proof.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#2D2D2D]">Ad Creative Strategy</h2>

            <p className="text-gray-700 mb-6 leading-relaxed">
              We've developed 5 high-converting ad concepts designed to capture attention and drive conversions:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Concept 1: Emotional Hook",
                  description: "Focuses on the transformative journey of your main character. Uses evocative imagery and compelling copy that speaks to the emotional core of your story.",
                  headline: "\"What would you risk for a second chance?\"",
                  cta: "Discover the story that's captivating readers worldwide"
                },
                {
                  title: "Concept 2: Social Proof",
                  description: "Highlights reader reviews and ratings. Features authentic testimonials and star ratings to build trust and credibility.",
                  headline: "\"Readers are calling it 'unputdownable'\"",
                  cta: "Join thousands of satisfied readers"
                },
                {
                  title: "Concept 3: Limited Time Offer",
                  description: "Creates urgency with a special promotion or launch price. Encourages immediate action.",
                  headline: "\"Special launch price - This week only\"",
                  cta: "Grab your copy before the price goes up"
                },
                {
                  title: "Concept 4: Author Story",
                  description: "Connects readers with your personal journey as an author. Humanizes the book and creates a deeper connection.",
                  headline: "\"5 years in the making...\"",
                  cta: "Read the story behind the story"
                },
                {
                  title: "Concept 5: Problem-Solution",
                  description: "Addresses the reader's desire for escapism or specific emotional needs. Positions your book as the solution.",
                  headline: "\"Looking for your next great read?\"",
                  cta: "Start reading today"
                }
              ].map((concept, index) => (
                <div key={index} className="card">
                  <h3 className="text-lg font-bold mb-2 text-[#3A4D8F]">{concept.title}</h3>
                  <p className="text-gray-700 mb-3">{concept.description}</p>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <p className="text-sm"><span className="font-semibold">Headline:</span> {concept.headline}</p>
                    <p className="text-sm"><span className="font-semibold">CTA:</span> {concept.cta}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#2D2D2D]">30-Day Content Calendar</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Week</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Focus</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Content Types</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Week 1</td>
                    <td className="border border-gray-300 px-4 py-3">Launch & Awareness</td>
                    <td className="border border-gray-300 px-4 py-3">Book reveal, author introduction, behind-the-scenes content</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Week 2</td>
                    <td className="border border-gray-300 px-4 py-3">Engagement & Social Proof</td>
                    <td className="border border-gray-300 px-4 py-3">Reader testimonials, Q&A sessions, character spotlights</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Week 3</td>
                    <td className="border border-gray-300 px-4 py-3">Conversion Push</td>
                    <td className="border border-gray-300 px-4 py-3">Special offers, urgency messaging, comparison content</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Week 4</td>
                    <td className="border border-gray-300 px-4 py-3">Sustained Growth</td>
                    <td className="border border-gray-300 px-4 py-3">User-generated content, community building, retargeting</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#2D2D2D]">Budget Allocation & ROI Projections</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="card bg-gradient-to-br from-[#3A4D8F] to-[#2D2D2D] text-white">
                <h3 className="text-xl font-semibold mb-3">Recommended Monthly Budget</h3>
                <p className="text-4xl font-bold mb-2">$300</p>
                <p className="text-sm opacity-90">Optimized for maximum reach and conversions</p>
              </div>

              <div className="card bg-gradient-to-br from-[#28a745] to-[#1e7e34] text-white">
                <h3 className="text-xl font-semibold mb-3">Projected Monthly ROI</h3>
                <p className="text-4xl font-bold mb-2">250%</p>
                <p className="text-sm opacity-90">Based on similar campaigns in your genre</p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4 text-[#2D2D2D]">Budget Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Awareness Campaigns</span>
                  <span className="text-[#3A4D8F] font-bold">$120 (40%)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Conversion Campaigns</span>
                  <span className="text-[#3A4D8F] font-bold">$120 (40%)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Retargeting</span>
                  <span className="text-[#3A4D8F] font-bold">$60 (20%)</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#2D2D2D]">Performance Metrics & KPIs</h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="card text-center">
                <p className="text-gray-600 mb-2">Target Reach</p>
                <p className="text-3xl font-bold text-[#3A4D8F]">50K+</p>
                <p className="text-sm text-gray-600">Potential readers</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 mb-2">Expected CTR</p>
                <p className="text-3xl font-bold text-[#3A4D8F]">2.5%</p>
                <p className="text-sm text-gray-600">Industry average: 1.8%</p>
              </div>
              <div className="card text-center">
                <p className="text-gray-600 mb-2">Conversion Rate</p>
                <p className="text-3xl font-bold text-[#3A4D8F]">3.2%</p>
                <p className="text-sm text-gray-600">Above genre benchmark</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6 text-[#2D2D2D]">Implementation Guide</h2>

            <div className="space-y-4">
              {[
                "Set up your Meta Business Manager account (detailed tutorial included)",
                "Create your Facebook Page and Instagram Business Profile",
                "Install Meta Pixel on your author website or book landing page",
                "Upload provided ad creatives and copy to Ads Manager",
                "Configure audience targeting based on our recommendations",
                "Set daily budget limits and campaign schedules",
                "Monitor performance using our custom dashboard template"
              ].map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#3A4D8F] text-white flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-1">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t pt-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-[#2D2D2D]">Ready to Launch Your Campaign?</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Approve this plan to move forward with your book's marketing success story.
              </p>
              <button onClick={onApprove} className="btn-primary text-lg flex items-center gap-2 mx-auto">
                <Check size={24} />
                Approve Plan & Continue
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
