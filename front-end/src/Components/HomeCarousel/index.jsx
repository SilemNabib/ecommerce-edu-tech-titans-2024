import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import AliceCarousel, { Link } from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { ApiConfig } from '../../config/ApiConfig';
import './styles.css';

const responsive = {
    0: { items: 1 },
    720: { items: 2 },
    1024: { items: 3 },
};

/**
 * HomeCarousel component displays a carousel of banners fetched from an API.
 *
 * @returns {JSX.Element} The HomeCarousel component.
 */
const HomeCarousel = () => {
    const [banners, setBanners] = useState(null);

    useEffect(() => {
      const fetchBanners = async () => {
        try {
          const response = await fetch(ApiConfig.banners);
          const data = await response.json();
          if (data) {
            setBanners(data);
          }else{
            setBanners([]);
          }
        } catch (error) {
          toast.error("Failed to fetch home banners");
        }
      };
      fetchBanners();
    }, []);

    const items = banners?.map((item, index) =>
        <Link to={item.url}>
          <img
              key={item.id}
              className='carousel-image cursor-pointer'
              role='presentation'
              src={item.imageUrl}
              alt="carousel"
          />
        </Link>
    )

    if(!banners){
        return <CircularProgress />;
    }

    return (
        <AliceCarousel 
            items={items}
            disableButtonsControls
            autoPlay
            autoPlayInterval={3000}
            infinite
        />        
    )
};

export default HomeCarousel;