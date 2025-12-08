import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div>
            <img src={logo} alt="Website Logo" className='h-25 w-25' />
        </div>
    );
};

export default Logo;