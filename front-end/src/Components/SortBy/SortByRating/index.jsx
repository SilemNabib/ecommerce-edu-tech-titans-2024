import PropTypes from 'prop-types';

/**
 * SortByRating component displays a list of checkboxes for selecting ratings.
 *
 * @param {Object} props - The component props.
 * @param {string} props.selectedOption - The currently selected rating option.
 * @param {Function} props.onSelectOption - The function to call when a rating option is selected.
 * @returns {JSX.Element} The rendered SortByRating component.
 */
const SortByRating = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="mb-4">
      {[1, 2, 3, 4, 5].map(rating => (
        <div key={rating} className="flex items-center">
          <input
            type="checkbox"
            id={`rating${rating}`}
            checked={selectedOption === `rating${rating}`}
            onChange={() => onSelectOption(`rating${rating}`)}
            className="mr-2"
          />
          <label htmlFor={`rating${rating}`}>{`Rating ${rating}`}</label>
        </div>
      ))}
    </div>
  );
};

SortByRating.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  onSelectOption: PropTypes.func.isRequired,
};

export default SortByRating;
