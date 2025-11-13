import React from 'react';
import { Instagram, Linkedin, Github, Lightbulb } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Pathik</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your ultimate learning companion. Create personalized learning paths, discover resources, and achieve your goals with AI-powered recommendations.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/about"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  About Me
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/path"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  Learning Paths
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/discuss"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  Discussions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/coding"
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
                >
                  Code Editor
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Connect With Me</h3>
            <div className="flex space-x-3">
              <NavLink
                to="http://instagram.com/cbh_ere/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-200"
              >
                <Instagram className="h-5 w-5" />
              </NavLink>
              <NavLink
                to="https://www.linkedin.com/in/chandrabhushan-vishwakarma-7583652a0/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </NavLink>
              <NavLink
                to="https://github.com/cb-here"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all duration-200"
              >
                <Github className="h-5 w-5" />
              </NavLink>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Follow me for updates and learning resources
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Pathik. All rights reserved. Made with passion for learners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;