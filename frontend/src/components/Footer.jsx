import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">About Pathik</h3>
            <p className="text-sm">
              Pathik is your ultimate guide to exploring the world. Discover new places, plan your trips, and share your adventures with the community.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink to="/about" className="text-sm hover:text-gray-300">
                  About Me
                </NavLink>
              </li>
              
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Follow Me</h3>
            <div className="flex space-x-4">
              
              
              <NavLink
                to="http://instagram.com/cbh_ere/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <Instagram className="h-6 w-6" />
              </NavLink>
              <NavLink
                to="https://www.linkedin.com/in/chandrabhushan-vishwakarma-7583652a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <Linkedin className="h-6 w-6" />
              </NavLink>
              <NavLink
                to="https://github.com/cb-here"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300"
              >
                <Github className="h-6 w-6" />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Pathik. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;