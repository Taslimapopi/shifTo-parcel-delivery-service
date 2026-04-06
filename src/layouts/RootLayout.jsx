import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../pages/shared/navaBar/NavBar';
import Footer from '../pages/shared/footer/Footer';

const RootLayout = () => {
    return (
        <div className='w-11/12 mx-auto space-y-4'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;