import React from 'react';
import Marquee from 'react-fast-marquee';
import amazon from "../../assets/brands/amazon.png";
import amazonVector from "../../assets/brands/amazon_vector.png";
import casio from "../../assets/brands/casio.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import star from "../../assets/brands/star.png";
import startPeople from "../../assets/brands/start_people.png";

const Brans = () => {
    return (
        <Marquee className='my-10' pauseOnHover={true} speed={100} gradient={false}>
            <div className='mx-10' ><img src={amazon} alt="" /></div>
            <div className='mx-10' ><img src={amazonVector} alt="" /></div>
            <div className='mx-10' ><img src={casio} alt="" /></div>
            <div className='mx-10' ><img src={moonstar} alt="" /></div>
            <div className='mx-10' ><img src={randstad} alt="" /></div>
            <div className='mx-10' ><img src={star} alt="" /></div>
            <div className='mx-10' ><img src={startPeople} alt="" /></div>
        </Marquee>
    );
};

export default Brans;