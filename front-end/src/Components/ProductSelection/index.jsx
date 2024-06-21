import { useState } from 'react';

/**
 * Renders a product selection component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object containing information about the product.
 * @returns {JSX.Element} The rendered product selection component.
 */
const ProductSelection = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Colores y tallas temporales
  const colors = ['red', 'blue', 'green'];
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-4xl font-bold mb-6">{product.name.toUpperCase()}</h1>
      <h2 className="text-md font-bold mb-6">Price: ${product.price}</h2>
      <div className="flex flex-col md:flex-row items-center mb-6">
        <img src={product.productImages[0].url} alt={product.name} className="w-64 h-64 object-cover object-right-top mb-4 md:mb-0 md:mr-6" />
        <div className="flex flex-col md:flex-1">
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2">Colors:</span>
            <div className="flex space-x-2">
              {colors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`h-8 w-8 rounded-full bg-${color}-500 cursor-pointer ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2">Sizes:</span>
            <div className="flex space-x-2">
              {sizes.map((size, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border-2 cursor-pointer ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300'} rounded-lg`}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-lg mt-4 hover:bg-gray-800 transition">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
