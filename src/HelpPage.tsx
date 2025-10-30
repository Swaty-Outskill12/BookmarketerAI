import { ArrowLeft, Image as ImageIcon, Video, FileText, Clock, Target } from 'lucide-react';

interface HelpPageProps {
  onBack: () => void;
}

export default function HelpPage({ onBack }: HelpPageProps) {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#0077be] hover:text-[#22c9a8] font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Organic Post Plan
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-[#1a2332] mb-4">
            How to Post Organic Content on Facebook
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            This guide will help you effectively post your organic content to maximize engagement and reach your target audience.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0077be] to-[#22c9a8] rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Access Your Facebook Business Page</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Log into Facebook and navigate to your Business Page (not your personal profile). Make sure you're posting from the correct page that represents your book or author brand.
                </p>
                <div className="bg-blue-50 border-l-4 border-[#0077be] p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Pro Tip:</strong> You can switch between your personal profile and business page using the switcher in the top right corner of Facebook.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0077be] to-[#22c9a8] rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Create Your Post</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Click on the "What's on your mind?" box at the top of your page to start creating a new post.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <ImageIcon className="text-[#0077be]" size={24} />
                    <div>
                      <p className="font-semibold text-sm">Photo/Image</p>
                      <p className="text-xs text-gray-600">Best for visual content</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <Video className="text-[#0077be]" size={24} />
                    <div>
                      <p className="font-semibold text-sm">Video</p>
                      <p className="text-xs text-gray-600">High engagement</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <FileText className="text-[#0077be]" size={24} />
                    <div>
                      <p className="font-semibold text-sm">Text Only</p>
                      <p className="text-xs text-gray-600">Quick updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0077be] to-[#22c9a8] rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Add Your Content</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Copy the post content from your Organic Post Plan and paste it into the text box. Then add your media:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2">
                  <li>Click the "Photo/Video" button below the text box</li>
                  <li>Upload the generated image or your own media file</li>
                  <li>Wait for the upload to complete</li>
                  <li>Preview how your post will look to your audience</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0077be] to-[#22c9a8] rounded-full flex items-center justify-center text-white font-bold text-xl">
                4
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Optimize Your Post</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Before publishing, optimize your post for better reach:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#22c9a8] rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-800">Add relevant hashtags</p>
                      <p className="text-sm text-gray-600">Use 3-5 hashtags related to your book genre and audience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#22c9a8] rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-800">Tag relevant pages or people</p>
                      <p className="text-sm text-gray-600">If applicable, tag collaborators or related pages</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#22c9a8] rounded-full mt-2"></div>
                    <div>
                      <p className="font-semibold text-gray-800">Add a location</p>
                      <p className="text-sm text-gray-600">If your book has a geographic focus, add that location</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#0077be] to-[#22c9a8] rounded-full flex items-center justify-center text-white font-bold text-xl">
                5
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Schedule or Publish</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  You have two options for posting:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-[#22c9a8] rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2">Post Now</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Click the blue "Post" button to publish immediately to your audience.
                    </p>
                    <button className="w-full bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white py-2 rounded-lg font-semibold">
                      Post Now
                    </button>
                  </div>
                  <div className="border-2 border-gray-300 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                      <Clock size={18} />
                      Schedule Post
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Use the suggested posting date from your plan. Click the dropdown arrow next to "Post" and select "Schedule".
                    </p>
                    <button className="w-full border-2 border-[#0077be] text-[#0077be] hover:bg-[#0077be] hover:text-white py-2 rounded-lg font-semibold transition-colors">
                      Schedule Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#0077be] to-[#22c9a8] rounded-xl shadow-md p-6 text-white">
            <div className="flex items-start gap-4">
              <Target className="flex-shrink-0" size={32} />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3">Best Practices for Organic Posts</h2>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <h3 className="font-bold mb-2">Optimal Posting Times</h3>
                    <ul className="text-sm space-y-1 opacity-90">
                      <li>• Weekdays: 1-3 PM (when people take breaks)</li>
                      <li>• Weekends: 12-1 PM (weekend leisure time)</li>
                      <li>• Avoid early mornings and late nights</li>
                    </ul>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                    <h3 className="font-bold mb-2">Engagement Tips</h3>
                    <ul className="text-sm space-y-1 opacity-90">
                      <li>• Ask questions to encourage comments</li>
                      <li>• Respond to comments within 1 hour</li>
                      <li>• Share behind-the-scenes content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">After Posting</h2>
            <p className="text-gray-700 mb-4">
              Once you've published your post, don't forget to:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-2">
              <li>Return to the Organic Post Plan page</li>
              <li>Click the "I have posted this" button for the post you just published</li>
              <li>Monitor engagement (likes, comments, shares) over the next 24-48 hours</li>
              <li>Respond to comments to boost engagement</li>
            </ol>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:brightness-110 hover:shadow-lg"
          >
            Back to Organic Post Plan
          </button>
        </div>
      </div>
    </div>
  );
}
