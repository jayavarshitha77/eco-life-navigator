
import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, X, User, Bot as BotIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Message type definition
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

// AI responses based on keywords
const generateAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('diet') || lowerMessage.includes('food') || lowerMessage.includes('nutrition')) {
    return "Based on eco-friendly principles, I'd recommend incorporating more plant-based foods into your diet. Consider local, seasonal vegetables and fruits to reduce your carbon footprint. Would you like me to suggest a specific meal plan?";
  } 
  else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('fitness')) {
    return "For sustainable fitness, try outdoor activities like hiking or cycling that connect you with nature while reducing gym electricity usage. Have you considered joining our community for group outdoor activities?";
  }
  else if (lowerMessage.includes('carbon') || lowerMessage.includes('footprint') || lowerMessage.includes('sustainable')) {
    return "To reduce your carbon footprint, consider using public transportation, reducing meat consumption, and minimizing single-use plastics. Our carbon calculator can help you track your progress!";
  }
  else if (lowerMessage.includes('waste') || lowerMessage.includes('recycling') || lowerMessage.includes('plastic')) {
    return "For better waste management, try composting food scraps, using reusable containers instead of disposable ones, and properly sorting recyclables. Check out our waste management guide for more detailed tips!";
  }
  else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm EcoBot, your sustainable living assistant. How can I help you today? You can ask me about eco-friendly diet plans, sustainable fitness routines, reducing your carbon footprint, or waste management tips.";
  }
  else {
    return "Thanks for your message! As your eco-friendly assistant, I can provide personalized recommendations for sustainable living. Would you like tips on diet, fitness, reducing your carbon footprint, or waste management?";
  }
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm EcoBot, your sustainable living assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: generateAIResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <Button
        className="fixed bottom-4 right-4 rounded-full p-3 w-12 h-12 flex items-center justify-center bg-eco-500 hover:bg-eco-600 shadow-lg"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <BotIcon className="h-6 w-6" />
      </Button>

      {/* Chat dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px] h-[500px] flex flex-col p-0 gap-0">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-eco-500" />
                <DialogTitle>EcoBot Assistant</DialogTitle>
              </div>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0" 
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div 
                    className={`p-1 rounded-full flex items-center justify-center ${
                      message.sender === 'user' ? 'bg-eco-100' : 'bg-eco-500'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-eco-500" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-eco-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <div className="p-1 rounded-full bg-eco-500 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                    <div className="flex space-x-1">
                      <div className="typing-dot"></div>
                      <div className="typing-dot animation-delay-200"></div>
                      <div className="typing-dot animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <div className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for eco-friendly recommendations..."
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isTyping}
              className="bg-eco-500 hover:bg-eco-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatBot;
