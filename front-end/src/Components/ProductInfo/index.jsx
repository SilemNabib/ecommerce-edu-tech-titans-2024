import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const ProductInfo = ({ product }) => {

  return (
    <div className="flex items-center border-b border-gray-300 p-4">
      <img src={product.productImages[0].url} alt={product.name} className="w-24 h-24 object-cover object-top" />
      <div className="ml-4 flex-1">
        <h2 className="text-lg font-bold">{product.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
        <p>Variants: {product.variants}</p>
        <p>Stock: {product.stock}</p>
        <p>Sold: {product.solds}</p>
      </div>
      <div className="ml-4">
        <Link to={`/admin/products/update/${product.id}`}>
          <Cog6ToothIcon className="h-6 w-6"/>
        </Link>
      </div>
    </div>
  );
};

export default ProductInfo;