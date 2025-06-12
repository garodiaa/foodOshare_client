import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const Authlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='mx-auto min-h-[calc(100vh-150px)]'>
                {/* This is where the authentication related components will be rendered */}
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Authlayout;