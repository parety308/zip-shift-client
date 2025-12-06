import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ban1 from '../../assets/banner/banner1.png';
import ban2 from '../../assets/banner/banner2.png';
import ban3 from '../../assets/banner/banner3.png';
const Banner = () => {
    return (
        <Carousel
        autoPlay={true}
        infiniteLoop={true}
        className='my-5'
        >
                <div>
                    <img src={ban1} />
                </div>
                <div>
                    <img src={ban2}/>
                </div>
                <div>
                    <img src={ban3} />
                </div>
            </Carousel>
    );
};

export default Banner;