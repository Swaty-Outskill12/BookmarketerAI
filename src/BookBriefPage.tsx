import { ArrowLeft } from 'lucide-react';

interface BookBriefPageProps {
  onBack: () => void;
}

export default function BookBriefPage({ onBack }: BookBriefPageProps) {
  return (
    <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-3xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0077be] hover:text-[#22c9a8] font-medium mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Book Brief
          </button>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Book Title</h3>
              <p className="text-gray-600">BOOK TITLE</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Author Name</h3>
              <p className="text-gray-600">AUTHOR</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Format of the book</h3>
              <p className="text-gray-600">PDF</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Genre</h3>
              <p className="text-gray-600">SELF HELP</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Marketing Budget for the month</h3>
              <p className="text-gray-600">$200</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Book Price</h3>
              <p className="text-gray-600">$15</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Book Cost</h3>
              <p className="text-gray-600">$6</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Pain Points of Customers You are solving</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                <li>PAIN POINT1</li>
                <li>PAIN POINT2</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Target Audience</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                <li>YOUNG ADULTS - 20-35 yrs - MALE</li>
                <li>ENTREPRENEURS</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Geography</h3>
              <p className="text-gray-600">INDIA</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Competitors</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                <li>COMPETITORS1</li>
                <li>COMPETITORS2</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-2">Unique Offering</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2">
                <li>Offering1</li>
                <li>Offering2</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Brand Voice</h3>
              <p className="text-gray-600">Friendly</p>
            </div>
          </div>
        </div>
      </div>
  );
}
