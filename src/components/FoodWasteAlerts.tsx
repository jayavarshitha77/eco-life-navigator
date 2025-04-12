
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Calendar, UtensilsCrossed, AlertTriangle, Plus, Trash2, Clock } from 'lucide-react';
import { format, addDays, isBefore, differenceInDays } from 'date-fns';

interface FoodItem {
  id: string;
  name: string;
  expiryDate: Date;
  quantity: string;
}

interface RecipeIdea {
  id: string;
  title: string;
  ingredients: string[];
  expiringItems: string[];
}

const FoodWasteAlerts = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: '1',
      name: 'Spinach',
      expiryDate: addDays(new Date(), 2),
      quantity: '1 bag'
    },
    {
      id: '2',
      name: 'Yogurt',
      expiryDate: addDays(new Date(), 3),
      quantity: '500g container'
    },
    {
      id: '3',
      name: 'Chicken Breast',
      expiryDate: addDays(new Date(), 1),
      quantity: '2 pieces'
    }
  ]);
  
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [newItemExpiry, setNewItemExpiry] = useState('');
  const [recipeIdeas, setRecipeIdeas] = useState<RecipeIdea[]>([]);
  
  const { toast } = useToast();

  const addFoodItem = () => {
    if (!newItemName || !newItemExpiry) {
      toast({
        title: "Missing Information",
        description: "Please provide both a name and expiry date",
        variant: "destructive"
      });
      return;
    }

    try {
      const expiryDate = new Date(newItemExpiry);
      
      const newItem: FoodItem = {
        id: Date.now().toString(),
        name: newItemName,
        expiryDate,
        quantity: newItemQuantity || 'Not specified'
      };

      setFoodItems([...foodItems, newItem]);
      setNewItemName('');
      setNewItemQuantity('');
      setNewItemExpiry('');
      
      toast({
        title: "Item Added",
        description: `${newItemName} has been added to your food tracker.`
      });
      
      // Generate new recipe ideas when items are added
      generateRecipeIdeas([...foodItems, newItem]);
      
    } catch (error) {
      toast({
        title: "Invalid Date",
        description: "Please enter a valid expiry date",
        variant: "destructive"
      });
    }
  };

  const removeFoodItem = (id: string) => {
    const updatedItems = foodItems.filter(item => item.id !== id);
    setFoodItems(updatedItems);
    
    // Update recipe ideas when items are removed
    generateRecipeIdeas(updatedItems);
    
    toast({
      title: "Item Removed",
      description: "The food item has been removed from your tracker."
    });
  };

  const generateRecipeIdeas = (items: FoodItem[]) => {
    // Find soon-to-expire items (within 3 days)
    const soonToExpire = items.filter(item => 
      differenceInDays(item.expiryDate, new Date()) <= 3
    );
    
    if (soonToExpire.length === 0) {
      setRecipeIdeas([]);
      return;
    }
    
    // Generate recipe ideas (this would typically call an API)
    // Here we're using mock data based on the expiring ingredients
    const mockRecipes: RecipeIdea[] = [];
    
    const hasSpinach = soonToExpire.some(item => item.name.toLowerCase().includes('spinach'));
    const hasYogurt = soonToExpire.some(item => item.name.toLowerCase().includes('yogurt'));
    const hasChicken = soonToExpire.some(item => item.name.toLowerCase().includes('chicken'));
    
    if (hasSpinach && hasChicken) {
      mockRecipes.push({
        id: '1',
        title: 'Spinach & Chicken Stir-Fry',
        ingredients: ['Spinach', 'Chicken breast', 'Garlic', 'Soy sauce', 'Olive oil'],
        expiringItems: ['Spinach', 'Chicken breast']
      });
    }
    
    if (hasSpinach) {
      mockRecipes.push({
        id: '2',
        title: 'Sautéed Spinach with Garlic',
        ingredients: ['Spinach', 'Garlic', 'Olive oil', 'Salt', 'Pepper'],
        expiringItems: ['Spinach']
      });
    }
    
    if (hasYogurt) {
      mockRecipes.push({
        id: '3',
        title: 'Yogurt Parfait',
        ingredients: ['Yogurt', 'Honey', 'Fruit', 'Granola'],
        expiringItems: ['Yogurt']
      });
    }
    
    if (hasChicken) {
      mockRecipes.push({
        id: '4',
        title: 'Quick Chicken Tacos',
        ingredients: ['Chicken breast', 'Taco seasoning', 'Tortillas', 'Salsa', 'Lettuce'],
        expiringItems: ['Chicken breast']
      });
    }
    
    setRecipeIdeas(mockRecipes);
  };

  const getExpiryStatus = (date: Date) => {
    const today = new Date();
    const daysUntilExpiry = differenceInDays(date, today);
    
    if (isBefore(date, today)) {
      return { text: 'Expired', color: 'text-red-500', bgColor: 'bg-red-100' };
    } else if (daysUntilExpiry <= 1) {
      return { text: 'Expires today/tomorrow', color: 'text-orange-500', bgColor: 'bg-orange-100' };
    } else if (daysUntilExpiry <= 3) {
      return { text: `Expires in ${daysUntilExpiry} days`, color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
    } else {
      return { text: `Expires in ${daysUntilExpiry} days`, color: 'text-green-500', bgColor: 'bg-green-100' };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="h-6 w-6 text-eco-500" />
            Food Waste Reduction Tracker
          </CardTitle>
          <CardDescription>
            Track food expiry dates, get alerts for items that need to be used soon, and find recipes to use them up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label htmlFor="itemName">Food Item</Label>
                <Input 
                  id="itemName"
                  placeholder="e.g., Broccoli" 
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="itemQuantity">Quantity (Optional)</Label>
                <Input 
                  id="itemQuantity"
                  placeholder="e.g., 1 bunch, 500g" 
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="itemExpiry">Expiry Date</Label>
                <Input 
                  id="itemExpiry"
                  type="date"
                  value={newItemExpiry}
                  onChange={(e) => setNewItemExpiry(e.target.value)}
                />
              </div>
            </div>
            
            <Button 
              onClick={addFoodItem} 
              className="w-full bg-eco-500 hover:bg-eco-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Food Item
            </Button>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Your Food Items</h3>
            {foodItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No food items added yet. Add items to start tracking.
              </p>
            ) : (
              <div className="space-y-2">
                {foodItems.map((item) => {
                  const status = getExpiryStatus(item.expiryDate);
                  return (
                    <div 
                      key={item.id} 
                      className={`p-3 rounded-md flex items-center justify-between ${status.bgColor}`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-xs text-gray-600">({item.quantity})</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span className={`text-xs ${status.color}`}>
                            {status.text} ({format(item.expiryDate, 'MMM d, yyyy')})
                          </span>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeFoodItem(item.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {recipeIdeas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
              Use Soon! Recipe Ideas
            </CardTitle>
            <CardDescription>
              Recipes to help you use ingredients that will expire soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {recipeIdeas.map((recipe) => (
                <div key={recipe.id} className="border rounded-md p-4">
                  <h3 className="font-medium text-lg mb-2">{recipe.title}</h3>
                  
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Uses your expiring items:</p>
                    <div className="flex flex-wrap gap-1">
                      {recipe.expiringItems.map((item, i) => (
                        <span 
                          key={i} 
                          className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-1">All ingredients:</p>
                    <ul className="text-sm list-disc pl-5">
                      {recipe.ingredients.map((ingredient, i) => (
                        <li key={i}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-6 w-6 text-eco-500" />
            Food Storage Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm">
              <span className="font-medium">Fruits and Vegetables:</span> Store most in the refrigerator crisper drawer. Keep bananas, potatoes, and onions at room temperature.
            </p>
            <p className="text-sm">
              <span className="font-medium">Bread:</span> Store in a bread box or paper bag at room temperature, or freeze for longer shelf life.
            </p>
            <p className="text-sm">
              <span className="font-medium">Meat and Fish:</span> Keep in the coldest part of your refrigerator and use within 1-2 days, or freeze.
            </p>
            <p className="text-sm">
              <span className="font-medium">Leftovers:</span> Store in airtight containers and use within 3-4 days.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodWasteAlerts;
