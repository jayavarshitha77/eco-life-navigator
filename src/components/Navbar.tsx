
import React, { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-eco-900/80 backdrop-blur-md border-b border-eco-100 dark:border-eco-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Leaf className="h-8 w-8 text-eco-500" />
            <span className="ml-2 text-xl font-semibold text-eco-800 dark:text-white">EcoLife Navigator</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#carbon-footprint" className="text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-sm font-medium">Carbon Footprint</a>
            <a href="#eco-products" className="text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-sm font-medium">Eco Products</a>
            <a href="#waste-management" className="text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-sm font-medium">Waste Management</a>
            <a href="#education" className="text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-sm font-medium">3Rs Education</a>
            <a href="#eco-game" className="text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-sm font-medium">Eco Game</a>
          </div>
          
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-eco-900 border-b border-eco-100 dark:border-eco-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#carbon-footprint" 
              className="block text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Carbon Footprint
            </a>
            <a 
              href="#eco-products" 
              className="block text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Eco Products
            </a>
            <a 
              href="#waste-management" 
              className="block text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Waste Management
            </a>
            <a 
              href="#education" 
              className="block text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              3Rs Education
            </a>
            <a 
              href="#eco-game" 
              className="block text-eco-700 dark:text-eco-100 hover:text-eco-500 dark:hover:text-eco-400 px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Eco Game
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
