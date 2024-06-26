import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const ProductInfo = ({ product, openModal }) => {

    return (
        <div className="flex flex-col md:flex-row items-center border-b border-gray-300 p-4">
            <img src={product.productImages[0].url} alt={product.name} className="w-24 h-24 object-cover object-top" />
            <div className="mt-4 md:mt-0 md:ml-4 flex-1">
                <h2 className="text-lg font-bold">{product.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                <p>Variants: {product.variants}</p>
                <p>Stock: {product.stock}</p>
                <p>Sold: {product.solds}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4">
                <button onClick={openModal}>
                    <Cog6ToothIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;