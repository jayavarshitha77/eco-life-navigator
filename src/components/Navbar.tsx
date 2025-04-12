
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, TreeDeciduous, ChevronDown, LogIn, UserPlus } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'Diet Planner', href: '/diet-planner' },
    { title: 'Fitness', href: '/fitness' },
    { title: 'Calorie Calculator', href: '/calorie-calculator' },
    { title: 'Community', href: '/community' },
  ];

  return (
    <nav className="bg-eco-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <TreeDeciduous className="h-8 w-8" />
              <span className="font-bold text-xl">EcoLife</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Home Link */}
            <Link 
              to="/"
              className="px-3 py-2 rounded-md hover:bg-eco-600 transition-colors"
            >
              Home
            </Link>
            
            {/* Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-3 py-2 rounded-md hover:bg-eco-600 transition-colors flex items-center gap-1 focus:outline-none">
                Features <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white text-gray-800">
                {navLinks.slice(1).map((link) => (
                  <DropdownMenuItem key={link.title} className="cursor-pointer">
                    <Link to={link.href} className="w-full px-2 py-1">
                      {link.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Quick Links */}
            {navLinks.slice(1, 4).map((link) => (
              <Link 
                key={link.title}
                to={link.href}
                className="px-3 py-2 rounded-md hover:bg-eco-600 transition-colors"
              >
                {link.title}
              </Link>
            ))}
            
            {/* Auth Links */}
            <div className="flex items-center ml-4 space-x-2">
              <Link 
                to="/login" 
                className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-eco-600 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link 
                to="/signup" 
                className="flex items-center gap-1 px-3 py-2 bg-white text-eco-600 rounded-md hover:bg-gray-100 transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <button 
                  className="p-2 rounded-md text-white hover:bg-eco-600 focus:outline-none"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-eco-500 text-white border-eco-600">
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      className="px-3 py-2 rounded-md hover:bg-eco-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  ))}
                  <div className="pt-4 border-t border-eco-400">
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-eco-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogIn className="h-5 w-5" />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 px-3 py-2 mt-2 bg-white text-eco-600 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserPlus className="h-5 w-5" />
                      Sign Up
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
