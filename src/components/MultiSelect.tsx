import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface MultiSelectProps {
  label: string;
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  maxSelections?: number;
  placeholder?: string;
}

export default function MultiSelect({
  label,
  options,
  selectedValues,
  onChange,
  maxSelections = 5,
  placeholder = 'Select options...'
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(v => v !== option));
    } else if (selectedValues.length < maxSelections) {
      onChange([...selectedValues, option]);
    }
  };

  const handleRemove = (option: string) => {
    onChange(selectedValues.filter(v => v !== option));
  };

  const canAddMore = selectedValues.length < maxSelections;

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        <span className="text-xs font-normal text-gray-500 ml-2">
          (Select up to {maxSelections})
        </span>
      </label>

      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="min-h-[44px] px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:border-[#22c9a8] transition-colors bg-white"
        >
          {selectedValues.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedValues.map(value => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1 bg-gradient-to-r from-[#0077be] to-[#22c9a8] text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {value}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(value);
                    }}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <ChevronDown
            size={20}
            className={`absolute right-3 top-3 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#22c9a8] focus:border-transparent text-sm"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <div className="overflow-y-auto max-h-48">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  No options found
                </div>
              ) : (
                filteredOptions.map(option => {
                  const isSelected = selectedValues.includes(option);
                  const isDisabled = !isSelected && !canAddMore;

                  return (
                    <div
                      key={option}
                      onClick={() => !isDisabled && handleSelect(option)}
                      className={`px-4 py-2 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#0077be]/10 to-[#22c9a8]/10 text-[#0077be] font-medium'
                          : isDisabled
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{option}</span>
                        {isSelected && (
                          <span className="text-[#22c9a8]">✓</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            {!canAddMore && (
              <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-800">
                Maximum {maxSelections} selections reached. Remove one to add another.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
