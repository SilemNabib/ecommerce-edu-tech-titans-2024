import PropTypes from 'prop-types';

const SortByPrice = ({ selectedOption, onSelectOption }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="lowestToHighest"
          checked={selectedOption === 'lowestToHighest'}
          onChange={() => onSelectOption('lowestToHighest')}
          className="mr-2"
        />
        <label htmlFor="lowestToHighest">Lowest to Highest</label>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="highestToLowest"
          checked={selectedOption === 'highestToLowest'}
          onChange={() => onSelectOption('highestToLowest')}
          className="mr-2"
        />
        <label htmlFor="highestToLowest">Highest to Lowest</label>
      </div>
    </div>
  );
};

SortByPrice.propTypes = {
  selectedOption: PropTypes.string.isRequired,
  onSelectOption: PropTypes.func.isRequired,
};

export default SortByPrice;
