import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSelection from '../../Components/ProductSelection';
import Reviews from '../../Components/Reviews';

/**
 * Renders the product detail page.
 *
 * @returns {JSX.Element} The rendered product detail page.
 */
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product = await response.json();
      setProduct(product);
    };
  
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <ProductSelection product={product} />
      <Reviews />
    </div>
  );
};

export default ProductDetail;