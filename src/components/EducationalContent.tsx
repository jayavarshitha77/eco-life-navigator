
import React, { useState } from 'react';
import { Recycle, Info, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EducationalContent = () => {
  const [activeTab, setActiveTab] = useState("reduce");
  
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-eco-800 dark:text-eco-100">3Rs Education</h2>
          <p className="mt-2 text-eco-600 dark:text-eco-300">Learn about the principles of Reduce, Reuse, and Recycle</p>
        </div>
        
        <Card className="eco-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Recycle className="h-32 w-32 text-eco-500/20" />
                </div>
                <div className="absolute top-8 left-2 animate-float">
                  <div className="bg-eco-500 text-white rounded-full px-4 py-2 font-bold">Reduce</div>
                </div>
                <div className="absolute top-24 right-2 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="bg-earth-500 text-white rounded-full px-4 py-2 font-bold">Reuse</div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float" style={{ animationDelay: '4s' }}>
                  <div className="bg-blue-500 text-white rounded-full px-4 py-2 font-bold">Recycle</div>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="reduce">Reduce</TabsTrigger>
                <TabsTrigger value="reuse">Reuse</TabsTrigger>
                <TabsTrigger value="recycle">Recycle</TabsTrigger>
              </TabsList>
              
              <TabsContent value="reduce">
                <div className="space-y-6">
                  <div className="bg-eco-500/10 dark:bg-eco-800/30 p-4 rounded-lg">
                    <h3 className="flex items-center text-lg font-semibold text-eco-800 dark:text-eco-100 mb-2">
                      <Info className="h-5 w-5 mr-2 text-eco-500" />
                      Why Reduce?
                    </h3>
                    <p className="text-eco-700 dark:text-eco-300">
                      Reducing is the most effective of the three Rs. It means using fewer resources in the first place and is the most effective way to save natural resources, protect the environment, and save money.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-eco-800 dark:text-eco-100 mb-4">How to Reduce Waste</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">At Home</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Buy only what you need and will use</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Choose products with minimal packaging</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Use reusable cloths instead of paper towels</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Repair items instead of replacing them</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Food Waste</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Plan meals and create shopping lists</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Store food properly to extend freshness</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Use leftovers creatively in new meals</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Shopping</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Bring reusable bags for shopping</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Buy in bulk to reduce packaging</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Choose durable products over disposable ones</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Borrow or rent items you use infrequently</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Energy & Resources</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Turn off lights and electronics when not in use</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Use water-saving fixtures and appliances</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-eco-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Choose energy-efficient appliances</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-eco-600 hover:text-eco-800 border-eco-200"
                      onClick={() => setActiveTab("reuse")}
                    >
                      Next: Reuse
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reuse">
                <div className="space-y-6">
                  <div className="bg-earth-500/10 dark:bg-earth-800/30 p-4 rounded-lg">
                    <h3 className="flex items-center text-lg font-semibold text-eco-800 dark:text-eco-100 mb-2">
                      <Info className="h-5 w-5 mr-2 text-earth-500" />
                      Why Reuse?
                    </h3>
                    <p className="text-eco-700 dark:text-eco-300">
                      Reusing items extends their life cycle, keeping them out of landfills longer and reducing the need for new resources to create replacement products. It's a creative way to maximize an item's usefulness.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-eco-800 dark:text-eco-100 mb-4">Creative Ways to Reuse</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Containers & Packaging</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Reuse glass jars for food storage or crafts</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Turn cardboard boxes into storage solutions</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Use plastic containers for organizing small items</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Repurpose shipping materials for future packages</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Clothing & Textiles</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Turn old t-shirts into cleaning rags</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Repurpose worn jeans into a denim bag</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Use fabric scraps for patchwork projects</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Donate unwanted clothes in good condition</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Household Items</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Refinish old furniture instead of buying new</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Use old toothbrushes for cleaning detail work</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Turn wine corks into a bulletin board</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Repurpose broken dishes for mosaic projects</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Garden & Outdoors</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Turn old tires into planters or garden beds</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Use plastic bottles for DIY drip irrigation</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Repurpose pallets into outdoor furniture</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-earth-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Create bird feeders from recycled materials</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-eco-600 hover:text-eco-800 border-eco-200"
                      onClick={() => setActiveTab("reduce")}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous: Reduce
                    </Button>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-eco-600 hover:text-eco-800 border-eco-200"
                      onClick={() => setActiveTab("recycle")}
                    >
                      Next: Recycle
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="recycle">
                <div className="space-y-6">
                  <div className="bg-blue-500/10 dark:bg-blue-800/30 p-4 rounded-lg">
                    <h3 className="flex items-center text-lg font-semibold text-eco-800 dark:text-eco-100 mb-2">
                      <Info className="h-5 w-5 mr-2 text-blue-500" />
                      Why Recycle?
                    </h3>
                    <p className="text-eco-700 dark:text-eco-300">
                      Recycling transforms used materials into new products, reducing waste sent to landfills, conserving natural resources, saving energy, and reducing greenhouse gas emissions. It's the final step when reducing and reusing aren't possible.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-eco-800 dark:text-eco-100 mb-4">Recycling Guide</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Recycling Basics</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Clean containers before recycling - food residue contaminates recyclables</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Know your local recycling program's rules and accepted materials</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Keep plastic bags out of recycling bins - they jam sorting machines</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Separate different materials when possible (paper, plastic, glass, metal)</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Commonly Recycled Materials</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Paper: newspapers, magazines, cardboard, office paper</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Plastics: bottles, containers (check for recycling numbers)</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Glass: bottles and jars (remove caps and lids)</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Metal: aluminum cans, steel cans, foil, scrap metal</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Special Recycling Programs</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Electronics: Computers, phones, batteries at e-waste centers</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Textiles: Many thrift stores accept worn clothing for textile recycling</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Hazardous waste: Paint, chemicals, and certain cleaning products</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Composting: Food scraps and yard waste can be composted</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div className="bg-white dark:bg-eco-900/50 p-4 rounded-lg shadow-sm">
                          <h4 className="font-medium text-eco-700 dark:text-eco-300 mb-2">Common Recycling Mistakes</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Including greasy pizza boxes or food-soiled paper</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Recycling plastics that aren't accepted locally</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Including non-recyclable items like Styrofoam or certain plastics</span>
                            </li>
                            <li className="flex items-start">
                              <ArrowRight className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-eco-600 dark:text-eco-400">Not emptying and rinsing containers before recycling</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold text-eco-800 dark:text-eco-100 mb-4">Additional Resources</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a 
                        href="https://www.epa.gov/recycle" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-eco-50 dark:bg-eco-900/30 rounded-lg hover:bg-eco-100 dark:hover:bg-eco-800/50 transition-colors"
                      >
                        <div className="bg-eco-100 dark:bg-eco-800 p-3 rounded-full mr-3">
                          <Info className="h-5 w-5 text-eco-600 dark:text-eco-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-eco-800 dark:text-eco-100">EPA Recycling Resources</h4>
                          <p className="text-sm text-eco-600 dark:text-eco-400">Official guidelines and information</p>
                        </div>
                        <ExternalLink className="ml-auto h-4 w-4 text-eco-400" />
                      </a>
                      
                      <a 
                        href="https://earth911.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-eco-50 dark:bg-eco-900/30 rounded-lg hover:bg-eco-100 dark:hover:bg-eco-800/50 transition-colors"
                      >
                        <div className="bg-eco-100 dark:bg-eco-800 p-3 rounded-full mr-3">
                          <Recycle className="h-5 w-5 text-eco-600 dark:text-eco-300" />
                        </div>
                        <div>
                          <h4 className="font-medium text-eco-800 dark:text-eco-100">Earth911 Recycling Locator</h4>
                          <p className="text-sm text-eco-600 dark:text-eco-400">Find local recycling centers</p>
                        </div>
                        <ExternalLink className="ml-auto h-4 w-4 text-eco-400" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-eco-600 hover:text-eco-800 border-eco-200"
                      onClick={() => setActiveTab("reuse")}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Previous: Reuse
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EducationalContent;
