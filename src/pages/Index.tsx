
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarbonFootprint from '@/components/CarbonFootprint';
import ProductRecommendations from '@/components/ProductRecommendations';
import WasteManagement from '@/components/WasteManagement';
import EducationalContent from '@/components/EducationalContent';
import EcoQuiz from '@/components/EcoQuiz';
import { Leaf, Zap, Users, TreeDeciduous } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-eco-500 to-eco-700 text-white py-20">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-eco-300 rounded-full"></div>
          <div className="absolute top-1/2 -left-1/4 w-1/2 h-3/4 bg-eco-200 rounded-full"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Your Guide to Sustainable Living
              </h1>
              <p className="text-lg md:text-xl mb-8 text-eco-100">
                Track your environmental impact, discover eco-friendly products, learn waste management techniques, and become a part of the solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#carbon-footprint">
                  <Button className="w-full sm:w-auto bg-white text-eco-700 hover:bg-eco-100 font-semibold px-6 py-3 rounded-md">
                    Calculate Your Footprint
                  </Button>
                </a>
                <a href="#education">
                  <Button variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-md">
                    Learn More
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <div className="animate-float">
                  <TreeDeciduous className="h-48 w-48 text-white opacity-70" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-start">
              <div className="bg-white/20 rounded-full p-3 mr-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Reduce Your Impact</h3>
                <p className="text-eco-100">Track and minimize your carbon footprint with personalized recommendations.</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-start">
              <div className="bg-white/20 rounded-full p-3 mr-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sustainable Solutions</h3>
                <p className="text-eco-100">Discover eco-friendly products and waste management techniques.</p>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex items-start">
              <div className="bg-white/20 rounded-full p-3 mr-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Join the Movement</h3>
                <p className="text-eco-100">Be part of the global community working toward a sustainable future.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <main className="flex-grow">
        <div id="carbon-footprint">
          <CarbonFootprint />
        </div>
        
        <div className="bg-eco-50 dark:bg-eco-900" id="eco-products">
          <ProductRecommendations />
        </div>
        
        <div id="waste-management">
          <WasteManagement />
        </div>
        
        <div className="bg-eco-50 dark:bg-eco-900" id="education">
          <EducationalContent />
        </div>
        
        <div id="eco-game">
          <EcoQuiz />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
