import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Root = () => {
    return (
        <div>
            <Navbar/>
            <h1 className="text-5xl">Root</h1>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default Root;