import { useState } from 'react';
import SortByPrice from '../SortByPrice';
import SortByRating from '../SortByRating';

const SortBy = () => {
  const [sortByOption, setSortByOption] = useState('');
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isRatingDropdownOpen, setIsRatingDropdownOpen] = useState(false);

  const handleSortByPrice = (option) => {
    setSortByOption(option);
  };

  const handleSortByRating = (option) => {
    setSortByOption(option);
  };

  return (
    <div className="rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Sort By</h2>
      
      <div className="mb-8">
        <button 
          className="w-full text-left py-2 px-4 border border-gray-300 rounded-lg bg-white"
          onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
        >
          Sort by Price
        </button>
        {isPriceDropdownOpen && (
          <div className="mt-2">
            <SortByPrice selectedOption={sortByOption} onSelectOption={handleSortByPrice} />
          </div>
        )}
      </div>

      <div className="mb-4">
        <button 
          className="w-full text-left py-2 px-4 border border-gray-300 rounded-lg bg-white"
          onClick={() => setIsRatingDropdownOpen(!isRatingDropdownOpen)}
        >
          Sort by Rating
        </button>
        {isRatingDropdownOpen && (
          <div className="mt-2">
            <SortByRating selectedOption={sortByOption} onSelectOption={handleSortByRating} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SortBy;