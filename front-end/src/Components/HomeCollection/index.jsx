import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { toast } from 'react-toastify';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { ApiConfig } from '../../config/ApiConfig';

const HomeSection = ({ category, categories }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoriesQuery = categories.map(category => `categories=${category}`).join('&');
        console.log(categoriesQuery)
        const response = await fetch(`${ApiConfig.products}?${categoriesQuery}`);
        const data = await response.json();
        if(data._embedded){
          setProducts(data._embedded.productList);
        }
      } catch (error) {
        toast.error('Failed to fetch products');
      }
    };

    fetchProducts();
  }, [categories]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if(products.length === 0){
    return null;
  }
  
  return (
    <section className="bg-gray-100 py-4">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <header className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Collection</h2>
        </header>

        <Slider {...settings} className="mt-8">
          {products.map((product) => (
            <Link to={`/product-detail/${product.id}`} key={product.id} className="px-2">
            <div key={product.id} className="px-2">
              <div className="group block overflow-hidden bg-white rounded-lg shadow-md">
                <img
                  src={product.productImages[0].url}
                  alt={product.name}
                  className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-4">
                  <h3 className="text-sm text-gray-700 group-hover:underline overflow-ellipsis overflow-hidden h-12">
                    {product.name}
                  </h3>
                </div>
              </div>
            </div>
            </Link>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-900 text-white rounded-full p-2 z-10"
      onClick={onClick}
    >
      <ChevronRightIcon className="h-6 w-6" />
    </button>
  );
};

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-900 text-white rounded-full p-2 z-10"
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-6 w-6" />
    </button>
  );
};

export default HomeSection;
