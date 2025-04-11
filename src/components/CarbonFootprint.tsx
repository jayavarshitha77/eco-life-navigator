
import React, { useState } from 'react';
import { Car, Home, Plane, ShoppingBag, Info } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const CarbonFootprint = () => {
  const [activeTab, setActiveTab] = useState("transportation");
  const [transportationData, setTransportationData] = useState({
    carMiles: 20,
    publicTransport: 10,
    flights: 2
  });
  const [homeData, setHomeData] = useState({
    electricity: 500,
    heating: 300,
    waterUsage: 100
  });
  const [lifestyleData, setLifestyleData] = useState({
    meatConsumption: 5,
    shoppingFrequency: 3,
    wasteGeneration: 10
  });
  
  const [footprintResult, setFootprintResult] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const calculateFootprint = () => {
    // Simple calculation for demo purposes
    const transportationFootprint = (transportationData.carMiles * 0.4) + 
                                  (transportationData.publicTransport * 0.2) + 
                                  (transportationData.flights * 1.5);
    
    const homeFootprint = (homeData.electricity * 0.01) + 
                        (homeData.heating * 0.015) + 
                        (homeData.waterUsage * 0.005);
    
    const lifestyleFootprint = (lifestyleData.meatConsumption * 0.5) + 
                             (lifestyleData.shoppingFrequency * 0.3) + 
                             (lifestyleData.wasteGeneration * 0.2);
    
    const totalFootprint = transportationFootprint + homeFootprint + lifestyleFootprint;
    setFootprintResult(parseFloat(totalFootprint.toFixed(2)));
    
    generateSuggestions(transportationFootprint, homeFootprint, lifestyleFootprint);
    
    toast({
      title: "Carbon Footprint Calculated",
      description: `Your estimated carbon footprint is ${totalFootprint.toFixed(2)} tons of CO2 per year.`
    });
  };

  const generateSuggestions = (transportation: number, home: number, lifestyle: number) => {
    const suggestions = [];
    
    // Transportation suggestions
    if (transportationData.carMiles > 15) {
      suggestions.push("Consider carpooling or switching to a hybrid/electric vehicle to reduce emissions from driving.");
    }
    if (transportationData.flights > 1) {
      suggestions.push("Reduce air travel when possible or purchase carbon offsets for your flights.");
    }
    
    // Home suggestions
    if (homeData.electricity > 400) {
      suggestions.push("Switch to energy-efficient appliances and LED bulbs to reduce electricity consumption.");
    }
    if (homeData.heating > 250) {
      suggestions.push("Improve home insulation to reduce heating needs and consider a programmable thermostat.");
    }
    
    // Lifestyle suggestions
    if (lifestyleData.meatConsumption > 3) {
      suggestions.push("Try incorporating more plant-based meals into your diet to reduce emissions from meat production.");
    }
    if (lifestyleData.shoppingFrequency > 2) {
      suggestions.push("Practice mindful consumption by buying less and choosing quality items that last longer.");
    }
    if (lifestyleData.wasteGeneration > 7) {
      suggestions.push("Start composting food waste and increase recycling efforts to reduce landfill waste.");
    }
    
    setSuggestions(suggestions);
  };

  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-eco-800 dark:text-eco-100">Carbon Footprint Calculator</h2>
          <p className="mt-2 text-eco-600 dark:text-eco-300">Track and reduce your environmental impact</p>
        </div>
        
        <Card className="eco-card p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="transportation" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                <span>Transportation</span>
              </TabsTrigger>
              <TabsTrigger value="home" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Lifestyle</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="transportation" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Car miles per week: {transportationData.carMiles}</label>
                  </div>
                  <Slider 
                    value={[transportationData.carMiles]} 
                    min={0} 
                    max={500} 
                    step={5} 
                    onValueChange={(value) => setTransportationData({...transportationData, carMiles: value[0]})}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Public transport trips per week: {transportationData.publicTransport}</label>
                  </div>
                  <Slider 
                    value={[transportationData.publicTransport]} 
                    min={0} 
                    max={50} 
                    step={1} 
                    onValueChange={(value) => setTransportationData({...transportationData, publicTransport: value[0]})}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Flights per year: {transportationData.flights}</label>
                  </div>
                  <Slider 
                    value={[transportationData.flights]} 
                    min={0} 
                    max={20} 
                    step={1} 
                    onValueChange={(value) => setTransportationData({...transportationData, flights: value[0]})}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="home" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Electricity usage (kWh/month): {homeData.electricity}</label>
                  </div>
                  <Slider 
                    value={[homeData.electricity]} 
                    min={0} 
                    max={1500} 
                    step={50} 
                    onValueChange={(value) => setHomeData({...homeData, electricity: value[0]})}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Heating usage (kWh/month): {homeData.heating}</label>
                  </div>
                  <Slider 
                    value={[homeData.heating]} 
                    min={0} 
                    max={1000} 
                    step={50} 
                    onValueChange={(value) => setHomeData({...homeData, heating: value[0]})}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Water usage (gallons/day): {homeData.waterUsage}</label>
                  </div>
                  <Slider 
                    value={[homeData.waterUsage]} 
                    min={0} 
                    max={300} 
                    step={10} 
                    onValueChange={(value) => setHomeData({...homeData, waterUsage: value[0]})}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="lifestyle" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Meat consumption (meals/week): {lifestyleData.meatConsumption}</label>
                  </div>
                  <Slider 
                    value={[lifestyleData.meatConsumption]} 
                    min={0} 
                    max={21} 
                    step={1} 
                    onValueChange={(value) => setLifestyleData({...lifestyleData, meatConsumption: value[0]})}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Shopping frequency (times/month): {lifestyleData.shoppingFrequency}</label>
                  </div>
                  <Slider 
                    value={[lifestyleData.shoppingFrequency]} 
                    min={0} 
                    max={20} 
                    step={1} 
                    onValueChange={(value) => setLifestyleData({...lifestyleData, shoppingFrequency: value[0]})}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Waste generation (lbs/week): {lifestyleData.wasteGeneration}</label>
                  </div>
                  <Slider 
                    value={[lifestyleData.wasteGeneration]} 
                    min={0} 
                    max={50} 
                    step={1} 
                    onValueChange={(value) => setLifestyleData({...lifestyleData, wasteGeneration: value[0]})}
                  />
                </div>
              </div>
            </TabsContent>
            
            <div className="mt-6">
              <Button onClick={calculateFootprint} className="w-full eco-button-primary">
                Calculate My Footprint
              </Button>
            </div>
          </Tabs>
          
          {footprintResult !== null && (
            <div className="mt-8">
              <div className="bg-eco-50 dark:bg-eco-800/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-eco-800 dark:text-eco-100 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-eco-500" />
                  Your Carbon Footprint
                </h3>
                <p className="text-3xl font-bold text-eco-600 dark:text-eco-300 mt-2">{footprintResult} <span className="text-xl">tons of CO2/year</span></p>
                
                {/* Simple gauge visualization */}
                <div className="mt-4 bg-gray-200 dark:bg-eco-900 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${
                      footprintResult < 8 
                        ? 'bg-green-500' 
                        : footprintResult < 16 
                          ? 'bg-yellow-500' 
                          : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((footprintResult / 25) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-eco-600 dark:text-eco-300">
                  <span>Low Impact</span>
                  <span>Average</span>
                  <span>High Impact</span>
                </div>
              </div>
              
              {suggestions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-eco-800 dark:text-eco-100 mb-3">Recommendations to Reduce Your Footprint:</h3>
                  <ul className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-eco-100 dark:bg-eco-700 text-eco-800 dark:text-eco-100 p-1 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-eco-700 dark:text-eco-200">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CarbonFootprint;
