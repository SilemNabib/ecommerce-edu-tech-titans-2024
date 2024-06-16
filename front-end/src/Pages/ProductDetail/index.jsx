import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductSelection from '../../Components/ProductSelection';
import Reviews from '../../Components/Reviews';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => setProduct(json));
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