
import React from 'react';
import { Leaf, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-eco-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Leaf className="h-6 w-6 text-eco-300" />
              <span className="ml-2 text-lg font-semibold">EcoLife Navigator</span>
            </div>
            <p className="mt-2 text-eco-200 text-sm">
              Your companion for a more sustainable lifestyle. Track, learn, and grow your eco-friendly habits.
            </p>
          </div>
          
          <div>
            <h3 className="text-eco-300 font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#carbon-footprint" className="hover:text-eco-300 transition-colors">Carbon Footprint</a></li>
              <li><a href="#eco-products" className="hover:text-eco-300 transition-colors">Eco Products</a></li>
              <li><a href="#waste-management" className="hover:text-eco-300 transition-colors">Waste Management</a></li>
              <li><a href="#education" className="hover:text-eco-300 transition-colors">3Rs Education</a></li>
              <li><a href="#eco-game" className="hover:text-eco-300 transition-colors">Eco Game</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-eco-300 font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-eco-300 transition-colors">Sustainability Blog</a></li>
              <li><a href="#" className="hover:text-eco-300 transition-colors">Carbon Offset Programs</a></li>
              <li><a href="#" className="hover:text-eco-300 transition-colors">Community Projects</a></li>
              <li><a href="#" className="hover:text-eco-300 transition-colors">Partner Organizations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-eco-300 font-medium mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-eco-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-eco-200 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-eco-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-eco-200 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-eco-300">
              Subscribe to our newsletter for the latest tips and updates on sustainable living.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-eco-700 text-center text-xs text-eco-400">
          <p>© {new Date().getFullYear()} EcoLife Navigator. All rights reserved.</p>
          <p className="mt-1">Made with 💚 for our planet</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
