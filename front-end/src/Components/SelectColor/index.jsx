import PropTypes from 'prop-types';

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