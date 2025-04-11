
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, TreeDeciduous } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

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
            {navLinks.map((link) => (
              <Link 
                key={link.title}
                to={link.href}
                className="px-3 py-2 rounded-md hover:bg-eco-600 transition-colors"
              >
                {link.title}
              </Link>
            ))}
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
