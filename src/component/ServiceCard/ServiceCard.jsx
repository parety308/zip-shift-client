import React from 'react';
import img from '../../assets/service.png'
const ServiceCard = ({ serv }) => {
    const {title, description}=serv;
    return (
        <div className="border p-6 rounded-lg shadow-sm bg-amber-100 flex justify-center items-center flex-col gap-4 hover:bg-primary">
            <img src={img} alt="" />
            <h3 className='text-2xl font-semibold'>{title}</h3>
            <p className='text-lg'>{description}</p>
        </div>
    );
};

export default ServiceCard;