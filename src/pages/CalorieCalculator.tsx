
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Utensils, Leaf, Calculator, Search, Apple, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Food database with carbon footprint data
interface FoodItem {
  name: string;
  calories: number;
  carbonFootprint: number; // CO2e in kg per portion
  category: string;
  origin: string;
  sustainabilityTip: string;
}

const foodDatabase: FoodItem[] = [
  // Vegetables
  { name: 'Carrots (100g)', calories: 41, carbonFootprint: 0.05, category: 'Vegetables', origin: 'Local', sustainabilityTip: 'Root vegetables have a low carbon footprint and store well.' },
  { name: 'Broccoli (100g)', calories: 34, carbonFootprint: 0.12, category: 'Vegetables', origin: 'Local', sustainabilityTip: 'Seasonal broccoli has a much lower footprint than imported varieties.' },
  { name: 'Tomatoes (100g)', calories: 18, carbonFootprint: 0.18, category: 'Vegetables', origin: 'Local', sustainabilityTip: 'Local, seasonal tomatoes have a significantly lower footprint than greenhouse-grown.' },
  { name: 'Spinach (100g)', calories: 23, carbonFootprint: 0.11, category: 'Vegetables', origin: 'Local', sustainabilityTip: 'Spinach grows quickly and requires minimal resources.' },
  { name: 'Potatoes (100g)', calories: 77, carbonFootprint: 0.06, category: 'Vegetables', origin: 'Local', sustainabilityTip: 'Potatoes are one of the most resource-efficient foods to grow.' },

  // Fruits
  { name: 'Apples (1 medium)', calories: 95, carbonFootprint: 0.08, category: 'Fruits', origin: 'Local', sustainabilityTip: 'Local, seasonal apples have a very low carbon footprint.' },
  { name: 'Bananas (1 medium)', calories: 105, carbonFootprint: 0.12, category: 'Fruits', origin: 'Imported', sustainabilityTip: 'Though imported, bananas are shipped rather than flown, keeping their footprint relatively low.' },
  { name: 'Strawberries (100g)', calories: 32, carbonFootprint: 0.15, category: 'Fruits', origin: 'Local Seasonal', sustainabilityTip: 'Only eat strawberries when in season locally.' },
  { name: 'Oranges (1 medium)', calories: 62, carbonFootprint: 0.11, category: 'Fruits', origin: 'Regional', sustainabilityTip: "Oranges ship well and don't require refrigeration during transport." },
  { name: 'Avocado (1/2 fruit)', calories: 120, carbonFootprint: 0.28, category: 'Fruits', origin: 'Imported', sustainabilityTip: 'Avocados are water-intensive; enjoy occasionally rather than daily.' },

  // Grains
  { name: 'Rice, white (100g cooked)', calories: 130, carbonFootprint: 0.24, category: 'Grains', origin: 'Various', sustainabilityTip: 'Rice production is methane-intensive. Try other grains like quinoa or millet occasionally.' },
  { name: 'Bread, whole wheat (1 slice)', calories: 81, carbonFootprint: 0.09, category: 'Grains', origin: 'Local', sustainabilityTip: 'Whole grains require less processing, saving energy.' },
  { name: 'Pasta (100g cooked)', calories: 131, carbonFootprint: 0.15, category: 'Grains', origin: 'Regional', sustainabilityTip: 'Dried pasta stores well and has a relatively low footprint.' },
  { name: 'Quinoa (100g cooked)', calories: 120, carbonFootprint: 0.13, category: 'Grains', origin: 'Imported', sustainabilityTip: 'Though imported, quinoa is resource-efficient in its growing regions.' },
  { name: 'Oats (100g cooked)', calories: 71, carbonFootprint: 0.08, category: 'Grains', origin: 'Regional', sustainabilityTip: 'Oats require minimal processing and have a low environmental impact.' },

  // Proteins
  { name: 'Chicken breast (100g)', calories: 165, carbonFootprint: 0.78, category: 'Proteins', origin: 'Regional', sustainabilityTip: 'Choose free-range, organic chicken for better welfare and typically lower environmental impact.' },
  { name: 'Beef (100g)', calories: 250, carbonFootprint: 6.0, category: 'Proteins', origin: 'Regional', sustainabilityTip: 'Beef has one of the highest carbon footprints; consider reducing consumption.' },
  { name: 'Eggs (1 large)', calories: 72, carbonFootprint: 0.2, category: 'Proteins', origin: 'Local', sustainabilityTip: 'Free-range eggs from local farms have a much lower footprint than factory-farmed.' },
  { name: 'Tofu (100g)', calories: 76, carbonFootprint: 0.16, category: 'Proteins', origin: 'Regional', sustainabilityTip: 'Plant proteins like tofu have a much lower footprint than animal proteins.' },
  { name: 'Lentils (100g cooked)', calories: 116, carbonFootprint: 0.08, category: 'Proteins', origin: 'Regional', sustainabilityTip: 'Lentils and other legumes fix nitrogen in soil, reducing the need for fertilizers.' },
  { name: 'Salmon (100g)', calories: 206, carbonFootprint: 1.3, category: 'Proteins', origin: 'Various', sustainabilityTip: 'Choose sustainably certified wild or responsibly farmed salmon.' },
  { name: 'Black beans (100g cooked)', calories: 132, carbonFootprint: 0.11, category: 'Proteins', origin: 'Regional', sustainabilityTip: 'Beans are a climate-friendly protein source that also improves soil health.' },

  // Dairy
  { name: 'Milk, cow (250ml)', calories: 122, carbonFootprint: 0.55, category: 'Dairy', origin: 'Regional', sustainabilityTip: 'Consider trying plant-based milk alternatives with lower environmental impacts.' },
  { name: 'Cheese, cheddar (30g)', calories: 120, carbonFootprint: 0.98, category: 'Dairy', origin: 'Regional', sustainabilityTip: 'Cheese has a high carbon footprint; enjoy in moderation.' },
  { name: 'Yogurt (150g pot)', calories: 150, carbonFootprint: 0.36, category: 'Dairy', origin: 'Regional', sustainabilityTip: 'Plain yogurt has a lower footprint than flavored varieties.' },

  // Processed Foods
  { name: 'Chocolate (50g bar)', calories: 270, carbonFootprint: 0.58, category: 'Processed Foods', origin: 'Imported', sustainabilityTip: 'Choose fair trade, organic chocolate with higher cocoa content.' },
  { name: 'Potato chips (50g)', calories: 260, carbonFootprint: 0.32, category: 'Processed Foods', origin: 'Regional', sustainabilityTip: 'Highly processed snacks require more energy to produce; enjoy occasionally.' },
  { name: 'Pizza (1 slice)', calories: 285, carbonFootprint: 0.89, category: 'Processed Foods', origin: 'Regional', sustainabilityTip: 'Vegetable toppings have a lower impact than meat toppings.' },

  // Beverages
  { name: 'Coffee (1 cup)', calories: 2, carbonFootprint: 0.21, category: 'Beverages', origin: 'Imported', sustainabilityTip: 'Choose shade-grown, fair trade coffee and use a reusable cup.' },
  { name: 'Beer (330ml)', calories: 155, carbonFootprint: 0.33, category: 'Beverages', origin: 'Regional', sustainabilityTip: 'Local craft beers often have lower transportation footprints.' },
  { name: 'Wine (175ml glass)', calories: 150, carbonFootprint: 0.56, category: 'Beverages', origin: 'Various', sustainabilityTip: 'Boxed wine actually has a lower carbon footprint than bottled due to packaging and transportation efficiency.' },
  { name: 'Apple Juice (250ml)', calories: 115, carbonFootprint: 0.25, category: 'Beverages', origin: 'Regional', sustainabilityTip: 'Whole fruits have a lower footprint than juices, which require more processing.' },
  { name: 'Soda (330ml can)', calories: 139, carbonFootprint: 0.31, category: 'Beverages', origin: 'Regional', sustainabilityTip: 'The aluminum can has a high production footprint; choose glass bottles or better yet, drink water.' }
];

// Traditional/regional foods
const regionalFoods: Record<string, FoodItem[]> = {
  'north america': [
    { name: 'Corn on the cob (1 ear)', calories: 123, carbonFootprint: 0.11, category: 'Vegetables', origin: 'North America', sustainabilityTip: 'Native to the Americas, corn is a traditionally sustainable crop when grown in polyculture.' },
    { name: 'Wild rice (100g cooked)', calories: 101, carbonFootprint: 0.10, category: 'Grains', origin: 'North America', sustainabilityTip: 'Traditional wild rice is often harvested sustainably by indigenous communities.' },
    { name: 'Maple syrup (1 tbsp)', calories: 52, carbonFootprint: 0.13, category: 'Sweeteners', origin: 'North America', sustainabilityTip: 'Traditional maple tapping is sustainable and supports forest conservation.' }
  ],
  'mexico': [
    { name: 'Corn tortilla (1)', calories: 65, carbonFootprint: 0.08, category: 'Grains', origin: 'Mexico', sustainabilityTip: 'Traditional nixtamalization process makes corn more nutritious and is energy efficient.' },
    { name: 'Nopales/Cactus (100g)', calories: 16, carbonFootprint: 0.07, category: 'Vegetables', origin: 'Mexico', sustainabilityTip: 'Cacti are drought-resistant and perfectly adapted to arid regions.' },
    { name: 'Black beans (100g)', calories: 132, carbonFootprint: 0.11, category: 'Proteins', origin: 'Mexico', sustainabilityTip: 'Traditional milpa farming combines beans, corn, and squash for sustainable agriculture.' }
  ],
  'india': [
    { name: 'Lentil dal (100g)', calories: 116, carbonFootprint: 0.09, category: 'Proteins', origin: 'India', sustainabilityTip: 'Lentils are a cornerstone of sustainable Indian cuisine.' },
    { name: 'Chapati/Roti (1)', calories: 85, carbonFootprint: 0.08, category: 'Grains', origin: 'India', sustainabilityTip: 'Simple flatbreads require minimal processing and can be made with regional grains.' },
    { name: 'Okra/Bhindi (100g)', calories: 33, carbonFootprint: 0.11, category: 'Vegetables', origin: 'India', sustainabilityTip: 'Okra is well-adapted to hot climates and requires relatively little water.' }
  ],
  'china': [
    { name: 'Bok choy (100g)', calories: 13, carbonFootprint: 0.06, category: 'Vegetables', origin: 'China', sustainabilityTip: 'Fast-growing leafy greens have a very low environmental footprint.' },
    { name: 'Tofu (100g)', calories: 76, carbonFootprint: 0.16, category: 'Proteins', origin: 'China', sustainabilityTip: 'Traditional plant protein that has sustained populations for centuries.' },
    { name: 'Millet porridge (100g)', calories: 119, carbonFootprint: 0.09, category: 'Grains', origin: 'China', sustainabilityTip: 'Drought-resistant traditional grain that needs minimal irrigation.' }
  ],
  'mediterranean': [
    { name: 'Olive oil (1 tbsp)', calories: 119, carbonFootprint: 0.15, category: 'Oils', origin: 'Mediterranean', sustainabilityTip: 'Olive trees are drought-resistant and can thrive for centuries.' },
    { name: 'Chickpeas (100g cooked)', calories: 164, carbonFootprint: 0.12, category: 'Proteins', origin: 'Mediterranean', sustainabilityTip: 'Legumes like chickpeas improve soil health by fixing nitrogen.' },
    { name: 'Figs (2 medium)', calories: 74, carbonFootprint: 0.13, category: 'Fruits', origin: 'Mediterranean', sustainabilityTip: 'Fig trees are well-adapted to dry Mediterranean climates.' }
  ],
  'japan': [
    { name: 'Miso paste (1 tbsp)', calories: 34, carbonFootprint: 0.09, category: 'Fermented Foods', origin: 'Japan', sustainabilityTip: 'Fermentation is a traditional preservation method that reduces food waste.' },
    { name: 'Seaweed/Nori (10g)', calories: 4, carbonFootprint: 0.04, category: 'Sea Vegetables', origin: 'Japan', sustainabilityTip: 'Seaweed requires no land, fresh water, or fertilizer to grow.' },
    { name: 'Sweet potato (100g)', calories: 86, carbonFootprint: 0.08, category: 'Vegetables', origin: 'Japan', sustainabilityTip: 'Japanese sweet potatoes are nutrient-dense and grow well in various soils.' }
  ],
  'west africa': [
    { name: 'Millet (100g cooked)', calories: 119, carbonFootprint: 0.09, category: 'Grains', origin: 'West Africa', sustainabilityTip: 'Drought-resistant grain traditional to arid regions of Africa.' },
    { name: 'Cassava (100g)', calories: 160, carbonFootprint: 0.12, category: 'Vegetables', origin: 'West Africa', sustainabilityTip: 'Efficient crop that produces high calories with limited inputs.' },
    { name: 'Peanut stew (1 cup)', calories: 290, carbonFootprint: 0.32, category: 'Mixed Dishes', origin: 'West Africa', sustainabilityTip: 'Traditional one-pot dishes are fuel-efficient and nutritionally complete.' }
  ],
  'brazil': [
    { name: 'Açaí bowl (200g)', calories: 210, carbonFootprint: 0.38, category: 'Fruits', origin: 'Brazil', sustainabilityTip: 'Wild-harvested açaí supports forest conservation in the Amazon.' },
    { name: 'Black beans (100g)', calories: 132, carbonFootprint: 0.11, category: 'Proteins', origin: 'Brazil', sustainabilityTip: 'Staple protein source in Brazilian cuisine with a low carbon footprint.' },
    { name: 'Cassava flour (100g)', calories: 360, carbonFootprint: 0.14, category: 'Grains', origin: 'Brazil', sustainabilityTip: 'Traditional cassava processing methods are energy-efficient.' }
  ]
};

interface MealItem {
  food: FoodItem;
  quantity: number;
}

const CalorieCalculator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [region, setRegion] = useState('');
  const [regionalFoodOptions, setRegionalFoodOptions] = useState<FoodItem[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<MealItem[]>([]);
  const [mealName, setMealName] = useState('My Meal');
  const { toast } = useToast();

  const handleSearch = () => {
    if (searchTerm.length < 2) {
      toast({
        title: "Search Term Too Short",
        description: "Please enter at least 2 characters to search.",
        variant: "destructive"
      });
      return;
    }

    const results = foodDatabase.filter(food => 
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    
    if (results.length === 0) {
      toast({
        title: "No Results Found",
        description: "Try a different search term or check spelling.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Search Results",
        description: `Found ${results.length} food items.`,
      });
    }
  };

  const handleRegionSearch = () => {
    if (!region) {
      toast({
        title: "Input Required",
        description: "Please enter a region to find traditional foods.",
        variant: "destructive"
      });
      return;
    }

    // Find closest matching region
    const regionKey = Object.keys(regionalFoods).find(key => 
      region.toLowerCase().includes(key) || key.includes(region.toLowerCase())
    );

    if (regionKey) {
      setRegionalFoodOptions(regionalFoods[regionKey]);
      toast({
        title: "Regional Foods Found",
        description: `Showing traditional foods from ${regionKey}.`,
      });
    } else {
      setRegionalFoodOptions([]);
      toast({
        title: "Region Not Found",
        description: "We couldn't find specific foods for your region. Try entering a country or continental region.",
        variant: "destructive"
      });
    }
  };

  const addToMeal = (food: FoodItem) => {
    const existingItemIndex = selectedMeal.findIndex(item => item.food.name === food.name);
    
    if (existingItemIndex !== -1) {
      // Item already exists, update quantity
      const updatedMeal = [...selectedMeal];
      updatedMeal[existingItemIndex].quantity += 1;
      setSelectedMeal(updatedMeal);
    } else {
      // Add new item
      setSelectedMeal([...selectedMeal, { food, quantity: 1 }]);
    }
    
    toast({
      title: "Added to Meal",
      description: `${food.name} added to your meal calculation.`,
    });
  };

  const removeFromMeal = (index: number) => {
    const updatedMeal = [...selectedMeal];
    updatedMeal.splice(index, 1);
    setSelectedMeal(updatedMeal);
    
    toast({
      title: "Removed from Meal",
      description: `Item removed from your meal calculation.`,
    });
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedMeal = [...selectedMeal];
    updatedMeal[index].quantity = newQuantity;
    setSelectedMeal(updatedMeal);
  };

  const clearMeal = () => {
    setSelectedMeal([]);
    setMealName('My Meal');
    toast({
      title: "Meal Cleared",
      description: "Your meal calculation has been reset.",
    });
  };

  // Calculate totals
  const totalCalories = selectedMeal.reduce((sum, item) => sum + (item.food.calories * item.quantity), 0);
  const totalCarbon = selectedMeal.reduce((sum, item) => sum + (item.food.carbonFootprint * item.quantity), 0);

  // Carbon footprint assessment
  const getCarbonAssessment = () => {
    if (totalCarbon === 0) return { color: 'text-gray-500', message: "Add foods to see your meal's carbon footprint" };
    
    if (totalCarbon < 0.5) {
      return { color: 'text-green-600', message: 'Very Low Impact - Excellent eco-friendly meal choice!' };
    } else if (totalCarbon < 1) {
      return { color: 'text-green-500', message: 'Low Impact - Great sustainable food choices!' };
    } else if (totalCarbon < 2) {
      return { color: 'text-yellow-500', message: 'Moderate Impact - Decent meal with room for improvement' };
    } else if (totalCarbon < 4) {
      return { color: 'text-orange-500', message: 'High Impact - Consider reducing animal products' };
    } else {
      return { color: 'text-red-500', message: 'Very High Impact - Contains high-carbon foods like beef' };
    }
  };

  const carbonAssessment = getCarbonAssessment();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-eco-700 mb-4">Sustainable Food Calorie Calculator</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Track the calories and carbon footprint of your meals while discovering sustainable food options from around the world.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              {/* Food Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-6 w-6 text-eco-500" />
                    Find Foods
                  </CardTitle>
                  <CardDescription>
                    Search our database for various food items
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Search for foods..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} className="bg-eco-500 hover:bg-eco-600">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-medium text-eco-700 mb-2">Search Results:</h3>
                      <div className="max-h-64 overflow-y-auto">
                        {searchResults.map((food, index) => (
                          <div key={index} className="flex justify-between items-center p-2 hover:bg-eco-50 rounded-md">
                            <div>
                              <p className="font-medium">{food.name}</p>
                              <div className="text-sm text-gray-600 flex gap-2">
                                <span>{food.calories} cal</span>
                                <span>|</span>
                                <span className={food.carbonFootprint > 1 ? 'text-red-500' : food.carbonFootprint > 0.5 ? 'text-yellow-500' : 'text-green-500'}>
                                  {food.carbonFootprint.toFixed(2)} kg CO₂e
                                </span>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => addToMeal(food)}
                              className="bg-eco-500 hover:bg-eco-600"
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Regional Foods */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-6 w-6 text-eco-500" />
                    Regional Food Finder
                  </CardTitle>
                  <CardDescription>
                    Discover traditional, sustainable foods from different regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Input 
                      placeholder="Enter a region or country..." 
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRegionSearch()}
                    />
                    <Button onClick={handleRegionSearch} className="bg-eco-500 hover:bg-eco-600">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {regionalFoodOptions.length > 0 && (
                    <div>
                      <h3 className="font-medium text-eco-700 mb-2">Traditional Foods:</h3>
                      <div className="space-y-3">
                        {regionalFoodOptions.map((food, index) => (
                          <Card key={index} className="border-eco-100">
                            <CardContent className="p-3">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{food.name}</p>
                                  <div className="text-sm text-gray-600 flex gap-2">
                                    <span>{food.calories} cal</span>
                                    <span>|</span>
                                    <span className="text-green-500">{food.carbonFootprint.toFixed(2)} kg CO₂e</span>
                                  </div>
                                </div>
                                <Button 
                                  size="sm" 
                                  onClick={() => addToMeal(food)}
                                  className="bg-eco-500 hover:bg-eco-600"
                                >
                                  <PlusCircle className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="text-xs text-eco-700 mt-2 italic">
                                <Leaf className="h-3 w-3 inline mr-1" />
                                {food.sustainabilityTip}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Meal Calculator */}
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-6 w-6 text-eco-500" />
                      <Input 
                        value={mealName} 
                        onChange={(e) => setMealName(e.target.value)} 
                        className="border-0 h-auto p-0 text-lg font-bold focus-visible:ring-0"
                      />
                    </CardTitle>
                    <Button variant="outline" size="sm" onClick={clearMeal}>
                      Clear
                    </Button>
                  </div>
                  <CardDescription>
                    Calculate calories and carbon footprint of your meal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedMeal.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Utensils className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Add foods to your meal to see calculations</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="max-h-64 overflow-y-auto">
                        {selectedMeal.map((item, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border-b border-eco-100">
                            <div className="flex-1">
                              <p className="font-medium">{item.food.name}</p>
                              <div className="text-sm text-gray-600 flex gap-2">
                                <span>{item.food.calories * item.quantity} cal</span>
                                <span>|</span>
                                <span className={item.food.carbonFootprint > 1 ? 'text-red-500' : item.food.carbonFootprint > 0.5 ? 'text-yellow-500' : 'text-green-500'}>
                                  {(item.food.carbonFootprint * item.quantity).toFixed(2)} kg CO₂e
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(index, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                              >
                                +
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => removeFromMeal(index)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                ×
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-eco-50 p-4 rounded-lg border border-eco-100">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Total Calories:</span>
                          <span className="font-bold">{totalCalories} cal</span>
                        </div>
                        <div className="flex justify-between mb-4">
                          <span className="font-medium">Carbon Footprint:</span>
                          <span className="font-bold">{totalCarbon.toFixed(2)} kg CO₂e</span>
                        </div>
                        <div className={`text-center p-2 rounded-md ${carbonAssessment.color} bg-white bg-opacity-50`}>
                          {carbonAssessment.message}
                        </div>
                      </div>
                      
                      {totalCarbon > 1 && (
                        <div className="p-3 border border-eco-100 rounded-lg bg-white">
                          <h4 className="font-medium text-eco-700 mb-1">Suggestions to reduce impact:</h4>
                          <ul className="text-sm space-y-1">
                            {selectedMeal.some(item => item.food.category === "Proteins" && item.food.carbonFootprint > 2) && (
                              <li className="flex gap-1">
                                <Leaf className="h-4 w-4 text-eco-500 flex-shrink-0" />
                                <span>Replace high-impact proteins like beef with plant-based options</span>
                              </li>
                            )}
                            {selectedMeal.some(item => item.food.origin === "Imported") && (
                              <li className="flex gap-1">
                                <Leaf className="h-4 w-4 text-eco-500 flex-shrink-0" />
                                <span>Choose local alternatives to imported foods when possible</span>
                              </li>
                            )}
                            {selectedMeal.some(item => item.food.category === "Dairy") && (
                              <li className="flex gap-1">
                                <Leaf className="h-4 w-4 text-eco-500 flex-shrink-0" />
                                <span>Consider reducing dairy consumption or trying plant-based alternatives</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" className="text-eco-600">
                    <Link to="/diet-planner">Get Diet Plan</Link>
                  </Button>
                  <Button className="bg-eco-500 hover:bg-eco-600">
                    Save Meal
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalorieCalculator;
