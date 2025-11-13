import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Menu,
  X,
  Code,
  MessageCircle,
  Lightbulb,
  Route,
  LinkIcon,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
      isActive
        ? "text-white bg-purple-600 shadow-lg"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
      isActive
        ? "text-white bg-purple-600 shadow-md"
        : "text-gray-300 hover:text-white hover:bg-gray-800"
    }`;

  return (
    <nav className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-gray-900/95 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink
                to="/"
                className="group flex items-center gap-2 text-white text-2xl font-bold tracking-tight hover:scale-105 transition-transform duration-300"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-all duration-300 shadow-lg">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <span className="text-white">Pathik</span>
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                <NavLink to="/path" className={navLinkClass}>
                  <Route className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Path</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300" />
                </NavLink>

                <NavLink to="/coding" className={navLinkClass}>
                  <Code className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Code</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300" />
                </NavLink>

                <NavLink to="/discuss" className={navLinkClass}>
                  <MessageCircle className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Discuss</span>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-3/4 transition-all duration-300" />
                </NavLink>

                {token && (
                  <NavLink to="/profile" className={navLinkClass}>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-all duration-300">
                      <User className="h-5 w-5" />
                    </div>
                  </NavLink>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-600 p-2 rounded-lg transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 transform rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2 border-t border-gray-800">
            <NavLink
              to="/path"
              className={mobileNavLinkClass}
              onClick={toggleMenu}
            >
              <Route className="h-5 w-5" />
              <span>Path</span>
            </NavLink>

            <NavLink
              to="/coding"
              className={mobileNavLinkClass}
              onClick={toggleMenu}
            >
              <Code className="h-5 w-5" />
              <span>Code</span>
            </NavLink>

            <NavLink
              to="/discuss"
              className={mobileNavLinkClass}
              onClick={toggleMenu}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Discuss</span>
            </NavLink>

            {token && (
              <NavLink
                to="/profile"
                className={mobileNavLinkClass}
                onClick={toggleMenu}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
