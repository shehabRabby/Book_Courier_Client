import React from 'react';
import logo from '../../assets/logo.png'

const Logo = () => {
    return (
        <div>
            <img src={logo} alt="Website Logo" className='h-18 w-18' />
        </div>
    );
};

export default Logo;