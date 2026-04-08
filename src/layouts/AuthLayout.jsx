import React from 'react';
import NavBar from '../pages/shared/navaBar/NavBar';

import Footer from '../pages/shared/footer/Footer';
import authimg from '../assets/ShifToDelivery.png';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NavBar />
            <div 
                className="min-h-[calc(100vh-180px)] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
                style={{ backgroundImage: `url(${authimg})` }}
            >
                <div className="w-full max-w-md bg-white/90 backdrop-blur p-8 rounded-3xl shadow-2xl">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;