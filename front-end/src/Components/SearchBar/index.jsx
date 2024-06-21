import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

/**
 * SearchBar component for searching items in the database.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - The CSS class name for the component.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Aquí implementar la lógica para manejar las peticiones de búsqueda a la base de datos
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none lg:hidden">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
          className="block w-full border rounded-lg border-gray-300 pl-10 pr-3 py-2 leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm lg:pl-3 lg:rounded-none lg:border-0"
        />
      </div>
    </div>
  );
};

export default SearchBar;