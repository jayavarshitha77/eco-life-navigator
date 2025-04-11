
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Users, ThumbsUp, Share, Search, User, Calendar, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';

// Sample community posts
interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  date: string;
  title: string;
  content: string;
  category: 'Zero Waste' | 'Sustainable Diet' | 'Eco-Living' | 'Fitness' | 'Carbon Reduction';
  likes: number;
  comments: number;
  liked: boolean;
}

const initialPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'Emily Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      location: 'Portland, OR'
    },
    date: '3 days ago',
    title: 'How I reduced my plastic waste by 80% this month',
    content: `I've been on a journey to eliminate single-use plastics from my life, and this month I made significant progress! Here are my top 5 strategies:

1. Switched to shampoo and conditioner bars
2. Started shopping at bulk stores with my own containers
3. Made my own cleaning products with simple ingredients
4. Found a local farmer's market for produce without packaging
5. Carry a zero-waste kit (water bottle, cutlery, cloth napkin, straw)

It wasn't always easy, but I'm amazed at how quickly these changes became habits. Has anyone else tried similar approaches? Any other suggestions?`,
    category: 'Zero Waste',
    likes: 42,
    comments: 15,
    liked: false
  },
  {
    id: '2',
    author: {
      name: 'Miguel Santos',
      avatar: 'https://i.pravatar.cc/150?img=2',
      location: 'Barcelona, Spain'
    },
    date: '1 week ago',
    title: 'My experience with plant-based eating in a Mediterranean context',
    content: `I grew up in a traditional Spanish family where meals centered around seafood, jamón, and other animal products. Six months ago, I decided to transition to a predominantly plant-based diet while maintaining my cultural food traditions.

Here's what I discovered:
- Traditional Mediterranean cuisine already has many plant-based dishes (gazpacho, escalivada, etc.)
- Legumes like chickpeas and lentils make excellent protein substitutes
- Local, seasonal produce tastes better and has a lower carbon footprint
- My cholesterol dropped significantly after just three months

I still occasionally eat small amounts of locally-caught fish, but I've found this balance works well for my health and environmental values.

I'd love to hear from others who've adapted traditional cultural diets to be more sustainable!`,
    category: 'Sustainable Diet',
    likes: 37,
    comments: 21,
    liked: false
  },
  {
    id: '3',
    author: {
      name: 'Aisha Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      location: 'Toronto, Canada'
    },
    date: '2 weeks ago',
    title: 'Eco-friendly fitness routine that actually works',
    content: `After years of driving to an energy-intensive gym with electronic equipment, I decided to create a more sustainable fitness routine. Here's my approach:

1. Bicycle commuting (30 minutes each way to work)
2. Bodyweight exercises in the park (pull-ups on playground equipment, dips on benches)
3. Yoga at home with a cork mat
4. Swimming in a local lake during summer months
5. Running with a group that does "plogging" (picking up litter while jogging)

Not only has this eliminated the carbon footprint of my fitness routine, but I've actually gotten in better shape by incorporating movement throughout my day rather than isolating it to gym sessions.

Has anyone else found creative ways to exercise sustainably?`,
    category: 'Fitness',
    likes: 29,
    comments: 12,
    liked: false
  },
  {
    id: '4',
    author: {
      name: 'Thomas Weber',
      avatar: 'https://i.pravatar.cc/150?img=4',
      location: 'Munich, Germany'
    },
    date: '3 weeks ago',
    title: 'Our family's journey to reduce our carbon footprint by 50%',
    content: `Last year, my family of four calculated our carbon footprint and were shocked to discover it was well above the global average. We committed to cutting it in half, and I'm proud to say we've achieved our goal! Here's what worked for us:

1. Switched to a renewable energy provider
2. Reduced meat consumption to twice weekly
3. Installed a smart thermostat and improved home insulation
4. Replaced one car with electric bicycles
5. Started a vegetable garden and composting system
6. Limited air travel to one trip per year

The financial savings have been substantial too - our energy bills are down 40%!

I'm curious to hear what other families have done to reduce their carbon footprint while raising children?`,
    category: 'Carbon Reduction',
    likes: 53,
    comments: 27,
    liked: false
  },
  {
    id: '5',
    author: {
      name: 'Priya Patel',
      avatar: 'https://i.pravatar.cc/150?img=5',
      location: 'Austin, TX'
    },
    date: '1 month ago',
    title: 'Creating a low-waste kitchen on a budget',
    content: `When I first became interested in zero-waste living, I was overwhelmed by expensive stainless steel containers and fancy composting systems. As a graduate student on a limited budget, I had to get creative.

Here's how I created a low-waste kitchen without breaking the bank:
- Repurposed glass jars from pasta sauce and pickles for storage
- Found second-hand kitchen tools at thrift stores
- Made beeswax wraps using scraps of cotton and local beeswax
- Used old t-shirts as cleaning rags
- Created a simple balcony composting system from a plastic storage bin

The total cost was under $50, and I've reduced my kitchen waste by about 70%.

Would love to hear other budget-friendly zero waste tips from the community!`,
    category: 'Zero Waste',
    likes: 45,
    comments: 19,
    liked: false
  }
];

const Community = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CommunityPost['category']>('Eco-Living');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CommunityPost['category'] | 'All'>('All');
  const { toast } = useToast();

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Incomplete Post",
        description: "Please provide both a title and content for your post.",
        variant: "destructive"
      });
      return;
    }

    const newPost: CommunityPost = {
      id: `${Date.now()}`,
      author: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=8',
        location: 'Your Location'
      },
      date: 'Just now',
      title: newPostTitle,
      content: newPostContent,
      category: selectedCategory,
      likes: 0,
      comments: 0,
      liked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle('');
    setNewPostContent('');
    
    toast({
      title: "Post Published",
      description: "Your post has been shared with the community!",
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: CommunityPost['category']) => {
    switch(category) {
      case 'Zero Waste': return 'bg-blue-100 text-blue-800';
      case 'Sustainable Diet': return 'bg-green-100 text-green-800';
      case 'Eco-Living': return 'bg-purple-100 text-purple-800';
      case 'Fitness': return 'bg-orange-100 text-orange-800';
      case 'Carbon Reduction': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-eco-700 mb-4">EcoLife Community</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with like-minded individuals, share your sustainable living experiences, and learn from others on their eco-friendly journeys.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-6">
              {/* Create Post */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-eco-500" />
                    Share Your Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Post Title</Label>
                    <Input 
                      id="post-title" 
                      placeholder="Enter a title for your post" 
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-content">Your Message</Label>
                    <Textarea 
                      id="post-content" 
                      placeholder="Share your sustainable living experience..." 
                      rows={5}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="post-category">Category</Label>
                    <select 
                      id="post-category" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as CommunityPost['category'])}
                    >
                      <option value="Zero Waste">Zero Waste</option>
                      <option value="Sustainable Diet">Sustainable Diet</option>
                      <option value="Eco-Living">Eco-Living</option>
                      <option value="Fitness">Fitness</option>
                      <option value="Carbon Reduction">Carbon Reduction</option>
                    </select>
                  </div>
                  <Button 
                    onClick={handleSubmitPost} 
                    className="w-full bg-eco-500 hover:bg-eco-600"
                  >
                    Post to Community
                  </Button>
                </CardContent>
              </Card>
              
              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-eco-500" />
                    Find Community Posts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="search">Search Posts</Label>
                    <Input 
                      id="search" 
                      placeholder="Search keywords..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-filter">Filter by Category</Label>
                    <select 
                      id="category-filter" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value as CommunityPost['category'] | 'All')}
                    >
                      <option value="All">All Categories</option>
                      <option value="Zero Waste">Zero Waste</option>
                      <option value="Sustainable Diet">Sustainable Diet</option>
                      <option value="Eco-Living">Eco-Living</option>
                      <option value="Fitness">Fitness</option>
                      <option value="Carbon Reduction">Carbon Reduction</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-eco-500" />
                    Explore More
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    <Link to="/diet-planner" className="flex items-center gap-2 p-2 hover:bg-eco-50 rounded-md transition-colors">
                      <Utensils className="h-4 w-4 text-eco-500" />
                      <span>Sustainable Diet Planner</span>
                    </Link>
                    <Link to="/fitness" className="flex items-center gap-2 p-2 hover:bg-eco-50 rounded-md transition-colors">
                      <Dumbbell className="h-4 w-4 text-eco-500" />
                      <span>Eco-Friendly Fitness</span>
                    </Link>
                    <Link to="/calorie-calculator" className="flex items-center gap-2 p-2 hover:bg-eco-50 rounded-md transition-colors">
                      <Calculator className="h-4 w-4 text-eco-500" />
                      <span>Sustainable Food Calculator</span>
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content - Posts */}
            <div className="md:col-span-2 space-y-6">
              {filteredPosts.length === 0 ? (
                <Card className="p-8 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-eco-500 opacity-50" />
                  <h3 className="text-xl font-medium mb-2">No posts found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search or filters, or be the first to post about this topic!</p>
                  <Button className="bg-eco-500 hover:bg-eco-600">Share Your Experience</Button>
                </Card>
              ) : (
                filteredPosts.map(post => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{post.author.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 gap-2">
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {post.author.location}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {post.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                          {post.category}
                        </span>
                      </div>
                      <CardTitle className="text-xl mt-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-sm max-w-none">
                        {post.content.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t bg-eco-50/30 px-6 py-3 flex justify-between">
                      <div className="flex gap-4">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={post.liked ? 'text-eco-700' : ''}
                          onClick={() => handleLike(post.id)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

import { Utensils, Dumbbell, Calculator } from 'lucide-react';

export default Community;
