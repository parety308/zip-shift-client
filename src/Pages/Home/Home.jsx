import React from 'react';
import Banner from '../../component/Banner/Banner';
import HowItWorks from '../../component/HowItWorks/HowItWorks';
import OurServices from '../../component/OurServices/OurServices';
import Brans from '../../component/Brands/Brans';
import Reviews from '../../component/Reviews/Reviews';
// import Reviews from '../../component/Reviews/Reviews';

const Home = () => {
    return (
        <div>
        <Banner/>
        <HowItWorks/>
        <OurServices/>
        <Brans/>
       <Reviews/>
        </div>
    );
};

export default Home;