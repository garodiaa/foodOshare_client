import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Homelayout = () => {

    const location = useLocation();

     useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }); // Scroll to top of page
    }, [location.pathname]);

    return (
        <div>
            <Navbar></Navbar>
            <div className='mx-auto min-h-[calc(100vh-150px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
            
        </div>
    );
};

export default Homelayout;