import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import MultiSelect from './components/MultiSelect';

interface BookBriefPageEnhancedProps {
  onBack: () => void;
  onSave?: (data: BookBriefData) => void;
}

interface BookBriefData {
  bookTitle: string;
  authorName: string;
  bookType: string;
  formats: string[];
  genre: string;
  marketingBudget: string;
  bookPrice: string;
  bookCost: string;
  painPoints: string[];
  targetAudience: string[];
  geography: string[];
  competitors: string[];
  uniqueOfferings: string[];
  brandVoice: string;
}

const BOOK_TYPES = ['Fiction', 'Non-Fiction', 'Self-Help', 'Business', 'Biography', 'Memoir', 'Poetry', 'Anthology'];

const FORMATS = ['Paperback', 'Hardcover', 'eBook (Kindle)', 'eBook (ePub)', 'Audiobook', 'PDF'];

const GENRES = [
  'Literary Fiction', 'Mystery/Thriller', 'Romance', 'Science Fiction', 'Fantasy',
  'Horror', 'Historical Fiction', 'Self-Help', 'Business & Money', 'Health & Fitness',
  'Biography & Autobiography', 'History', 'Science & Technology', 'Cookbooks',
  'Travel', 'Parenting', 'Religion & Spirituality', 'True Crime', 'Young Adult'
];

const REGIONS = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'India',
  'Germany', 'France', 'Spain', 'Italy', 'Brazil', 'Mexico',
  'Japan', 'South Korea', 'China', 'Southeast Asia', 'Middle East',
  'Africa', 'Scandinavia', 'Eastern Europe', 'Latin America'
];

const TARGET_AUDIENCES = [
  'Young Adults (18-25)', 'Adults (26-35)', 'Middle-Aged Adults (36-50)',
  'Seniors (50+)', 'College Students', 'Working Professionals',
  'Entrepreneurs', 'Parents', 'Teachers & Educators', 'Retirees',
  'Women', 'Men', 'Tech Enthusiasts', 'Book Club Members', 'Fiction Readers'
];

const BRAND_VOICES = [
  'Professional', 'Casual & Friendly', 'Authoritative', 'Inspirational',
  'Humorous', 'Empathetic', 'Educational', 'Conversational', 'Sophisticated'
];

export default function BookBriefPageEnhanced({ onBack, onSave }: BookBriefPageEnhancedProps) {
  const [formData, setFormData] = useState<BookBriefData>({
    bookTitle: '',
    authorName: '',
    bookType: '',
    formats: [],
    genre: '',
    marketingBudget: '',
    bookPrice: '',
    bookCost: '',
    painPoints: [],
    targetAudience: [],
    geography: [],
    competitors: [],
    uniqueOfferings: [],
    brandVoice: ''
  });

  const handleSave = () => {
    onSave?.(formData);
  };

  return (
    <div className="flex-1 bg-white p-6 sm:p-8 lg:p-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#0077be] hover:text-[#22c9a8] font-medium transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-lg"
          >
            <Save size={18} />
            Save Book Brief
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Brief</h1>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Book Title
            </label>
            <input
              type="text"
              value={formData.bookTitle}
              onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
              placeholder="Enter your book title"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Author Name
            </label>
            <input
              type="text"
              value={formData.authorName}
              onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              placeholder="Enter author name"
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Type of Book
            </label>
            <select
              value={formData.bookType}
              onChange={(e) => setFormData({ ...formData, bookType: e.target.value })}
              className="input-field"
            >
              <option value="">Select book type...</option>
              {BOOK_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <MultiSelect
            label="Format of the Book"
            options={FORMATS}
            selectedValues={formData.formats}
            onChange={(values) => setFormData({ ...formData, formats: values })}
            maxSelections={3}
            placeholder="Select up to 3 formats"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Genre
            </label>
            <select
              value={formData.genre}
              onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
              className="input-field"
            >
              <option value="">Select genre...</option>
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Marketing Budget (Monthly)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.marketingBudget}
                  onChange={(e) => setFormData({ ...formData, marketingBudget: e.target.value })}
                  placeholder="200"
                  className="input-field pl-8"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Book Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.bookPrice}
                  onChange={(e) => setFormData({ ...formData, bookPrice: e.target.value })}
                  placeholder="15"
                  className="input-field pl-8"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Book Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.bookCost}
                  onChange={(e) => setFormData({ ...formData, bookCost: e.target.value })}
                  placeholder="6"
                  className="input-field pl-8"
                />
              </div>
            </div>
          </div>

          <MultiSelect
            label="Pain Points of Customers You are Solving"
            options={[]}
            selectedValues={formData.painPoints}
            onChange={(values) => setFormData({ ...formData, painPoints: values })}
            maxSelections={5}
            placeholder="Type and press Enter to add pain points"
          />

          <MultiSelect
            label="Target Audience"
            options={TARGET_AUDIENCES}
            selectedValues={formData.targetAudience}
            onChange={(values) => setFormData({ ...formData, targetAudience: values })}
            maxSelections={5}
            placeholder="Select up to 5 target audiences"
          />

          <MultiSelect
            label="Geography / Regions"
            options={REGIONS}
            selectedValues={formData.geography}
            onChange={(values) => setFormData({ ...formData, geography: values })}
            maxSelections={3}
            placeholder="Select up to 3 regions"
          />

          <MultiSelect
            label="Competitors"
            options={[]}
            selectedValues={formData.competitors}
            onChange={(values) => setFormData({ ...formData, competitors: values })}
            maxSelections={3}
            placeholder="Type and press Enter to add competitors"
          />

          <MultiSelect
            label="Unique Offerings"
            options={[]}
            selectedValues={formData.uniqueOfferings}
            onChange={(values) => setFormData({ ...formData, uniqueOfferings: values })}
            maxSelections={5}
            placeholder="Type and press Enter to add unique offerings"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Brand Voice
            </label>
            <select
              value={formData.brandVoice}
              onChange={(e) => setFormData({ ...formData, brandVoice: e.target.value })}
              className="input-field"
            >
              <option value="">Select brand voice...</option>
              {BRAND_VOICES.map(voice => (
                <option key={voice} value={voice}>{voice}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onBack}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-lg"
          >
            <Save size={20} />
            Save Book Brief
          </button>
        </div>
      </div>
    </div>
  );
}
