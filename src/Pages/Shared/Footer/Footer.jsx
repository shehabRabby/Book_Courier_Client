import React from 'react';
import { FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'; 
import { Link } from 'react-router';// Correct icons for X, LinkedIn, and Instagram
import Logo from '../../../Components/Logo/Logo';


const Footer = () => {
  return (
    // DaisyUI Footer component with dark background
  <footer className="footer  text-black-content p-10">
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 1. Logo and Copyright Section (No Change) */}
        <div className="flex flex-col items-center col-span-1 md:col-span-1">
          {/* <Link to="/" aria-label="Go to Home Page" className="mb-4">
            <img 
              src="/your-website-logo.png" 
              alt="Your Website Logo" 
              className="w-32 h-auto" 
            />
          </Link> */}
          <Logo ></Logo>
          <p className="text-sm text-gray-800 mt-2">
            &copy; {new Date().getFullYear()} BookCourier.
            <br />
            All Rights Reserved.
          </p>
        </div>

        {/* 2. Quick Links Section (UPDATED TO USE <Link>) */}
        <div className="col-span-1 ">
          <h6 className="footer-title text-white">Quick Links</h6>
          
          {/* Using Link for client-side routing */}
         <div className='flex gap-4'>
           {/* <Link to="/about" className="link link-hover">About Us</Link>
          <Link to="/services" className="link link-hover">Services</Link>
          <Link to="/blog" className="link link-hover">Blog</Link>
          <Link to="/faq" className="link link-hover">FAQ</Link> */}
         </div>
        </div>

        {/* 3. Contact Details Section (No Change) */}
        <div className="col-span-1">
          <h6 className="footer-title text-white">Contact Us</h6>
          <p className="text-sm">123 Pallabi, House-B 400</p>
          <p className="text-sm">Mirpur-11 | Dhaka 10001</p>
          {/* Note: Standard <a> tags remain for external links like mailto/tel */}
          <a href="mailto:info@example.com" className="link link-hover text-sm">shehabrabby764@gmail.com</a> <br />
          <a href="tel:+15551234567" className="link link-hover text-sm">+880 1773-562177</a>
        </div>

        {/* 4. Social Icons Section (No Change) */}
        <div className="col-span-1">
          <h6 className="footer-title text-white">Follow Us</h6>
          <div className="grid grid-flow-col gap-4">
            <a 
              href="https://x.com/your-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on X"
              className="hover:text-primary transition-colors"
            >
              <FaXTwitter className="text-2xl" />
            </a>
            <a 
              href="https://linkedin.com/in/your-profile" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Connect with us on LinkedIn"
              className="hover:text-primary transition-colors"
            >
              <FaLinkedinIn className="text-2xl" />
            </a>
            <a 
              href="https://instagram.com/your-username" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Instagram"
              className="hover:text-primary transition-colors"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;