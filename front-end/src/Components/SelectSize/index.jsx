import PropTypes from 'prop-types';

const SelectSize = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className='mt-2 flex justify-center items-center'>
      <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mr-2">Size:</label>
      {sizes.map((size, index) => (
        <div
          key={index}
          onClick={() => onSelectSize(selectedSize == size? null:size)}
          className={`cursor-pointer px-2 py-1 border-2 ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300'} rounded-lg ml-2 mr-2`}
        >
          {size}
        </div>
      ))}
    </div>
  );
}

SelectSize.propTypes = {
  sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectSize: PropTypes.func.isRequired,
};

export default SelectSize;