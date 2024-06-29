import { Cog6ToothIcon } from '@heroicons/react/24/outline';

/**
 * Renders the product information component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.product - The product object.
 * @param {Function} props.openModal - The function to open the modal.
 * @returns {JSX.Element} The rendered component.
 */
const ProductInfo = ({ product, openModal }) => {

    return (
        <div className="flex flex-col md:flex-row items-center border-b border-gray-300 p-4">
            <img src={product.productImages[0].url} alt={product.name} className="w-24 h-24 object-cover object-top" />
            <div className="mt-4 md:mt-0 md:ml-4 flex-1">
                <h2 className="text-lg font-bold">{product.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h2>
                <p>Variants: {product.inventories.length}</p>
                <p>Stock: {product.stock}</p>
                <p>Sold: {product.solds}</p>
            </div>
            <div className="mt-4 md:mt-0 md:ml-4">
                <button onClick={() => openModal(product.id)}>
                    <Cog6ToothIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;