import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../Components/Card';
import { ApiConfig } from '../../config/ApiConfig';

const Category = () => {
  const { category, section, item } = useParams();
  const [products, setProducts] = useState([]);
  console.log(category, section, item);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoriesQuery = [category, section, item]
          .filter(value => value !== null && value !== undefined)
          .map(category => `categories=${category}`)
          .join('&');
        const response = await fetch(`${ApiConfig.products}?${categoriesQuery}`);
        
        const data = await response.json();
        if(data._embedded) {
          setProducts(data._embedded.productList || []);
        }
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category, section, item]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <Card key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default Category;
