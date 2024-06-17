import { useState } from 'react';

const ProductSelection = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Colores y tallas temporales
  const colors = ['red', 'blue', 'green'];
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 mt-8">
      <h1 className="text-3xl font-bold mb-4">{product.name.toUpperCase()}</h1>
      <img src={product.productImages[0].url} alt={product.name} className="w-64 h-64 object-cover mb-4" />
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="flex mb-4">
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => setSelectedColor(color)}
            className={`h-6 w-6 rounded-full bg-${color}-500 ml-2 cursor-pointer ${selectedColor === color ? 'ring-2 ring-black' : ''}`}
          ></div>
        ))}
      </div>
      <div className="flex mb-4">
        {sizes.map((size, index) => (
          <div
            key={index}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border-2 cursor-pointer ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300'} rounded-lg ml-2`}
          >
            {size}
          </div>
        ))}
      </div>
      <button className="px-4 py-2 bg-black text-white rounded-lg">Add to cart</button>
    </div>
  );
};

export default ProductSelection;