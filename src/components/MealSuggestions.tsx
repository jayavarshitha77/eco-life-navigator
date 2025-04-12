
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Apple, Carrot, Egg, LeafyGreen, Wheat } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
}

interface MealSuggestion {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  ecoImpact: string;
  icon: React.ReactNode;
}

const MealSuggestions = () => {
  const [dietary, setDietary] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string>('');
  const [suggestions, setSuggestions] = useState<MealSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'local-seasonal', label: 'Local & Seasonal' },
  ];

  const handleDietaryChange = (value: string) => {
    setDietary(
      dietary.includes(value)
        ? dietary.filter((item) => item !== value)
        : [...dietary, value]
    );
  };

  const generateSuggestions = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate meal suggestions based on inputs
      const newSuggestions: MealSuggestion[] = [
        {
          id: '1',
          title: 'Seasonal Vegetable Buddha Bowl',
          description: 'A nutritious bowl with quinoa, roasted seasonal vegetables, and tahini dressing.',
          ingredients: ['Quinoa', 'Local carrots', 'Local beets', 'Kale', 'Tahini', 'Lemon'],
          ecoImpact: 'Low carbon footprint, uses seasonal and local produce',
          icon: <LeafyGreen className="h-6 w-6 text-green-500" />
        },
        {
          id: '2',
          title: 'Farmers Market Frittata',
          description: 'Egg-based dish with fresh vegetables from your local farmers market.',
          ingredients: ['Free-range eggs', 'Bell peppers', 'Spinach', 'Local onions', 'Herbs'],
          ecoImpact: 'Low food miles when using local ingredients, good use of leftover vegetables',
          icon: <Egg className="h-6 w-6 text-yellow-500" />
        },
        {
          id: '3',
          title: 'Root Vegetable Soup',
          description: 'Hearty and warming soup made with seasonal root vegetables.',
          ingredients: ['Local potatoes', 'Carrots', 'Parsnips', 'Vegetable broth', 'Fresh herbs'],
          ecoImpact: 'Uses whole vegetables, low processing impact, seasonal ingredients',
          icon: <Carrot className="h-6 w-6 text-orange-500" />
        }
      ];
      
      setSuggestions(newSuggestions);
      setIsGenerating(false);
      
      toast({
        title: "Suggestions Generated",
        description: "We've created some eco-friendly meal ideas for you!",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LeafyGreen className="h-6 w-6 text-eco-500" />
            Plant-Based & Local Meal Suggestions
          </CardTitle>
          <CardDescription>
            Get personalized meal recommendations based on your preferences and locally available ingredients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Dietary Preferences</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 mt-2 gap-2">
                {dietaryOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option.id} 
                      checked={dietary.includes(option.id)}
                      onCheckedChange={() => handleDietaryChange(option.id)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label htmlFor="ingredients">Ingredients You Have</Label>
              <div className="flex mt-2">
                <Input 
                  id="ingredients"
                  placeholder="e.g., potatoes, spinach, beans (optional)" 
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={generateSuggestions} 
                  className="ml-2 bg-eco-500 hover:bg-eco-600"
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Get Ideas'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {suggestions.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          {suggestions.map((meal) => (
            <Card key={meal.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {meal.icon}
                  <CardTitle className="text-lg">{meal.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-600">{meal.description}</p>
                <div>
                  <p className="text-sm font-medium mb-1">Ingredients:</p>
                  <ul className="text-sm list-disc pl-5">
                    {meal.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-2 border-t border-gray-200">
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <LeafyGreen className="h-3 w-3" />
                    <span>{meal.ecoImpact}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MealSuggestions;
