import PropTypes from 'prop-types';

const SortByOptions = ({ selectedOption, onSelectOption, options }) => {
  return (
    <div className="mb-4">
      <div className="items-center border border-gray-300 rounded-lg bg-white">
        {options?.map((option) => (
          <button
            className={`${selectedOption === option?"bg-slate-100":""} w-full text-left py-2 px-4 hover:bg-slate-200`}
            onClick={() => onSelectOption(selectedOption === option?null:option)}
          >
            Sort by {option}
          </button>
        ))}
      </div>
    </div>
  );
};

SortByOptions.propTypes = {
  onSelectOption: PropTypes.func.isRequired,
};

export default SortByOptions;
