import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { toast } from 'react-toastify';
import { ApiConfig } from '../../config/ApiConfig';

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
          } else {
            setBanners([]);
          }
        } catch (error) {
          toast.error("Failed to fetch home banners");
        }
      };
      fetchBanners();
    }, []);

    const items = banners?.map((item) =>
        <div className="w-full h-full flex items-center justify-center rounded-lg overflow-hidden" key={item.id}>
          <img
              className='w-full h-[30vw] sm:h-[20vw] md:h-[15vw] lg:h-[100vh] object-contain'
              role='presentation'
              src={item.imageUrl}
              alt="carousel"
          />
        </div>
    )

    if(!banners){
        return <CircularProgress />;
    }

    return (
        <div className="mb-8">
            <AliceCarousel 
                items={items}
                disableButtonsControls
                disableDotsControls
                autoPlay
                autoPlayInterval={2000}
                infinite
            />        
        </div>
    )
};

export default HomeCarousel;