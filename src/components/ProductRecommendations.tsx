
import React, { useState } from 'react';
import { Search, ShoppingBag, ExternalLink, ThumbsUp, Filter } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for demo purposes
const ecoProducts = [
  {
    id: 1,
    name: "Bamboo Toothbrush Set",
    price: 12.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    link: "https://example.com/bamboo-toothbrush",
    category: "Personal Care",
    tags: ["plastic-free", "biodegradable", "sustainable materials"]
  },
  {
    id: 2,
    name: "Reusable Produce Bags",
    price: 15.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1610419787401-5297d2c4756b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    link: "https://example.com/reusable-produce-bags",
    category: "Kitchen",
    tags: ["zero-waste", "reusable", "plastic-free"]
  },
  {
    id: 3,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    link: "https://example.com/steel-water-bottle",
    category: "On the Go",
    tags: ["plastic-free", "reusable", "sustainable materials"]
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    link: "https://example.com/organic-cotton-tshirt",
    category: "Clothing",
    tags: ["organic", "ethical", "sustainable materials"]
  },
  {
    id: 5,
    name: "Solar Power Bank",
    price: 45.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    link: "https://example.com/solar-power-bank",
    category: "Electronics",
    tags: ["renewable energy", "sustainable tech", "energy-efficient"]
  },
  {
    id: 6,
    name: "Compostable Phone Case",
    price: 19.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1604937455095-ef2fe3d46fcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    link: "https://example.com/compostable-phone-case",
    category: "Electronics",
    tags: ["biodegradable", "plastic-free", "sustainable materials"]
  }
];

const categories = ["All", "Personal Care", "Kitchen", "On the Go", "Clothing", "Electronics"];

const ProductRecommendations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredProducts = ecoProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-eco-800 dark:text-eco-100">Eco-Friendly Products</h2>
          <p className="mt-2 text-eco-600 dark:text-eco-300">Discover sustainable alternatives for everyday items</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-eco-400" />
            </div>
            <Input
              type="text"
              placeholder="Search for eco-friendly products"
              className="pl-10 eco-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-eco-200 text-eco-700 hover:bg-eco-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </Button>
            
            <Button className="eco-button-primary">
              <ShoppingBag className="h-5 w-5 mr-2" />
              <span>Browse All</span>
            </Button>
          </div>
        </div>
        
        {showFilters && (
          <div className="mb-6 p-4 bg-eco-50 dark:bg-eco-900/30 rounded-lg">
            <h3 className="text-sm font-medium text-eco-800 dark:text-eco-200 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedCategory === category 
                      ? 'bg-eco-500 hover:bg-eco-600' 
                      : 'text-eco-700 dark:text-eco-300 hover:bg-eco-200 dark:hover:bg-eco-800'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="eco-card overflow-hidden flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className="text-xs bg-eco-50 text-eco-700 border-eco-200">
                        {product.category}
                      </Badge>
                      <h3 className="mt-2 text-lg font-semibold text-eco-800 dark:text-eco-100">{product.name}</h3>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-earth-100 text-earth-800">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mt-auto flex justify-between items-center">
                    <span className="text-lg font-bold text-eco-700 dark:text-eco-300">${product.price}</span>
                    <a 
                      href={product.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center text-eco-600 hover:text-eco-800 dark:text-eco-400 dark:hover:text-eco-200 font-medium text-sm"
                    >
                      View Product
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 mx-auto text-eco-300" />
            <h3 className="mt-4 text-lg font-medium text-eco-800 dark:text-eco-100">No products found</h3>
            <p className="mt-1 text-eco-600 dark:text-eco-300">Try adjusting your search or filters</p>
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-sm text-eco-600 dark:text-eco-300">
            These are example products. In a full implementation, we would integrate with real sustainable product APIs or marketplaces.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;
