import { useState } from 'react';
import SelectColor from '../SelectColor';
import SelectSize from '../SelectSize';

const FilterBy = ({ colors, sizes, selectedColor, setSelectedColor, selectedSize, setSelectedSize }) => {
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  return (
    <div className="rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Filters</h2>
      
      <div className="mb-4 mt-4">
        <button 
          className="w-full text-left py-2 px-4 border border-gray-200 rounded-lg bg-white"
          onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
        >
          Filter by Color
        </button>
        {isColorDropdownOpen && (
          <div className="mt-2">
            <SelectColor colors={colors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
          </div>
        )}
      </div>

      <div className="mb-4">
        <button 
          className="w-full text-left py-2 px-4 border border-gray-200 rounded-lg bg-white"
          onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
        >
          Filter by Size
        </button>
        {isSizeDropdownOpen && (
          <div className="mt-4">
            <SelectSize sizes={sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBy;
