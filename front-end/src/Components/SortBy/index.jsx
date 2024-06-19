import { useState } from 'react';
import SortByOptions from './SortByOptions';
import { BarsArrowUpIcon } from '@heroicons/react/20/solid';

const SortBy = ({sortBy, order, setSortBy, setSelectedOrder}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const orderFilters = ["rating", "price", "discount"]
  
  const handleSortBy = (option) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Sort By</h2>
      <div className="mb-8">
        <div className="flex flex-grid grid-cols-2 justify-between">
          <button
            className="w-4/5 text-left py-2 px-4 border border-gray-300 rounded-lg bg-white"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Sort by {sortBy || ""}
          </button>
          <button
            className="w-1/6 text-left py-2 px-2 border border-gray-300 rounded-lg"
            onClick={() => setSelectedOrder(order === "asc"? "desc" : "asc")}>
            {order === "asc" ? (
              <BarsArrowUpIcon className="h-full w-full transition-transform" />
            ) : (
              <BarsArrowUpIcon className="h-full w-full transform rotate-180 transition-transform" />
            )}
          </button>
        </div>
        {isDropdownOpen && (
          <div className="mt-2">
            <SortByOptions
              selectedOption={sortBy}
              onSelectOption={handleSortBy}
              options={orderFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SortBy;