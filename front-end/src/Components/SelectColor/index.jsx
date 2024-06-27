import PropTypes from 'prop-types';

/**
 * A component for selecting a color from a list of options.
 *
 * @param {Object[]} colors - The list of color options.
 * @param {string} colors[].name - The name of the color.
 * @param {string} colors[].code - The color code in hexadecimal format.
 * @param {string} selectedColor - The currently selected color.
 * @param {Function} onSelectColor - A function to handle the selection of a color.
 * @returns {JSX.Element} The SelectColor component.
 */
const SelectColor = ({ colors, selectedColor, onSelectColor }) => {

  const handleSelectColor = (event, color) => {
    event.stopPropagation();
    onSelectColor(selectedColor === color ? null : color);
  }

  return (
    <div className='flex justify-center mt-2 mb-4 py-2 overflow-x-auto flex-nowrap'>
      {colors.map((color, index) => (
        <span
          key={index}
          onClick={(event) => handleSelectColor(event, color.name)}
          className={`h-6 w-6 rounded-full ml-2 ${selectedColor === color.name ? 'ring-2 ring-black' : ''}`}
          style={{ backgroundColor: color.code }}
        ></span>
      ))}
    </div>
  );
}

SelectColor.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  })).isRequired,
  onSelectColor: PropTypes.func.isRequired,
};

export default SelectColor;