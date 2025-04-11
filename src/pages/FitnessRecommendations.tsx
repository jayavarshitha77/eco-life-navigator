import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dumbbell, Heart, Clock, TreeDeciduous, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface Exercise {
  name: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  impact: string;
  sustainability: string;
}

interface WorkoutPlan {
  title: string;
  description: string;
  exercises: Exercise[];
  sustainabilityTip: string;
}

const FitnessRecommendations = () => {
  const [age, setAge] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('beginner');
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const { toast } = useToast();

  const workoutPlans: Record<string, Record<string, WorkoutPlan>> = {
    'beginner': {
      'young': {
        title: 'Eco-Friendly Beginner Plan for Young Adults',
        description: 'A gentle introduction to fitness with minimal equipment and maximum sustainability.',
        exercises: [
          {
            name: 'Nature Walk',
            description: 'Take a brisk 20-minute walk in a natural setting like a park or forest trail.',
            duration: '20 minutes',
            difficulty: 'Beginner',
            impact: 'Low impact, gentle on joints',
            sustainability: 'Zero carbon footprint, connects you with nature'
          },
          {
            name: 'Bodyweight Squats',
            description: 'Stand with feet shoulder-width apart, lower your body as if sitting in a chair, then return to standing.',
            duration: '3 sets of 10 reps',
            difficulty: 'Beginner',
            impact: 'Moderate impact on knees and hips',
            sustainability: 'No equipment needed, can be done anywhere'
          },
          {
            name: 'Modified Push-ups',
            description: 'Perform push-ups with knees on the ground to reduce intensity.',
            duration: '3 sets of 8 reps',
            difficulty: 'Beginner',
            impact: 'Low impact on joints',
            sustainability: 'No equipment needed, can be done anywhere'
          },
          {
            name: 'Outdoor Yoga',
            description: "Basic yoga poses like downward dog, child's pose, and warrior pose in an outdoor setting.",
            duration: '15 minutes',
            difficulty: 'Beginner',
            impact: 'Very low impact',
            sustainability: 'No equipment needed, connects you with nature'
          }
        ],
        sustainabilityTip: 'Instead of driving to a gym, try exercising outdoors or at home to reduce transportation emissions.'
      },
      'middle': {
        title: 'Eco-Friendly Beginner Plan for Middle-Aged Adults',
        description: 'Gentle, sustainable exercises focused on building strength and flexibility safely.',
        exercises: [
          {
            name: 'Gentle Swimming',
            description: 'Swim at a comfortable pace in a natural body of water or eco-friendly pool.',
            duration: '20 minutes',
            difficulty: 'Beginner',
            impact: 'Very low impact, excellent for joints',
            sustainability: 'Choose natural bodies of water or pools with eco-friendly filtration'
          },
          {
            name: 'Chair Yoga',
            description: 'Perform gentle stretches and yoga poses using a chair for support.',
            duration: '15 minutes',
            difficulty: 'Beginner',
            impact: 'Very low impact',
            sustainability: 'Minimal equipment needed'
          },
          {
            name: 'Wall Push-ups',
            description: 'Stand facing a wall, place hands on wall at shoulder height, and perform push-ups against the wall.',
            duration: '3 sets of 10 reps',
            difficulty: 'Beginner',
            impact: 'Very low impact',
            sustainability: 'No special equipment needed'
          },
          {
            name: 'Seated Leg Raises',
            description: 'While seated, extend one leg at a time, holding for 5 seconds before lowering.',
            duration: '3 sets of 8 reps per leg',
            difficulty: 'Beginner',
            impact: 'Very low impact',
            sustainability: 'No equipment needed'
          }
        ],
        sustainabilityTip: 'Use reusable water bottles made from sustainable materials instead of single-use plastic bottles during workouts.'
      },
      'senior': {
        title: 'Eco-Friendly Beginner Plan for Seniors',
        description: 'Very gentle exercises focused on maintaining mobility and balance with minimal environmental impact.',
        exercises: [
          {
            name: 'Seated Stretching',
            description: 'Gentle stretches for major muscle groups while seated in a sturdy chair.',
            duration: '15 minutes',
            difficulty: 'Beginner',
            impact: 'Very low impact',
            sustainability: 'No special equipment needed'
          },
          {
            name: 'Standing Balance Practice',
            description: 'Hold onto a stable surface and practice standing on one foot for balance.',
            duration: '5 repetitions of 10 seconds per foot',
            difficulty: 'Beginner',
            impact: 'Very low impact',
            sustainability: 'No equipment needed'
          },
          {
            name: 'Gentle Walking',
            description: 'Walk at a comfortable pace in a natural setting or around your home.',
            duration: '10-15 minutes',
            difficulty: 'Beginner',
            impact: 'Low impact',
            sustainability: 'Zero carbon footprint if done locally'
          },
          {
            name: 'Chair Sit-to-Stand',
            description: 'Practice sitting down and standing up from a chair to build leg strength.',
            duration: '3 sets of 5 repetitions',
            difficulty: 'Beginner',
            impact: 'Low to moderate impact',
            sustainability: 'Uses only a chair, no specialized equipment'
          }
        ],
        sustainabilityTip: 'Consider using exercise equipment made from sustainable materials or second-hand items to reduce waste.'
      }
    },
    'intermediate': {
      'young': {
        title: 'Eco-Friendly Intermediate Plan for Young Adults',
        description: 'A balanced workout plan combining cardio and strength training with minimal equipment.',
        exercises: [
          {
            name: 'Trail Running',
            description: 'Run on natural trails at a moderate pace, enjoying the scenery while getting a great workout.',
            duration: '25 minutes',
            difficulty: 'Intermediate',
            impact: 'Moderate impact',
            sustainability: 'Zero equipment needed, connects with nature'
          },
          {
            name: 'Full Bodyweight Circuit',
            description: 'Circuit of push-ups, squats, lunges, and plank holds without equipment.',
            duration: '3 sets of 12 reps each exercise',
            difficulty: 'Intermediate',
            impact: 'Moderate impact',
            sustainability: 'No equipment needed'
          },
          {
            name: 'Rock Climbing (Indoor or Outdoor)',
            description: 'Climb natural rock formations or at a climbing gym that uses renewable energy.',
            duration: '45 minutes',
            difficulty: 'Intermediate',
            impact: 'Low joint impact, high muscle engagement',
            sustainability: 'Minimal equipment if outdoor, choose eco-friendly facilities'
          },
          {
            name: 'Eco-Yoga Flow',
            description: 'Flowing yoga sequence incorporating sun salutations and standing poses.',
            duration: '20 minutes',
            difficulty: 'Intermediate',
            impact: 'Low impact',
            sustainability: 'Only requires a sustainable yoga mat'
          }
        ],
        sustainabilityTip: 'Choose workout clothes made from sustainable materials like recycled polyester or organic cotton.'
      },
      'middle': {
        title: 'Eco-Friendly Intermediate Plan for Middle-Aged Adults',
        description: 'Balanced fitness routine focusing on functional strength and cardiovascular health.',
        exercises: [
          {
            name: 'Cycling',
            description: 'Ride a bicycle on local trails or for transportation instead of driving.',
            duration: '30 minutes',
            difficulty: 'Intermediate',
            impact: 'Low impact on joints',
            sustainability: 'Zero-emission transportation and exercise combined'
          },
          {
            name: 'Resistance Band Workout',
            description: 'Full-body workout using sustainable resistance bands instead of weights.',
            duration: '3 sets of 12 reps for each exercise',
            difficulty: 'Intermediate',
            impact: 'Low to moderate impact',
            sustainability: 'Minimal equipment that lasts for years'
          },
          {
            name: 'Bodyweight HIIT Circuit',
            description: 'High-intensity interval training using only bodyweight exercises.',
            duration: '20 minutes (30 seconds work, 30 seconds rest)',
            difficulty: 'Intermediate',
            impact: 'Moderate impact',
            sustainability: 'No equipment needed'
          },
          {
            name: 'Outdoor Tai Chi',
            description: 'Practice tai chi movements in a park or garden setting.',
            duration: '20 minutes',
            difficulty: 'Intermediate',
            impact: 'Very low impact',
            sustainability: 'No equipment needed, connects with nature'
          }
        ],
        sustainabilityTip: 'Start a garden that requires physical activity to maintain, combining exercise with growing your own food.'
      },
      'senior': {
        title: 'Eco-Friendly Intermediate Plan for Seniors',
        description: 'Moderate exercises for maintaining strength, balance, and cardiovascular health.',
        exercises: [
          {
            name: 'Water Aerobics',
            description: 'Perform aerobic exercises in water for resistance with minimal joint stress.',
            duration: '30 minutes',
            difficulty: 'Intermediate',
            impact: 'Very low impact',
            sustainability: 'Choose natural bodies of water or eco-friendly pools'
          },
          {
            name: 'Nordic Walking',
            description: 'Walking with specialized poles that engage upper body muscles.',
            duration: '25 minutes',
            difficulty: 'Intermediate',
            impact: 'Low impact',
            sustainability: 'Minimal equipment, outdoor activity'
          },
          {
            name: 'Garden Yoga',
            description: 'Perform yoga poses in your garden, connecting exercise with nature.',
            duration: '20 minutes',
            difficulty: 'Intermediate',
            impact: 'Low impact',
            sustainability: 'No equipment needed, beneficial for garden ecology'
          },
          {
            name: 'Light Resistance Training',
            description: 'Use small hand weights or resistance bands for gentle strength training.',
            duration: '3 sets of 10 reps for each exercise',
            difficulty: 'Intermediate',
            impact: 'Low impact',
            sustainability: 'Minimal, long-lasting equipment'
          }
        ],
        sustainabilityTip: 'Join a community garden to combine socializing, growing food, and getting exercise.'
      }
    },
    'advanced': {
      'young': {
        title: 'Eco-Friendly Advanced Plan for Young Adults',
        description: 'Challenging workout routines with minimal environmental impact.',
        exercises: [
          {
            name: 'Mountain Biking',
            description: 'Ride challenging trails for an intense cardio and strength workout.',
            duration: '45 minutes',
            difficulty: 'Advanced',
            impact: 'Moderate impact',
            sustainability: 'Zero emissions transportation and exercise'
          },
          {
            name: 'Advanced Calisthenics',
            description: 'Complex bodyweight exercises like muscle-ups, handstands, and pistol squats.',
            duration: '4 sets of 8-10 reps',
            difficulty: 'Advanced',
            impact: 'Moderate to high impact',
            sustainability: 'Minimal equipment needed'
          },
          {
            name: 'Open Water Swimming',
            description: 'Swimming in lakes, rivers, or oceans for natural resistance and connection to nature.',
            duration: '30 minutes',
            difficulty: 'Advanced',
            impact: 'Low impact',
            sustainability: 'No facility energy use, natural setting'
          },
          {
            name: 'Parkour/Natural Movement',
            description: 'Using natural and urban environments for functional movement practice.',
            duration: '40 minutes',
            difficulty: 'Advanced',
            impact: 'High impact',
            sustainability: 'Uses existing environment, no equipment'
          }
        ],
        sustainabilityTip: 'Participate in "plogging" – picking up trash while jogging – to exercise while cleaning the environment.'
      },
      'middle': {
        title: 'Eco-Friendly Advanced Plan for Middle-Aged Adults',
        description: 'Challenging but joint-friendly workouts with sustainability in mind.',
        exercises: [
          {
            name: 'Advanced Kayaking',
            description: 'Paddling in varying water conditions for upper body and core strength.',
            duration: '45 minutes',
            difficulty: 'Advanced',
            impact: 'Low joint impact, high muscle engagement',
            sustainability: 'Non-motorized water sport in natural settings'
          },
          {
            name: 'Circuit Training with Upcycled Equipment',
            description: 'Full-body workout using equipment made from repurposed materials.',
            duration: '4 rounds of 6 exercises',
            difficulty: 'Advanced',
            impact: 'Moderate impact',
            sustainability: 'Uses recycled or upcycled equipment'
          },
          {
            name: 'Advanced Cycling (Hills or Distance)',
            description: 'Challenging bicycle routes with significant hills or longer distances.',
            duration: '60 minutes',
            difficulty: 'Advanced',
            impact: 'Low joint impact',
            sustainability: 'Zero-emission transportation'
          },
          {
            name: 'Power Yoga',
            description: 'Dynamic, strength-focused yoga practice with challenging poses.',
            duration: '45 minutes',
            difficulty: 'Advanced',
            impact: 'Moderate impact',
            sustainability: 'Minimal equipment required'
          }
        ],
        sustainabilityTip: 'Create a home gym using sustainable materials and equipment that generates energy while you work out.'
      },
      'senior': {
        title: 'Eco-Friendly Advanced Plan for Active Seniors',
        description: 'Challenging but appropriate exercises for active older adults with minimal environmental impact.',
        exercises: [
          {
            name: 'Advanced Swimming',
            description: 'Longer distance or varied stroke swimming for full-body conditioning.',
            duration: '40 minutes',
            difficulty: 'Advanced',
            impact: 'Very low impact',
            sustainability: 'Choose natural bodies of water or eco-friendly pools'
          },
          {
            name: 'Advanced Tai Chi',
            description: 'Complex tai chi forms for balance, coordination, and strength.',
            duration: '30 minutes',
            difficulty: 'Advanced',
            impact: 'Very low impact',
            sustainability: 'No equipment needed'
          },
          {
            name: 'Nature Trail Cycling',
            description: 'Cycling on maintained nature trails for cardiovascular health.',
            duration: '45 minutes',
            difficulty: 'Advanced',
            impact: 'Low impact',
            sustainability: 'Zero-emission activity in nature'
          },
          {
            name: 'Comprehensive Resistance Training',
            description: 'Full-body workout using sustainable resistance bands and bodyweight.',
            duration: '3 sets of 12 reps for 8 exercises',
            difficulty: 'Advanced',
            impact: 'Low to moderate impact',
            sustainability: 'Minimal, sustainable equipment'
          }
        ],
        sustainabilityTip: 'Lead eco-friendly exercise groups in your community to share sustainable fitness practices.'
      }
    }
  };

  const handleGetRecommendations = () => {
    if (!age) {
      toast({
        title: "Input Required",
        description: "Please enter your age to get fitness recommendations.",
        variant: "destructive"
      });
      return;
    }

    const ageNum = parseInt(age);
    let ageGroup: 'young' | 'middle' | 'senior' = 'middle';
    
    if (ageNum < 40) {
      ageGroup = 'young';
    } else if (ageNum >= 40 && ageNum < 65) {
      ageGroup = 'middle';
    } else {
      ageGroup = 'senior';
    }

    if (workoutPlans[fitnessLevel] && workoutPlans[fitnessLevel][ageGroup]) {
      setWorkoutPlan(workoutPlans[fitnessLevel][ageGroup]);
      toast({
        title: "Workout Plan Generated",
        description: `Your eco-friendly fitness plan is ready!`,
      });
    } else {
      toast({
        title: "Error",
        description: "Could not generate a workout plan with the given parameters.",
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
            <h1 className="text-3xl md:text-4xl font-bold text-eco-700 mb-4">Eco-Friendly Fitness Recommendations</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get personalized exercise plans that promote both personal health and environmental sustainability, with minimal equipment and maximum benefit.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-eco-500" />
                Find Your Sustainable Fitness Plan
              </CardTitle>
              <CardDescription>
                Enter your information to get personalized fitness recommendations that are good for you and the planet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="age">Your Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    placeholder="e.g., 35" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fitnessLevel">Your Fitness Level</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={fitnessLevel === 'beginner' ? 'default' : 'outline'} 
                      className={fitnessLevel === 'beginner' ? 'bg-eco-500 hover:bg-eco-600' : ''}
                      onClick={() => setFitnessLevel('beginner')}
                    >
                      Beginner
                    </Button>
                    <Button 
                      variant={fitnessLevel === 'intermediate' ? 'default' : 'outline'} 
                      className={fitnessLevel === 'intermediate' ? 'bg-eco-500 hover:bg-eco-600' : ''}
                      onClick={() => setFitnessLevel('intermediate')}
                    >
                      Intermediate
                    </Button>
                    <Button 
                      variant={fitnessLevel === 'advanced' ? 'default' : 'outline'} 
                      className={fitnessLevel === 'advanced' ? 'bg-eco-500 hover:bg-eco-600' : ''}
                      onClick={() => setFitnessLevel('advanced')}
                    >
                      Advanced
                    </Button>
                  </div>
                </div>
                <Button onClick={handleGetRecommendations} className="w-full mt-2 bg-eco-500 hover:bg-eco-600">
                  Get Fitness Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {workoutPlan && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-eco-700">{workoutPlan.title}</CardTitle>
                  <CardDescription>{workoutPlan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-eco-50 rounded-lg border border-eco-100">
                    <div className="flex items-start gap-2">
                      <TreeDeciduous className="h-5 w-5 text-eco-500 mt-0.5 flex-shrink-0" />
                      <p className="text-eco-800"><strong>Sustainability Tip:</strong> {workoutPlan.sustainabilityTip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {workoutPlan.exercises.map((exercise, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Heart className="h-5 w-5 text-eco-500" />
                        {exercise.name}
                      </CardTitle>
                      <CardDescription className="text-sm">{exercise.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-eco-500" />
                          <span>{exercise.duration}</span>
                        </div>
                        <div>
                          <span className="font-medium">Difficulty:</span> {exercise.difficulty}
                        </div>
                        <div className="col-span-2">
                          <span className="font-medium">Impact:</span> {exercise.impact}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-eco-50 text-sm text-eco-700 rounded-b-lg">
                      <div className="flex items-start gap-1">
                        <TreeDeciduous className="h-4 w-4 text-eco-500 mt-0.5 flex-shrink-0" />
                        <span>{exercise.sustainability}</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-eco-500" />
                    Community Connection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Exercising with others can increase motivation and enjoyment. Consider these eco-friendly group activities:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Join a local hiking or cycling club</li>
                    <li>Participate in community clean-up events that involve physical activity</li>
                    <li>Start an outdoor fitness group in your neighborhood</li>
                    <li>Take part in eco-sports like plogging (jogging while picking up litter)</li>
                  </ul>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" className="border-eco-500 text-eco-600">
                    <Link to="/community">Join Our Community</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FitnessRecommendations;
