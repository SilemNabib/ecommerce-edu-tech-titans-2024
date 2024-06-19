import PropTypes from 'prop-types';

const SelectColor = ({ colors, selectedColor, onSelectColor }) => {
  return (
    <div className='flex justify-center mt-2 mb-4'>
      {colors.map((color, index) => (
        <span
          key={index}
          onClick={() => onSelectColor(color.name)}
          className={`h-6 w-6 rounded-full ${color.class} ml-2 ${selectedColor === color.name ? 'ring-2 ring-black' : ''}`}
        ></span>
      ))}
    </div>
  );
}

SelectColor.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
  })).isRequired,
  selectedColor: PropTypes.string.isRequired,
  onSelectColor: PropTypes.func.isRequired,
};

export default SelectColor;