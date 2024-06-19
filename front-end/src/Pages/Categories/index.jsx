import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../../Components/Card';
import FilterBy from '../../Components/FilterBy';
import { ApiConfig } from '../../config/ApiConfig';

const Categories = () => {
  const { category, section, item } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

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
          setFilteredProducts(data._embedded.productList || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category, section, item]);

  useEffect(() => {
    let filtered = products;
    if (selectedColor) {
      filtered = filtered.filter(product => product.colors.includes(selectedColor));
    }
    if (selectedSize) {
      filtered = filtered.filter(product => product.sizes.includes(selectedSize));
    }
    setFilteredProducts(filtered);
  }, [selectedColor, selectedSize, products]);

  const colors = [
    { name: 'red', class: 'bg-red-500' },
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  return (
    <div className="flex flex-col sm:flex-row px-4 py-8">
      <div className="w-full sm:w-1/4 pr-4 mb-4 sm:mb-0">
        <FilterBy 
          colors={colors} 
          sizes={sizes} 
          selectedColor={selectedColor} 
          setSelectedColor={setSelectedColor} 
          selectedSize={selectedSize} 
          setSelectedSize={setSelectedSize} 
        />
      </div>
      <div className="w-full sm:w-3/4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">{category}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 border border-gray-300 rounded-lg p-4">
            {filteredProducts.map(product => (
              <Card key={product.id} data={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
