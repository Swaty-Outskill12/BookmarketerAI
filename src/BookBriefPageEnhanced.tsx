import { useState, useEffect } from 'react';
import { ArrowLeft, Save, RefreshCw, AlertCircle } from 'lucide-react';
import MultiSelect from './components/MultiSelect';
import { useAuth } from './AuthContext';
import { fetchBookInfo, saveBookBrief, getBookBrief, BookInfo } from './lib/bookApi';

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

const DEFAULT_AUTHOR_ID = 'bf00646e-1204-4b1a-9886-b7b895b1554a';

export default function BookBriefPageEnhanced({ onBack, onSave }: BookBriefPageEnhancedProps) {
  const { user } = useAuth();
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
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    loadExistingBookBrief();
  }, [user]);

  const loadExistingBookBrief = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const existingBrief = await getBookBrief(user.id);

      if (existingBrief) {
        setFormData({
          bookTitle: existingBrief.book_title || '',
          authorName: existingBrief.author_name || '',
          bookType: existingBrief.book_type || '',
          formats: existingBrief.format || [],
          genre: existingBrief.genre || '',
          marketingBudget: existingBrief.marketing_budget?.toString() || '',
          bookPrice: existingBrief.book_price?.toString() || '',
          bookCost: existingBrief.book_cost?.toString() || '',
          painPoints: existingBrief.pain_points || [],
          targetAudience: existingBrief.target_audience || [],
          geography: existingBrief.geography || [],
          competitors: existingBrief.competitors || [],
          uniqueOfferings: existingBrief.unique_offerings || [],
          brandVoice: existingBrief.brand_voice || ''
        });
        setIsDataFetched(true);
      } else {
        await fetchAndPopulateBookInfo();
      }
    } catch (err) {
      console.error('Error loading book brief:', err);
      await fetchAndPopulateBookInfo();
    } finally {
      setLoading(false);
    }
  };

  const fetchAndPopulateBookInfo = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const bookInfo = await fetchBookInfo(DEFAULT_AUTHOR_ID);

      if (bookInfo) {
        setFormData({
          bookTitle: bookInfo.bookTitle || '',
          authorName: bookInfo.authorName || '',
          bookType: bookInfo.bookType || '',
          formats: bookInfo.formats || [],
          genre: bookInfo.genre || '',
          marketingBudget: bookInfo.marketingBudget || '',
          bookPrice: bookInfo.bookPrice || '',
          bookCost: bookInfo.bookCost || '',
          painPoints: bookInfo.painPoints || [],
          targetAudience: bookInfo.targetAudience || [],
          geography: bookInfo.geography || [],
          competitors: bookInfo.competitors || [],
          uniqueOfferings: bookInfo.uniqueOfferings || [],
          brandVoice: bookInfo.brandVoice || ''
        });
        setIsDataFetched(true);
      }
    } catch (err) {
      setError('Failed to fetch book information. You can still fill in the form manually.');
      console.error('Error fetching book info:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (confirm('This will replace all current data with fresh data from the server. Continue?')) {
      fetchAndPopulateBookInfo();
    }
  };

  const handleSave = async () => {
    if (!user) {
      setError('You must be logged in to save a book brief.');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      await saveBookBrief(user.id, DEFAULT_AUTHOR_ID, formData);

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      onSave?.(formData);
    } catch (err) {
      setError('Failed to save book brief. Please try again.');
      console.error('Error saving book brief:', err);
    } finally {
      setSaving(false);
    }
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
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
              Refresh Data
            </button>
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="flex items-center gap-2 bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 hover:brightness-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Book Brief'}
            </button>
          </div>
        </div>

        {loading && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <RefreshCw size={20} className="text-blue-600 animate-spin" />
            <p className="text-blue-800">Loading book information...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
              <Save size={14} className="text-white" />
            </div>
            <p className="text-green-800 font-medium">Book brief saved successfully!</p>
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Brief</h1>
          {isDataFetched && !loading && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Data auto-populated
            </span>
          )}
        </div>

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
