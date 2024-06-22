import { CheckIcon, PlusIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../Context';
import SelectColor from '../SelectColor';
import SelectSize from '../SelectSize';

const Card = ({ data }) => {
  const context = useContext(GlobalContext);
  const { setProductToShow, cartProducts } = context;
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const showProduct = () => {
    setProductToShow(data);
  };

  const addToCart = async () => {
    try {
      const response = await fetch('/api/v1/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          inventoryId: data.inventories[0].id, 
          amount: 1, 
        }),
      });
      
      const result = await response.json();
      if (response.ok) {
        console.log('Product added to cart:', result);
      } else {
        console.error('Failed to add product to cart:', result.message);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const isInCart = cartProducts?.some(product => product.id === data.id);
  const colors = data?.inventories?.map(inventory => ({ name: inventory.color.name, code: inventory.color.code })) || [];
  const sizes = data?.inventories?.map(inventory => inventory.size) || [];
  const titleCaseName = data.name.replace(/\b(\w)/g, s => s.toUpperCase());

  return (
    <div className='bg-white cursor-pointer w-full shadow-lg rounded-lg overflow-hidden flex flex-col'>
      <figure className='relative w-full h-2/3'>
        <Link to={`/product-detail/${data.id}`} onClick={showProduct}>
          <img className='w-full h-full object-cover' src={data.productImages[0].url} alt={data.name} />
        </Link>
        <div
          className={`absolute top-0 right-0 flex justify-center items-center w-8 h-8 rounded-full m-2 p-1 ${isInCart ? 'bg-green-500' : 'bg-white'}`}
          onClick={isInCart ? undefined : addToCart}
        >
          {isInCart ? <CheckIcon className="size-8 text-white" /> : <PlusIcon className="size-8 text-black" />}
        </div>
      </figure>
      <div className='p-4 h-44'>
        <span className='block text-center text-gray-900 font-semibold text-lg mb-2 overflow-ellipsis overflow-hidden whitespace-nowrap'>{titleCaseName}</span>
        <span className='block text-gray-900 font-bold text-sm mt-2 mb-2'>${data.price}</span>
        <SelectColor colors={colors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
        <SelectSize sizes={sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      </div>
    </div>
  );
};

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    productImages: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired
    })).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventories: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.shape({
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
      }).isRequired,
      size: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default Card;