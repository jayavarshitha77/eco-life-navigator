
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { TreeDeciduous, Lock, User, Mail } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // This is a mock signup - in a real app, we would send this to a backend
    setTimeout(() => {
      setIsLoading(false);
      
      // Perform validation
      if (!name || !email || !password || !confirmPassword) {
        toast({
          title: "Signup Failed",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }

      if (password !== confirmPassword) {
        toast({
          title: "Signup Failed",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }

      if (!agreeTerms) {
        toast({
          title: "Signup Failed",
          description: "Please agree to the terms and conditions",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Signup Successful",
        description: "Please login with your new account",
      });
      
      // Automatically redirect to login page after successful signup
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <TreeDeciduous className="h-12 w-12 text-eco-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>
              Join EcoLife and start your sustainable living journey
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSignup}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="pl-9"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    className="pl-9"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <a href="#" className="text-eco-600 hover:text-eco-700">
                    terms and conditions
                  </a>
                </label>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-eco-500 hover:bg-eco-600" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
              
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-eco-600 hover:text-eco-700 font-medium">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
