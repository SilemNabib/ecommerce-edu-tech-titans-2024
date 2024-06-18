import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../Context';

/**
 * Card component represents a card item in the UI.
 *
 * @param {Object} data - The data object containing information about the card.
 * @returns {JSX.Element} - The rendered Card component.
 */
const Card = ({ data }) => {
  const context = useContext(GlobalContext);

  const { openProductDetail, setProductToShow, cartProducts, closeProductDetail } = useContext(GlobalContext);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const showProduct = () => {
    openProductDetail();
    setProductToShow(data);
  };

  const addProductsToCart = (event) => {
    event.stopPropagation();
    // Agregar: envio de petición POST a la API para agregar el producto al carrito y recibimiento de la información para actualizar el estado de cartProducts
    closeProductDetail();
  };

  const isInCart = cartProducts?.some(product => product.id === data.id);

  // Colores temporales
  const colors = [
    { name: 'red', class: 'bg-red-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
  ];

  // Tallas temporales
  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <Link to={`/product-detail/${data.id}`}>
    <div className='bg-white cursor-pointer w-full sm:w-64 h-100 shadow-lg rounded-lg overflow-hidden mb-4 flex flex-col' onClick={showProduct}>
      <figure className='relative w-full h-2/3'>
        <img className='w-full h-full object-cover' src={data.productImages[0].url} alt={data.name} />
        <div
          className={`absolute top-0 right-0 flex justify-center items-center w-8 h-8 rounded-full m-2 p-1 ${isInCart ? 'bg-green-500' : 'bg-white'}`}
          onClick={isInCart ? undefined : addProductsToCart}>
          {isInCart ? <CheckIcon className="size-8 text-white" /> : <PlusIcon className="size-8 text-black" />}
        </div>
      </figure>
      <div className='p-4 flex-grow'>
        <span className='block text-gray-900 font-semibold text-lg mb-2 overflow-ellipsis overflow-hidden whitespace-nowrap'>{data.title}</span>
        <span className='block text-gray-900 font-bold text-sm mt-2 mb-2'>${data.price}</span>
        <div className='flex justify-center mt-2 mb-4'>
          {colors.map((color, index) => (
            <span 
              key={index} 
              onClick={() => setSelectedColor(color.name)}
              className={`h-6 w-6 rounded-full ${color.class} ml-2 ${selectedColor === color.name ? 'ring-2 ring-black' : ''}`}
            ></span>
          ))}
        </div>
        <div className='mt-2 flex justify-center items-center'>
          <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mr-2">Size:</label>
          {sizes.map((size, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedSize(size)}
              className={`cursor-pointer px-2 py-1 border-2 ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300'} rounded-lg ml-2 mr-2`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
    </Link>
  )
}

Card.propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    }).isRequired,
  };

export default Card;
