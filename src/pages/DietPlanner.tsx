
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Utensils, Leaf, Apple, Carrot } from 'lucide-react';

interface DietPlan {
  area: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  tips: string[];
}

const dietPlans: Record<string, DietPlan> = {
  'north america': {
    area: 'North America',
    meals: {
      breakfast: ['Oatmeal with local berries', 'Whole grain toast with avocado', 'Farm-fresh eggs with vegetables'],
      lunch: ['Quinoa bowl with seasonal vegetables', 'Bean and corn salad', 'Grilled vegetable wrap'],
      dinner: ['Baked local fish with roasted vegetables', 'Plant-based burger with sweet potato fries', 'Seasonal vegetable stir-fry'],
      snacks: ['Local apples with nut butter', 'Trail mix with local nuts', 'Vegetable sticks with hummus']
    },
    tips: [
      'Choose locally grown, seasonal produce to reduce transportation emissions',
      'Consider joining a CSA (Community Supported Agriculture) program',
      'Reduce meat consumption by implementing "Meatless Mondays"',
      'Shop at farmers markets for fresh, local ingredients'
    ]
  },
  'europe': {
    area: 'Europe',
    meals: {
      breakfast: ['Muesli with local yogurt and fruits', 'Whole grain bread with local cheese', 'Mediterranean vegetable omelet'],
      lunch: ['Mediterranean chickpea salad', 'Lentil soup with local vegetables', 'Open-faced sandwich with seasonal vegetables'],
      dinner: ['Seasonal vegetable risotto', 'Mediterranean fish stew', 'Bean and vegetable cassoulet'],
      snacks: ['Local seasonal fruits', 'Handful of nuts and seeds', 'Greek yogurt with honey']
    },
    tips: [
      'Embrace the Mediterranean diet principles for health and sustainability',
      'Shop at local markets for fresh, seasonal produce',
      'Reduce food waste by planning meals and properly storing leftovers',
      'Choose local, artisanal products over mass-produced alternatives'
    ]
  },
  'asia': {
    area: 'Asia',
    meals: {
      breakfast: ['Rice porridge with seasonal vegetables', 'Steamed buns with plant-based filling', 'Miso soup with tofu and vegetables'],
      lunch: ['Rice bowl with seasonal vegetables and tofu', 'Vegetable curry with local ingredients', 'Cold noodle salad with seasonal vegetables'],
      dinner: ['Plant-based stir-fry with local vegetables', 'Vegetable and tofu curry', 'Steamed fish with seasonal vegetables'],
      snacks: ['Edamame', 'Seasonal fruits', 'Roasted seaweed']
    },
    tips: [
      'Incorporate traditional plant-based protein sources like tofu and tempeh',
      'Choose local, seasonal vegetables for stir-fries and soups',
      'Reduce food waste by using all parts of vegetables',
      'Consider growing your own herbs and vegetables if space allows'
    ]
  },
  'africa': {
    area: 'Africa',
    meals: {
      breakfast: ['Porridge with local fruits', 'Flatbread with bean spread', 'Vegetable and egg scramble'],
      lunch: ['Bean and vegetable stew', 'Couscous with seasonal vegetables', 'Lentil and vegetable salad'],
      dinner: ['Vegetable and legume curry', 'Grilled local fish with vegetable relish', 'One-pot vegetable and grain stew'],
      snacks: ['Local nuts and seeds', 'Seasonal fruits', 'Roasted chickpeas']
    },
    tips: [
      'Focus on plant-based proteins like beans and lentils',
      'Use local, drought-resistant grains like millet and sorghum',
      'Incorporate indigenous vegetables into your diet',
      'Reduce food waste by using preservation techniques'
    ]
  },
  'south america': {
    area: 'South America',
    meals: {
      breakfast: ['Açaí bowl with local fruits', 'Corn arepas with avocado', 'Quinoa porridge with local fruits'],
      lunch: ['Bean and vegetable soup', 'Quinoa salad with local vegetables', 'Plant-based tacos with local produce'],
      dinner: ['Vegetable and bean stew', 'Local fish with roasted vegetables', 'Stuffed bell peppers with quinoa and vegetables'],
      snacks: ['Local fruits', 'Roasted nuts and seeds', 'Vegetable empanadas']
    },
    tips: [
      'Incorporate ancient grains like quinoa and amaranth',
      'Use local, indigenous fruits and vegetables',
      'Focus on plant-based proteins like beans',
      'Support local farmers by purchasing directly when possible'
    ]
  },
  'australia': {
    area: 'Australia/Oceania',
    meals: {
      breakfast: ['Whole grain toast with local honey and fruits', 'Tropical fruit bowl', 'Vegetable and egg breakfast wrap'],
      lunch: ['Macadamia and chickpea salad', 'Grilled vegetable sandwich', 'Quinoa bowl with roasted vegetables'],
      dinner: ['Sustainable seafood with native herbs', 'Vegetable and legume curry', 'Grilled vegetables with quinoa'],
      snacks: ['Native fruits', 'Macadamia nuts', 'Vegetable sticks with hummus']
    },
    tips: [
      'Incorporate native foods and bush tucker when available',
      'Choose local, sustainable seafood options',
      'Support farmers using regenerative agriculture practices',
      'Reduce food waste by composting and meal planning'
    ]
  }
};

const DietPlanner = () => {
  const [region, setRegion] = useState('');
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const { toast } = useToast();

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value.toLowerCase());
  };

  const getDietPlan = () => {
    if (!region) {
      toast({
        title: "Input Required",
        description: "Please enter your region to get diet recommendations.",
        variant: "destructive"
      });
      return;
    }

    // Find closest matching region
    const regionKey = Object.keys(dietPlans).find(key => 
      region.includes(key) || key.includes(region)
    );

    if (regionKey) {
      setDietPlan(dietPlans[regionKey]);
      toast({
        title: "Diet Plan Generated",
        description: `Showing sustainable diet options for ${dietPlans[regionKey].area}.`,
      });
    } else {
      toast({
        title: "Region Not Found",
        description: "We couldn't find specific recommendations for your region. Try entering a continent or major region.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-eco-700 mb-4">Sustainable Diet Planner</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get personalized diet recommendations based on locally available, seasonal foods in your region to reduce your carbon footprint and promote sustainable eating habits.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-6 w-6 text-eco-500" />
                Find Your Sustainable Diet Plan
              </CardTitle>
              <CardDescription>
                Enter your region to get diet recommendations based on locally available foods.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="region">Your Region/Continent</Label>
                  <Input 
                    id="region" 
                    placeholder="e.g., North America, Europe, Asia" 
                    value={region}
                    onChange={handleRegionChange}
                  />
                </div>
                <Button onClick={getDietPlan} className="w-full bg-eco-500 hover:bg-eco-600">
                  Get Diet Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {dietPlan && (
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Apple className="h-6 w-6 text-eco-500" />
                    Meal Recommendations for {dietPlan.area}
                  </CardTitle>
                  <CardDescription>
                    Sustainable meal ideas using locally available foods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-eco-700">Breakfast Options</h3>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {dietPlan.meals.breakfast.map((meal, index) => (
                          <li key={index}>{meal}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-eco-700">Lunch Options</h3>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {dietPlan.meals.lunch.map((meal, index) => (
                          <li key={index}>{meal}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-eco-700">Dinner Options</h3>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {dietPlan.meals.dinner.map((meal, index) => (
                          <li key={index}>{meal}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-eco-700">Healthy Snacks</h3>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {dietPlan.meals.snacks.map((snack, index) => (
                          <li key={index}>{snack}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-eco-500" />
                    Sustainable Eating Tips
                  </CardTitle>
                  <CardDescription>
                    Reduce your food-related carbon footprint with these practices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dietPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Carrot className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 p-4 bg-eco-50 rounded-lg border border-eco-100">
                    <p className="text-sm text-eco-800">
                      <strong>Remember:</strong> Eating locally and seasonally not only reduces transportation emissions but also supports local farmers and often results in fresher, more nutritious food.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DietPlanner;
