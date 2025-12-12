import React from 'react';
import { FaXTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa6'; 
// FIX 1: Corrected Link import source from 'react-router' to 'react-router-dom'
import { Link } from 'react-router';
import Logo from '../../../Components/Logo/Logo';

const Footer = () => {
  return (
    // Theme: bg-neutral for a dark, high-contrast footer. text-neutral-content for theme-aware light text.
    <footer className="footer bg-neutral text-neutral-content p-10">
      
      {/* Main container for the 4-column grid */}
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* 1. Logo and Copyright Section */}
        <div>
          <div className="mb-4">
            <Logo />
          </div>
          <p className="text-sm opacity-80">
            Courier Service for Book Lovers.
          </p>
          <p className="text-sm opacity-60 mt-1">
            &copy; {new Date().getFullYear()} BookCourier.
            <br />
            All Rights Reserved.
          </p>
        </div>

        {/* 2. Quick Links Section */}
        <div>
          <h6 className="footer-title">Quick Links</h6>
          {/* Links use link-hover and Link component */}
          <div className='flex flex-col gap-1'>
          <Link to="/about-us" className="link link-hover">About Us</Link>
          <Link to="/" className="link link-hover">Services</Link>
          <Link to="/blog" className="link link-hover">Blog</Link>
          <Link to="/faq" className="link link-hover">FAQ</Link>
</div>
        </div>

        {/* 3. Contact Details Section */}
        <div>
          <h6 className="footer-title">Contact Us</h6>
          <p className="text-sm opacity-80">123 Pallabi, House-B 400</p>
          <p className="text-sm opacity-80">Mirpur-11 | Dhaka 10001</p>
          <a href="mailto:info@example.com" className="link link-hover text-sm">shehabrabby764@gmail.com</a>
          <a href="tel:+8801773562177" className="link link-hover text-sm">+880 1773-562177</a>
        </div>

        {/* 4. Social Icons Section */}
        <div>
          <h6 className="footer-title">Follow Us</h6>
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