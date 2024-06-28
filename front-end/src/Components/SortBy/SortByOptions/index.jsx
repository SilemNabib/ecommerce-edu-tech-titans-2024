import PropTypes from 'prop-types';

/**
 * Renders a component that displays a list of sort options.
 *
 * @param {Object} props - The component props.
 * @param {string} props.selectedOption - The currently selected sort option.
 * @param {Function} props.onSelectOption - The function to call when a sort option is selected.
 * @param {string[]} props.options - The list of available sort options.
 * @returns {JSX.Element} The rendered component.
 */
const SortByOptions = ({ selectedOption, onSelectOption, options }) => {

  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  return (
    <div className="mb-4">
      <div className="items-center border border-gray-200 rounded-lg bg-white">
        {options?.map((option) => (
          <button
            className={`${selectedOption === option?"bg-slate-100":""} w-full text-left py-2 px-4 hover:bg-slate-200`}
            onClick={() => onSelectOption(selectedOption === option?null:option)}
          >
            {toTitleCase(option)}
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
