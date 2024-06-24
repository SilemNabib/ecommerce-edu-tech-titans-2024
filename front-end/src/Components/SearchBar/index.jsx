import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiConfig } from '../../config/ApiConfig';

const SearchBar = ({ className, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const debouncedSearch = useCallback((value) => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (value.length > 2) {
        try {
          const response = await fetch(`${ApiConfig.products}?name=${value}`);
          const data = await response.json();
          setSearchResults(data._embedded ? data._embedded.productList : []);
          setShowResults(true);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // 300ms delay
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const executeSearch = () => {
    if (searchTerm) {
      setShowResults(false);
      navigate(`/search?name=${searchTerm}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) { 
      executeSearch();
    }
  };

  const handleResultClick = (productName) => {
    setShowResults(false);
    navigate(`/search?name=${productName}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (onSearch) {
      onSearch(executeSearch);
    }
  }, [onSearch, searchTerm]);

  return (
    <div className={`flex items-center ${className}`} ref={searchRef}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none lg:hidden">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="block w-full border rounded-lg border-gray-300 pl-10 pr-3 py-2 leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm lg:pl-3 lg:rounded-none lg:border-0"
        />
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full bg-white shadow-lg rounded-lg mt-1">
            <ul>
              {searchResults.map((product) => (
                <li key={product.id} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleResultClick(product.name)}>
                  {product.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;