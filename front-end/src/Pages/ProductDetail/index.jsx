import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSelection from '../../Components/ProductSelection';
import Reviews from '../../Components/Reviews';
import { useAuth } from '../../Context/AuthContext';
import { ApiConfig } from '../../config/ApiConfig';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <ProductSelection product={product} />
      <Reviews product_id={product.id} average={product.rating}/>
    </div>
  );
};

export default ProductDetail;