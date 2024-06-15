import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { homeCarouselData } from '../../config/HomeCarouselData';
import './styles.css';

const responsive = {
    0: { items: 1 },
    720: { items: 2 },
    1024: { items: 3 },
};

const HomeCarousel = () => {
    const items = homeCarouselData.map((item, index) => 
        <img 
            key={index}
            className='carousel-image cursor-pointer' 
            role='presentation' 
            src={item.image} 
            alt="carousel" 
        />
    )

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