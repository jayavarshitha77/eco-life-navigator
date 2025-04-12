
import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ScanBarcode, UtensilsCrossed, Calendar, LeafyGreen, Apple, Carrot, Egg } from 'lucide-react';
import BarcodeScanner from '@/components/BarcodeScanner';
import FoodWasteAlerts from '@/components/FoodWasteAlerts';
import MealSuggestions from '@/components/MealSuggestions';

const EcoFood = () => {
  const { toast } = useToast();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-eco-700 mb-4">Eco-Friendly Food Tools</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover sustainable food options, scan products to check their environmental impact, and reduce food waste with smart expiry alerts.
            </p>
          </div>
          
          <Tabs defaultValue="meal-suggestions" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="meal-suggestions" className="flex items-center gap-2">
                <LeafyGreen className="h-4 w-4" />
                <span className="hidden sm:inline">Meal Suggestions</span>
              </TabsTrigger>
              <TabsTrigger value="barcode-scanner" className="flex items-center gap-2">
                <ScanBarcode className="h-4 w-4" />
                <span className="hidden sm:inline">Barcode Scanner</span>
              </TabsTrigger>
              <TabsTrigger value="food-waste" className="flex items-center gap-2">
                <UtensilsCrossed className="h-4 w-4" />
                <span className="hidden sm:inline">Food Waste Alerts</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="meal-suggestions">
              <MealSuggestions />
            </TabsContent>
            
            <TabsContent value="barcode-scanner">
              <BarcodeScanner />
            </TabsContent>
            
            <TabsContent value="food-waste">
              <FoodWasteAlerts />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EcoFood;
