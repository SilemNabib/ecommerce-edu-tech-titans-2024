/**
 * Pagination component for navigating through pages.
 *
 * @component
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {function} onPageChange - The function to be called when a page is clicked.
 * @returns {JSX.Element} The Pagination component.
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map(num => num + 1);

  return (
    <div className="flex justify-center items-center space-x-2">
      {currentPage > 1 && (
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
      )}
      {pages.map(page => (
        <button
          key={page}
          className={`px-3 py-1 ${page === currentPage ? 'bg-gray-400' : 'bg-gray-200'} rounded hover:bg-gray-300`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
