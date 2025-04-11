
import React, { useState } from 'react';
import { Trash2, Recycle, BarChart3, ArrowRight, Plus, Minus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

const wasteTypes = [
  { id: 'plastic', name: 'Plastic', icon: '🥤', color: 'bg-blue-500', tips: [
    "Avoid single-use plastics like straws and cups",
    "Use reusable shopping bags",
    "Choose products with minimal plastic packaging",
    "Consider starting a plastic-free challenge"
  ]},
  { id: 'paper', name: 'Paper', icon: '📄', color: 'bg-yellow-500', tips: [
    "Go digital with bills and documents",
    "Use both sides of paper when printing",
    "Recycle paper and cardboard properly",
    "Buy recycled paper products"
  ]},
  { id: 'food', name: 'Food Waste', icon: '🍎', color: 'bg-green-500', tips: [
    "Plan meals to reduce food waste",
    "Start composting food scraps",
    "Learn proper food storage techniques",
    "Use leftovers creatively in new meals"
  ]},
  { id: 'glass', name: 'Glass', icon: '🍶', color: 'bg-purple-500', tips: [
    "Reuse glass jars for storage",
    "Recycle glass bottles properly",
    "Choose glass over plastic when possible",
    "Buy beverages in returnable glass bottles"
  ]},
  { id: 'metal', name: 'Metal', icon: '🥫', color: 'bg-gray-500', tips: [
    "Rinse cans before recycling",
    "Separate different types of metals",
    "Donate unwanted metal items instead of trashing",
    "Use a reusable water bottle instead of canned drinks"
  ]},
  { id: 'electronics', name: 'Electronics', icon: '📱', color: 'bg-red-500', tips: [
    "Repair devices instead of replacing when possible",
    "Donate working electronics you no longer need",
    "Use e-waste recycling programs for broken items",
    "Buy refurbished electronics instead of new"
  ]}
];

const WasteManagement = () => {
  const [userData, setUserData] = useState({
    plastic: 0,
    paper: 0,
    food: 0,
    glass: 0,
    metal: 0,
    electronics: 0
  });
  const [activeTab, setActiveTab] = useState('tracker');
  
  const totalWaste = Object.values(userData).reduce((sum, value) => sum + value, 0);
  
  const handleInputChange = (wasteType: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setUserData({
      ...userData,
      [wasteType]: Math.max(0, numValue) // Ensure we don't have negative values
    });
  };
  
  const incrementWaste = (wasteType: string) => {
    setUserData({
      ...userData,
      [wasteType]: userData[wasteType as keyof typeof userData] + 1
    });
  };
  
  const decrementWaste = (wasteType: string) => {
    setUserData({
      ...userData,
      [wasteType]: Math.max(0, userData[wasteType as keyof typeof userData] - 1)
    });
  };
  
  const calculateRecyclingImpact = () => {
    if (totalWaste === 0) {
      toast({
        title: "No waste data entered",
        description: "Please enter some waste data to calculate impact.",
        variant: "destructive"
      });
      return;
    }
    
    // Simple impact calculation
    const treesEquivalent = (userData.paper / 5).toFixed(1);
    const waterSaved = (totalWaste * 3.7).toFixed(1);
    const CO2Reduced = (totalWaste * 2.5).toFixed(1);
    
    toast({
      title: "Recycling Impact Calculated",
      description: `Properly recycling your waste could save approximately ${treesEquivalent} trees, ${waterSaved} gallons of water, and reduce CO2 emissions by ${CO2Reduced} kg.`
    });
    
    setActiveTab('tips');
  };
  
  const getTopWasteTypes = () => {
    const sortedWaste = Object.entries(userData)
      .map(([key, value]) => ({ type: key, amount: value }))
      .sort((a, b) => b.amount - a.amount)
      .filter(item => item.amount > 0)
      .slice(0, 3);
      
    return sortedWaste.map(item => item.type);
  };

  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-eco-800 dark:text-eco-100">Waste Management Advisor</h2>
          <p className="mt-2 text-eco-600 dark:text-eco-300">Track your waste and get personalized tips for reduction</p>
        </div>
        
        <Card className="eco-card">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="tracker" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span>Waste Tracker</span>
              </TabsTrigger>
              <TabsTrigger value="tips" className="flex items-center gap-2">
                <Recycle className="h-4 w-4" />
                <span>Reduction Tips</span>
              </TabsTrigger>
            </TabsList>
            
            <CardContent>
              <TabsContent value="tracker">
                <div className="space-y-6">
                  <div className="bg-eco-50 dark:bg-eco-800/30 p-4 rounded-lg">
                    <p className="text-sm text-eco-700 dark:text-eco-300">
                      Track your waste production by entering the approximate pounds per week for each category.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wasteTypes.map((waste) => (
                      <div key={waste.id} className="border border-eco-100 dark:border-eco-800 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl mr-2" aria-hidden="true">{waste.icon}</span>
                          <h3 className="font-medium text-eco-800 dark:text-eco-100">{waste.name}</h3>
                        </div>
                        
                        <div className="flex items-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => decrementWaste(waste.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          
                          <Input
                            type="number"
                            min="0"
                            value={userData[waste.id as keyof typeof userData]}
                            onChange={(e) => handleInputChange(waste.id, e.target.value)}
                            className="mx-2 text-center eco-input h-9"
                          />
                          
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => incrementWaste(waste.id)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          
                          <span className="ml-2 text-eco-600 dark:text-eco-300 text-sm">lbs/week</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-eco-800 dark:text-eco-100 mb-3">Your Waste Distribution</h3>
                    
                    {totalWaste > 0 ? (
                      <div className="space-y-3">
                        {wasteTypes.map((waste) => {
                          const percentage = totalWaste > 0 
                            ? (userData[waste.id as keyof typeof userData] / totalWaste) * 100 
                            : 0;
                            
                          return (
                            <div key={waste.id}>
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                  <span className="text-sm mr-1" aria-hidden="true">{waste.icon}</span>
                                  <span className="text-sm text-eco-700 dark:text-eco-300">{waste.name}</span>
                                </div>
                                <span className="text-sm font-medium text-eco-700 dark:text-eco-300">
                                  {userData[waste.id as keyof typeof userData]} lbs ({percentage.toFixed(1)}%)
                                </span>
                              </div>
                              <Progress value={percentage} className={waste.color} />
                            </div>
                          );
                        })}
                        
                        <div className="pt-4 mt-4 border-t border-eco-100 dark:border-eco-800">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-eco-800 dark:text-eco-100">Total Waste:</span>
                            <span className="font-bold text-eco-700 dark:text-eco-300">{totalWaste} lbs/week</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <Trash2 className="h-12 w-12 mx-auto text-eco-300" />
                        <p className="mt-2 text-eco-600 dark:text-eco-300">Enter your waste data above to see the distribution</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <Button onClick={calculateRecyclingImpact} className="w-full eco-button-primary">
                      Get Personalized Reduction Tips
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="tips">
                <div className="space-y-6">
                  {totalWaste > 0 ? (
                    <>
                      <div className="bg-eco-500/10 dark:bg-eco-800/30 p-4 rounded-lg">
                        <h3 className="font-medium text-eco-800 dark:text-eco-100 mb-2">Your Waste Analysis</h3>
                        <p className="text-sm text-eco-700 dark:text-eco-300">
                          Based on your input, you produce approximately <strong>{totalWaste} lbs</strong> of waste per week. 
                          Here are some targeted tips to help you reduce your waste footprint:
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {getTopWasteTypes().map((wasteType) => {
                          const waste = wasteTypes.find(w => w.id === wasteType);
                          if (!waste) return null;
                          
                          return (
                            <div key={waste.id} className="border border-eco-100 dark:border-eco-800 rounded-lg overflow-hidden">
                              <div className={`${waste.color} px-4 py-3 flex items-center`}>
                                <span className="text-xl mr-2 text-white" aria-hidden="true">{waste.icon}</span>
                                <h3 className="font-medium text-white">{waste.name} Reduction Tips</h3>
                              </div>
                              
                              <div className="p-4">
                                <ul className="space-y-2">
                                  {waste.tips.map((tip, index) => (
                                    <li key={index} className="flex items-start">
                                      <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="text-eco-700 dark:text-eco-300">{tip}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <h3 className="font-medium text-eco-800 dark:text-eco-100 mb-3">General Waste Reduction Strategies</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="eco-card p-4">
                            <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">The 5 Rs of Waste Management</h4>
                            <ul className="space-y-2">
                              <li className="flex items-start">
                                <span className="font-bold text-eco-500 mr-2">1. Refuse</span>
                                <span className="text-sm text-eco-600 dark:text-eco-400">Say no to single-use items and unnecessary purchases</span>
                              </li>
                              <li className="flex items-start">
                                <span className="font-bold text-eco-500 mr-2">2. Reduce</span>
                                <span className="text-sm text-eco-600 dark:text-eco-400">Minimize waste by consuming less</span>
                              </li>
                              <li className="flex items-start">
                                <span className="font-bold text-eco-500 mr-2">3. Reuse</span>
                                <span className="text-sm text-eco-600 dark:text-eco-400">Find new uses for items before discarding</span>
                              </li>
                              <li className="flex items-start">
                                <span className="font-bold text-eco-500 mr-2">4. Repurpose</span>
                                <span className="text-sm text-eco-600 dark:text-eco-400">Transform items for different functions</span>
                              </li>
                              <li className="flex items-start">
                                <span className="font-bold text-eco-500 mr-2">5. Recycle</span>
                                <span className="text-sm text-eco-600 dark:text-eco-400">Process materials into new products</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="eco-card p-4">
                            <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Getting Started</h4>
                            <ul className="space-y-2 text-sm text-eco-600 dark:text-eco-400">
                              <li>• Conduct a waste audit at home to identify major sources</li>
                              <li>• Use reusable containers, bags, and bottles</li>
                              <li>• Start composting food scraps and yard waste</li>
                              <li>• Buy products with minimal or recyclable packaging</li>
                              <li>• Learn about local recycling programs and guidelines</li>
                              <li>• Consider a 30-day zero-waste challenge</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button onClick={() => setActiveTab('tracker')} className="w-full eco-button-primary">
                          Back to Waste Tracker
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-12">
                      <Recycle className="h-12 w-12 mx-auto text-eco-300" />
                      <h3 className="mt-4 text-lg font-medium text-eco-800 dark:text-eco-100">No waste data entered</h3>
                      <p className="mt-1 text-eco-600 dark:text-eco-300 mb-6">Enter your waste production to receive personalized tips</p>
                      <Button onClick={() => setActiveTab('tracker')} className="eco-button-primary">
                        Go to Waste Tracker
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default WasteManagement;
