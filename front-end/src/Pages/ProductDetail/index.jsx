import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSelection from '../../Components/ProductSelection';
import Reviews from '../../Components/Reviews';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

/**
 * Renders the product detail page.
 *
 * @returns {JSX.Element} The rendered product detail page.
 */
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await auth.authFetch(`${ApiConfig.products}${id}`);
      const product = await response.data;
      setProduct(product);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ProductSelection product={product} />
      <Reviews product_id={product.id} average={product.rating}/>
    </div>
  );
};

export default ProductDetail;