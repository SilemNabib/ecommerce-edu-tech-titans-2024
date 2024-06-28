import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { ApiConfig } from '../../config/ApiConfig';
import { useAuth } from '../../Context/AuthContext';

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
  const auth = useAuth();

  const colors = product?.inventories?.map(inventory => inventory.color);
  const sizes = product?.inventories?.map(inventory => inventory.size);

  const stockOf = (product) => {
    const inventory = product.inventories.find(inventory => inventory.color.name === selectedColor && inventory.size === selectedSize);
    const stock = inventory ? inventory.stock : 0;
    return stock === 0 ? 'Out of stock' : stock;
  }

  const addToCart = async () => {
    try {
      if(!selectedColor || !selectedSize){ 
        toast.error('Please select color and size');
        return;
      }

      if(stockOf(product) === 'Out of stock'){
        toast.error('Product out of stock');
        return;
      }

      const response = await auth.authFetch(ApiConfig.cart.add, {
        method: 'POST',
        data: JSON.stringify({
          inventoryId: product.inventories.find(inventory => inventory.color.name === selectedColor && inventory.size === selectedSize).id,
          amount: 1,
        }),
      });

      if (response.status === 200) {
        const items = response.data.data;
        sessionStorage.setItem('cart', JSON.stringify(items));
        toast.success('Product added to cart');
      } else {
        toast.error('Error adding product to cart');
      }

    } catch (error) {
      toast.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <ToastContainer />
      <h1 className="text-4xl font-bold mb-6">{product.name.toUpperCase()}</h1>
      <h2 className="text-md font-bold mb-6">Price: ${product.price}</h2>
      <div className="flex flex-col md:flex-row items-center mb-6">
        <img src={product.productImages[0].url} alt={product.name} className="w-64 h-64 object-cover object-right-top mb-4 md:mb-0 md:mr-6" />
        <div className="flex flex-col md:flex-1">
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2">Colors:</span>
            <div className="flex space-x-2">
              {colors?.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedColor(color.name)}
                  style={{ backgroundColor: color.code }}
                  className={`h-8 w-8 rounded-full cursor-pointer ${selectedColor === color.name ? 'ring-2 ring-black' : ''}`}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex items-center mb-4">
            <span className="mr-2">Sizes:</span>
            <div className="flex space-x-2">
              {sizes?.map((size, index) => (
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
          <div>
            {selectedColor && selectedSize &&
              (
                <p className="text-gray-700">Stock: {stockOf(product)}</p>
              )
            }
          </div>
          <button className={`px-4 py-2 bg-black text-white rounded-lg mt-4 hover:bg-gray-800 transition duration-300 ${!selectedColor || !selectedSize || stockOf(product) === 'Out of stock' ? 'opacity-50 cursor-not-allowed' : ''} `}
          onClick={addToCart}
          disabled={!selectedColor || !selectedSize || stockOf(product) === 'Out of stock'}
          >Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
